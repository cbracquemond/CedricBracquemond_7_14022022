const express = require("express")
const auth = require("../middlewares/auth")
const userCtrl = require("../controlers/user.controler")

const router = express.Router()

//routes:
router.post("/", userCtrl.createUser)
router.post("/login", userCtrl.login)
router.get("/", auth, userCtrl.getAllUsers)
router.get("/:id", auth, userCtrl.getOneUser)
router.put("/:id", auth, userCtrl.updateUser)
router.delete("/:id", auth, userCtrl.deleteUser)

module.exports = router
