const userService = require("../service/user.service")

exports.createUser = async (req, res) => {
	const user = JSON.parse(req.body.user)
	if (req.file != undefined)
		user.image_url = `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`
	try {
		await userService.createUser(user)
		return res.status(201).json({
			message: "User Succesfully Created"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.login = async (req, res) => {
	try {
		const queryResult = await userService.login(req.body)
		if (!queryResult.token) return res.status(401).json({ err })
		return res.status(200).json({
			token: queryResult.token,
			user: queryResult.user,
			message: "User Succesfully Logged In"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAllUsers()
		return res.status(200).json({
			users,
			message: "Users Succesfully Retrieved"
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: err.message })
	}
}

exports.getOneUser = async (req, res) => {
	try {
		const user = await userService.getOneUser(req.params.id)
		return res.status(200).json({
			user,
			message: "User Succesfully Retrieved"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.updateUser = async (req, res) => {
	try {
		await userService.updateUser(req.body, req.params.id, res.locals.userId)
		return res.status(200).json({
			status: 200,
			message: "User Succesfully Updated"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.deleteUser = async (req, res) => {
	try {
		await userService.deleteUser(req.params.id, res.locals.userId)
		return res.status(200).json({
			status: 200,
			message: "User Succesfully Deleted"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.checkPassword = async (req, res) => {
	try {
		await userService.checkPassword(req.body)
		return res.status(200).json({
			status: 200,
			message: "Password correct"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}
