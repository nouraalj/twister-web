const TwistModel = require("../models/twist");
const UserModel = require("../models/user");

const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllTwists = async (req, res) => {
  try {
    const twists = await TwistModel.find().sort({ timestamp: -1 }).exec();
    res.status(200).json(twists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.createTwist = async (req, res) => {
  const tweet = new TwistModel({
    userId: req.body.userId,
    text: req.body.text,
  });
  try {
    await tweet.save();
    res.status(201).json(tweet);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.updateTwist = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Can not update this post: " + req.params.id);
  try {
    const twist = await TwistModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
        },
      },
      { new: true }
    );
    return res.send(twist);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.deleteTwist = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Can not delete this post: " + req.params.id);
  try {
    const result = await TwistModel.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).send("Twist not found");
    }
    res.status(200).send({ message: "Twist deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getTimelineTwists = async (req, res) => {
  try{
    const currentUser = await UserModel.findById(req.body.userId);
    const userTwists = await TwistModel.find({userId: currentUser._id});
    const followingTwists = await Promise.all(
      currentUser.following.map(followingId => {
        return TwistModel.find({userId: followingId});
      })
    )
    res.json(userTwists.concat(...followingTwists));
  } catch(err){
    res.status(500).json(err);
  }
};

module.exports.likeTwist = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idUser)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    // ajouter à la liste des utilisateurs qui ont like le twist
    const twist = await TwistModel.findByIdAndUpdate(
      req.params.id, //id du twist à like
      { $addToSet: { likes: req.body.idUser } }, //id de la personne qui like
      { new: true, upsert: true }
    );
    if (!twist) {
      return res.status(404).send({ message: "Twist not found" });
    }
    res.status(201).json(twist);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.unLikeTwist = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idUser)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    // enlever de la liste des utilisateurs qui ont like le twist
    const twist = await TwistModel.findByIdAndUpdate(
      req.params.id, //id du twist à unlike
      { $pull: { likes: req.body.idUser } }, //id de la personne qui unlike
      { new: true, upsert: true }
    );
    if (!twist) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(201).json(twist);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.retwistTwist = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idUser)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    // ajouter à la liste des utilisateurs qui ont retwists
    const twist = await TwistModel.findByIdAndUpdate(
      req.params.id, //id du twist à retwist
      { $addToSet: { retwists: req.body.idUser } }, //id de la personne qui retwist
      { new: true, upsert: true }
    );
    // ajouter à la liste des twists de l'utilisateur
    await UserModel.findByIdAndUpdate(
      req.body.idUser,
      { $addToSet: { twists: req.params.id } },
      { new: true, upsert: true }
    );
    if (!twist) {
      return res.status(404).send({ message: "Twist not found" });
    }
    await twist.save();
    res.status(201).json(twist);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.unRetwistTwist = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idUser)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    // enlever de la liste des utilisateurs qui ont retwists
    const twist = await TwistModel.findByIdAndUpdate(
      req.params.id, //id du twist à retwist
      { $pull: { retwists: req.body.idUser } }, //id de la personne qui unretwist
      { new: true, upsert: true }
    );
    // enlever de la liste des twists de l'utilisateur
    await UserModel.findByIdAndUpdate(
      req.body.idUser,
      { $pull: { twists: req.params.id } },
      { new: true, upsert: true }
    );
    if (!twist) {
      return res.status(404).send({ message: "Twist not found" });
    }
    await twist.save();
    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.commentTwist = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.commenterId)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    const updatedTwist = await TwistModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { //on rajoute un nouveau commentaire à ce twist
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );

    if (!updatedTwist) {
      return res.status(404).send("Twist not found.");
    }

    res.send(updatedTwist);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};

module.exports.deleteComment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try{
    const updatedTwist = await TwistModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull:{
          comment:{
            _id: req.body.commentId,
          }
        }
      },
      {new : true}
    )
    if (!updatedTwist) {
      return res.status(404).send("Twist not found.");
    }

    res.send(updatedTwist);
  } catch(err){
    console.error(err);
    res.status(500).send("Internal server error.");
  }

};