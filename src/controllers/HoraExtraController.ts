import { Usuario } from './../entitities/Usuario';
import { AppDataSource } from "../data-source"
import { Request, Response } from 'express'
import { Horasextras } from "../entitities/HoraExtra";

class HoraExtraController {
  public async list(req: Request, res: Response): Promise<Response> {
    const horaextras = await AppDataSource.manager.find(Horasextras)
    return res.json(horaextras)
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const horaextra = await AppDataSource.manager.findOneBy(Horasextras, { id: id })
    if (!id)
      return res.json({ error: "Id inválido" })
    if (horaextra)
      return res.json(horaextra)
    return res.json({ error: "Dados inválidos" })
  }

  public async findByStatus(req: Request, res: Response): Promise<Response> {
    const { status } = req.body
    const horaextra = await AppDataSource.manager.findBy(Horasextras, { status: status })
    if (status != 'Aprovado' && status != 'Recusado' && status != 'Pendente')
      return res.json({ error: "Status inválido" })
    if (horaextra)
      return res.json(horaextra)
    return res.json({ error: "Dados inválidos" })
  }

  public async getAllPendente(req: Request, res: Response): Promise<Response> {
    const horaextra = await AppDataSource.manager.findBy(Horasextras, { status: "Pendente" })
    return res.json(horaextra)
  }

  // public async getByUserId(req: Request, res: Response): Promise<Response> {
  //   const { usuario } = req.body
  //   const horaextra = await AppDataSource.manager.findOneBy(Horasextras, { usuario: usuario })
  //   if (!usuario)
  //     return res.json({ error: "Id inválido" })
  //   if (horaextra)
  //     return res.json(horaextra)
  //   return res.json({ error: "Dados inválidos" })
  // }

  public async create(req: Request, res: Response) {
    const { idusuario, codverba, dia, horainicio, horafim } = req.body;
    const usuario: any = await AppDataSource.manager.findOneBy(Usuario, { id: idusuario }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (!idusuario) {
      return res.json({ error: 'Id do usuário não informado' })
    }

    if (idusuario && usuario.id) {
      const horaExtra = new Horasextras()
      horaExtra.usuario = usuario
      horaExtra.codverba = codverba
      horaExtra.dia = dia
      horaExtra.horainicio = horainicio
      horaExtra.horafim = horafim
      horaExtra.status = "Pendente"

      await AppDataSource.manager.save(Horasextras, horaExtra)
      res.json(horaExtra)
    }
    else {
      return res.json(usuario)
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, codverba, dia, horainicio, horafim, status } = req.body
    const horaextra: any = await AppDataSource.manager.findOneBy(Horasextras, { id }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (horaextra && horaextra.id) {
      horaextra.codverba = codverba
      horaextra.dia = dia
      horaextra.horainicio = horainicio
      horaextra.horafim = horafim
      horaextra.status = status

      const r = await AppDataSource.manager.save(Horasextras, horaextra)
      return res.json(r)

    }
    else if (horaextra && horaextra.error) {
      return res.json(horaextra)
    }
    else {
      return res.json({ error: "Hora extra não localizada" })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const horaextra: any = await AppDataSource.manager.findOneBy(Horasextras, { id }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (horaextra && horaextra.id) {
      const r = await AppDataSource.manager.remove(Horasextras, horaextra).catch((e) => e.message)
      return res.json(r)
    }
    else if (horaextra && horaextra.error) {
      return res.json(horaextra)
    }
    else {
      return res.json({ error: "Hora extra não localizada" })
    }
  }
}

export default new HoraExtraController()