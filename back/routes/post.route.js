const express = require("express")
const auth = require("../middlewares/auth")
const postCtrl = require("../controlers/post.controler")
const multer = require("../middlewares/multer-config")
const router = express.Router()

//routes:
router.get("/", auth, postCtrl.getAllPosts)
router.post("/", auth, multer, postCtrl.createPost)
router.delete("/:id", auth, postCtrl.deletePost)
router.get("/:id", auth, postCtrl.getOnePost)
router.put("/:id", auth, postCtrl.editPost)
router.post("/:id/like", auth, postCtrl.likePost)

module.exports = router
