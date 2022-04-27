require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")
const commentRoute = require("./routes/comment.route")

const app = express()

//Middlewares:
require("./config/mysql")
app.use(cors())
app.use(express.json())

//Routes:

app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)
app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
