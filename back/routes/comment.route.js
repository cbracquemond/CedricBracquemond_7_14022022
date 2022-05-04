const express = require("express")
const auth = require("../middlewares/auth")
const multer = require("../middlewares/multer-config")
const commentCtrl = require("../controlers/comment.controler")

const router = express.Router()

//routes:
router.get("/:id", auth, commentCtrl.getAllCommentsFromPost)
router.post("/:id", auth, multer, commentCtrl.createComment)
router.delete("/:id", auth, commentCtrl.deleteComment)
router.put("/:id", auth, commentCtrl.editComment)

module.exports = router
