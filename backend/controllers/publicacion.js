import { validatePub } from '../schemas/publicacion.js'

export class PubController {
    constructor({ PublicationModel }) {
        this.pubModel = PublicationModel
    }

    createPub = async(req, res) => {
        const result = validatePub(req.body)
        if (!result.success) return res.status(400).json(result.error)
        const newPub = await this.pubModel.createPub({ input: result.data })
        res.status(201).json(newPub)
    }

    getPub = async(req, res) => {
        const pub = await this.pubModel.getAllPub()
        if (pub) return res.json(pub)
        // res.status(404).json({ message: 'user not found' })
    }

    getPubByType = async(req, res) => {
        const id = parseInt(req.params.id)
        const user = await this.pubModel.getAllPubByType({ id })
        if (user) return res.json(user)
        // res.status(404).json({ message: 'user not found' })
    }

    getPubByName = async(req, res) => {
        const id = req.params.id
        const user = await this.pubModel.getAllByName({ id })
        if (user) return res.json(user)
        // res.status(404).json({ message: 'user not found' })
    }
}
