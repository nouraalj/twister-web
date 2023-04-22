const router = require("express").Router();

const twistController = require("./controllers/twistController");

router.get("/", twistController.getAllTwists);
router.post("/", twistController.createTwist);
router.put("/:id", twistController.updateTwist);
router.delete("/:id", twistController.deleteTwist);
router.patch("/:id/like", twistController.likeTwist);
router.patch("/:id/unlike", twistController.unLikeTwist);
router.patch("/:id/retwist", twistController.retwistTwist);
router.patch("/:id/unretwist", twistController.unRetwistTwist);
router.get("/timeline", twistController.getTimelineTwists);
//comments routes
router.patch("/:id/comment", twistController.commentTwist);
router.patch("/:id/delete-comment", twistController.deleteComment);

module.exports = router;
