const express = require("express")
const auth = require("../middlewares/auth")
const commentCtrl = require("../controlers/comment.controler")

const router = express.Router()

//routes:
router.get("/:id", auth, commentCtrl.getAllCommmentsFromPost)
router.post("/:id", auth, commentCtrl.createComment)
// router.delete("/:id", auth, commentCtrl.deletePost)
// router.get("/:id", auth, commentCtrl.getOnePost)
// router.put("/:id", auth, commentCtrl.editPost)
// router.post("/:id/like", auth, commentCtrl.likePost)

module.exports = router
