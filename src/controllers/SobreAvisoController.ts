import { Sobreaviso } from '../entitities/Sobreaviso';

import { AppDataSource } from "../data-source"
import { Request, Response } from 'express'
import { Usuario } from '../entitities/Usuario';

class SobreavisoController {
  public async list(req: Request, res: Response): Promise<Response> {
    const sobreaviso = await AppDataSource.manager.find(Sobreaviso)
    return res.json(sobreaviso)
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const sobreaviso = await AppDataSource.manager.findOneBy(Sobreaviso, { id: id })
    if (!id)
      return res.json({ error: "Id inválido" })
    if (sobreaviso)
      return res.json(sobreaviso)
    return res.json({ error: "Dados inválidos" })
  }

  public async findByStatus(req: Request, res: Response): Promise<Response> {
    const { status } = req.body
    const sobreaviso = await AppDataSource.manager.findBy(Sobreaviso, { status: status })
    if (status != 'Aprovado' && status != 'Recusado' && status != 'Pendente')
      return res.json({ error: "Status inválido" })
    if (sobreaviso)
      return res.json(sobreaviso)
    return res.json({ error: "Dados inválidos" })
  }

  public async getAllPendente(req: Request, res: Response): Promise<Response> {
    const horaextra = await AppDataSource.manager.findBy(Sobreaviso, { status: "Pendente" })
    return res.json(horaextra)
  }

  public async create(req: Request, res: Response) {
    const { idusuario, dia, horainicio, horafim } = req.body;
    const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: idusuario }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (!idusuario) {
      return res.json({ error: 'Id do usuário não informado' })
    }
    
    if (idusuario && usuario.id) {
      const sobreaviso = new Sobreaviso()
      sobreaviso.usuario = usuario
      sobreaviso.codverba = 3000
      sobreaviso.dia = dia
      sobreaviso.horainicio = horainicio
      sobreaviso.horafim = horafim
      sobreaviso.status = "Pendente"

      await AppDataSource.manager.save(Sobreaviso, sobreaviso)
      res.json(sobreaviso)
    }
    else {
      return res.json(usuario)
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, codverba, dia, horainicio, horafim, status } = req.body
    const sobreaviso: any = await AppDataSource.manager.findOneBy(Sobreaviso, { id }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (sobreaviso && sobreaviso.id) {
      sobreaviso.codverba = codverba
      sobreaviso.dia = dia
      sobreaviso.horainicio = horainicio
      sobreaviso.horafim = horafim
      sobreaviso.status = status

      const r = await AppDataSource.manager.save(Sobreaviso, sobreaviso)
      return res.json(r)

    }
    else if (sobreaviso && sobreaviso.error) {
      return res.json(sobreaviso)
    }
    else {
      return res.json({ error: "Sobreaviso não localizada" })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const sobreaviso: any = await AppDataSource.manager.findOneBy(Sobreaviso, { id }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (sobreaviso && sobreaviso.id) {
      const r = await AppDataSource.manager.remove(Sobreaviso, sobreaviso).catch((e) => e.message)
      return res.json(r)
    }
    else if (sobreaviso && sobreaviso.error) {
      return res.json(sobreaviso)
    }
    else {
      return res.json({ error: "Sobreaviso não localizada" })
    }
  }
  // verificar pq nao cria sobre aviso   
}

export default new SobreavisoController()