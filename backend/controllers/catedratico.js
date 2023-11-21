import { validateTeacher } from '../schemas/extra.js'

export class TeacherController {
    constructor({ TeacherModel }) {
        this.teacherModel = TeacherModel
    }

    createTeacher = async(req, res) => {
        const result = validateTeacher(req.body)
        if (!result.success) return res.status(400).json(result.error)
        const newPub = await this.teacherModel.creteTeacher({ input: result.data })
        res.status(201).json(newPub)
    }

    getAllTeachers = async(_req, res) => {
        const user = await this.teacherModel.getAllTeachers()
        if (user) return res.json(user)
    }
}
