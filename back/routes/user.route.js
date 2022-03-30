const express = require("express")
const auth = require("../middlewares/auth")
const userCtrl = require("../controlers/user.controler")

const router = express.Router()

//routes:
router.post("/", userCtrl.createUser)
router.post("/login", userCtrl.login)
router.get("/", userCtrl.getAllUsers)
router.get("/:id", userCtrl.getOneUser)
router.put("/:id", userCtrl.updateUser)
router.delete("/:id", userCtrl.deleteUser)

module.exports = router
