const UserModel = require("../models/user")
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) =>{
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) =>{
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    try {
        const user = await UserModel.findById(req.params.id).select("-password");
        res.send(user);
    } catch (err) {
        console.log("ID unknown : "+ err);
        res.status(500).send(err.message);
    }
}

module.exports.updateUser = async (req, res) =>{
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    try{
        const user = await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set:{
                    bio: req.body.bio
                }
            },
            {new :true, upsert: true, useFindAndModify: false, setDefaultsOnInsert: true},

        )
        return res.send(user);
    }
    catch(err){
        return res.send(500).json({message: err})
    }
}

module.exports.deleteUser = async (req, res)=>{
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
      }
    
      try {
        const result = await UserModel.findByIdAndRemove(req.params.id);
        if (!result) {
          return res.status(404).send('User not found');
        }
        res.status(200).send({ message: 'User deleted successfully' });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
};

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    try{
        // ajouter à la liste de followers (abonnés)
        const user = await UserModel.findByIdAndUpdate(
            req.params.id, //id de la personne qui veut suivre 
            { $addToSet : {following: req.body.idToFollow}}, //id de la personne qui va être suivi
            { new: true, upsert: true}
        );
        // ajouter à la liste des following (abonnement)
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: {followers : req.params.id}},
            { new: true, upsert: true}
        )
        res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    try{
        // retirer de la liste de followers (abonnés)
        const user = await UserModel.findByIdAndUpdate(
            req.params.id, //id de la personne qui veut suivre 
            { $pull : {following: req.body.idToUnfollow}}, //id de la personne qui va être suivi
            { new: true, upsert: true}
        );
        // retirer de la liste des following (abonnement)
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: {followers : req.params.id}},
            { new: true, upsert: true}
        )
        res.status(201).json(user);
    }  catch (err) {
        return res.status(500).json({ message: err.message });
    }
}