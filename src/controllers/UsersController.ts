import { AppDataSource } from "../app-data-source"
import { Request, Response } from 'express'
import { User } from '../entitities/User'

class UsuarioController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email,password, type} = req.body
        const usuario = await AppDataSource.manager.save(User, { name, email,password, type }).catch((e) => {
            // testa se o e-mail é repetido
            if (/(mail)[\s\S]+(already exists)/.test(e.detail)) {
                return { error: 'e-mail já existe' }
            }
            return e
        })

        return res.json(usuario)
    }

}

export default new UsuarioController()