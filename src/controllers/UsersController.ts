import { AppDataSource } from "../data-source"
import { Request, Response } from 'express'
import { User } from '../entitities/User'
import { generateToken } from "../middlewares"

class UsuarioController {

    public async login(req: Request, res: Response): Promise<Response> {
        const { mail, senha } = req.body
        // como a propriedade senha não está disponível para select {select: false},
        // então precisamos usar esta conulta para forçar incluir a propriedade 
        const usuario: any = await AppDataSource
          .getRepository(User)
          .createQueryBuilder("user")
          .select()
          .addSelect('user.senha')
          .where("user.mail=:mail", { mail })
          .getOne()
    
        if (usuario && usuario.id) {
          const r = await usuario.compare(senha)
          if (r) {
            // cria um token codificando o objeto {idusuario,mail}
            const token = await generateToken({ id: usuario.id, mail: usuario.mail })
            // retorna o token para o cliente
            return res.json({
              id: usuario.id,
              mail: usuario.mail,
              token
            })
          }
          return res.json({ error: "Dados de login não conferem" })
        }
        else {
          return res.json({ error: "Usuário não localizado" })
        }
      }

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