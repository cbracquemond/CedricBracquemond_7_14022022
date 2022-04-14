const express = require("express")
const auth = require("../middlewares/auth")
const postCtrl = require("../controlers/post.controler")

const router = express.Router()

//routes:
router.get("/", auth, postCtrl.getAllPosts)
router.post("/", auth, postCtrl.createPost)
router.delete("/:id", auth, postCtrl.deletePost)
// router.post("/login", userCtrl.login)
// router.get("/", userCtrl.getAllUsers)
// router.get("/:id", userCtrl.getOneUser)
// router.put("/:id", userCtrl.updateUser)
// router.delete("/:id", userCtrl.deleteUser)

module.exports = router
