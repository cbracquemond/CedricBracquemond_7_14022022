require("dotenv").config()
const express = require("express")
const cors = require("cors")
const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")

const app = express()

//Middlewares:
require("./config/mysql")
app.use(cors())
app.use(express.json())

//Routes:

app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)

module.exports = app
