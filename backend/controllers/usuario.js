import { validateCourses, validatePartialUser, validateUser } from '../schemas/usuario.js'
import { createAccessToken } from '../libs/jwt.js'
export class UserController {
    constructor({ UserModel }) {
        this.userModel = UserModel
    }

    createUser = async(req, res) => {
        const result = validateUser(req.body)
        if (!result.success) return res.status(400).json(result.error.errors.map((error) => error.message))
        const newUser = await this.userModel.creteUser({ input: result.data })
        if (newUser.code === 0) {
            return res.status(400).json(newUser.err)
        }
        const token = await createAccessToken({ id: result.data.carnet })
        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV !== 'development',
            secure: true,
            sameSite: 'none'
        })
        res.status(201).json(newUser.data)
    }

    getByCarnet = async(req, res) => {
        const id = parseInt(req.params.id)
        const user = await this.userModel.getByCarnet({ id })
        if (user) return res.json(user)
        res.status(404).json({ message: 'user not found' })
    }

    changePassword = async(req, res) => {
        const data = validatePartialUser(req.body)
        if (!data.success) return res.status(400).json(data.error)
        const changePassword = await this.userModel.changePassword({ input: data.data })
        res.status(200).json(changePassword)
    }

    addCourse = async(req, res) => {
        const data = validateCourses(req.body)
        if (!data.success) return res.status(400).json(data.error)
        const changePassword = await this.userModel.addCourse({ input: data.data })
        res.status(200).json(changePassword)
    }

    getCourses = async(req, res) => {
        const id = parseInt(req.params.id)
        const courses = await this.userModel.getCourse({ id })
        if (courses) return res.json(courses)
        res.status(404).json({ message: 'Course not found' })
    }
}
