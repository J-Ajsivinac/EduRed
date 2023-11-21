import { validateCom } from '../schemas/comentario.js'

export class CommentController {
    constructor({ CommentModel }) {
        this.comModel = CommentModel
    }

    createPub = async(req, res) => {
        const result = validateCom(req.body)
        if (!result.success) return res.status(400).json(result.error)
        const newPub = await this.comModel.createComment({ input: result.data })
        res.status(201).json(newPub)
    }

    getPubByType = async(req, res) => {
        const id = req.params.id
        const user = await this.comModel.getAllComByType({ id })
        if (user) return res.json(user)
        // res.status(404).json({ message: 'user not found' })
    }
}
