import { validateCourses, validatePartialUser, validateUser } from '../schemas/usuario.js'

export class UserController {
    constructor({ UserModel }) {
        this.userModel = UserModel
    }

    createUser = async(req, res) => {
        const result = validateUser(req.body)
        if (!result.success) return res.status(400).json(result.error)
        const newUser = await this.userModel.creteUser({ input: result.data })
        res.status(201).json(newUser)
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
