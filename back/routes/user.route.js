const express = require("express")
const auth = require("../middlewares/auth")
const userCtrl = require("../controlers/user.controler")
const multer = require("../middlewares/multer-config")
const router = express.Router()

//routes:
router.post("/", multer, userCtrl.createUser)
router.post("/login", userCtrl.login)
router.get("/", auth, userCtrl.getAllUsers)
router.get("/:id", auth, userCtrl.getOneUser)
router.put("/:id", auth, multer, userCtrl.updateUser)
router.delete("/:id", auth, userCtrl.deleteUser)
router.post("/check", auth, userCtrl.checkPassword)

module.exports = router
