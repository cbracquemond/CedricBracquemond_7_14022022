const userService = require("../service/user.service")

exports.createUser = async (req, res) => {
	try {
		await userService.createUser(req.body)
		return res.status(201).json({
			status: 201,
			message: "User Succesfully Created"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.login = async (req, res) => {
	try {
		const userChecked = await userService.login(req.body)
		if (!userChecked)
			return res
				.status(401)
				.json({ status: 401, message: "Mot de passe incorrect !" })
		return res.status(200).json({
			status: 200,
			data: userChecked,
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
			status: 200,
			data: users,
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
			status: 200,
			data: user,
			message: "User Succesfully Retrieved"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.updateUser = async (req, res) => {
	try {
		await userService.updateUser(req.body, req.params.id)
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
		await userService.deleteUser(req.params.id)
		return res.status(200).json({
			status: 200,
			message: "User Succesfully Deleted"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}
