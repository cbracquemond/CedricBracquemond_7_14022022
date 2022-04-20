const express = require("express")
const auth = require("../middlewares/auth")
const postCtrl = require("../controlers/post.controler")

const router = express.Router()

//routes:
router.get("/", auth, postCtrl.getAllPosts)
router.post("/", auth, postCtrl.createPost)
router.delete("/:id", auth, postCtrl.deletePost)
router.get("/:id", auth, postCtrl.getOnePost)
router.put("/:id", auth, postCtrl.editPost)

module.exports = router
