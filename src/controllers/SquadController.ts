import { Usuario } from '../entitities/Usuario';
import { AppDataSource } from "../app-data-source"
import { Request, Response } from 'express'
import { Squad } from "../entitities/Squad";

class squadController {
  public async list(req: Request, res: Response): Promise<Response> {
    const squads = await AppDataSource.manager.find(Squad)
    return res.json(squads)
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const squad = await AppDataSource.manager.findOneBy(Squad, { id: id })
    if (!id)
      return res.json({ error: "Id inválido" })
    if (squad)
      return res.json(squad)
    return res.json({ error: "Dados inválidos" })
  }

  // public async getByUserId(req: Request, res: Response): Promise<Response> {
  //   const { usuario } = req.body
  //   const squad = await AppDataSource.manager.findOneBy(Squad, { usuario: usuario })
  //   if (!usuario)
  //     return res.json({ error: "Id inválido" })
  //   if (squad)
  //     return res.json(squad)
  //   return res.json({ error: "Dados inválidos" })
  // }

  public async create(req: Request, res: Response) {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    let formatDate = [day, month, year].join('/')


    const { name } = req.body
    const usuario = await AppDataSource.manager.save(Squad, { name: name, dataCriada: formatDate })

    usuario.name = name
    usuario.dataCriada = formatDate

    return res.json(usuario)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {id, name } = req.body

    const squad: any = await AppDataSource.manager.findOneBy(Squad, { id }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (squad && squad.id) {
      squad.name = name

      const r = await AppDataSource.manager.save(Squad, squad)
      return res.json(r)

    }
    else if (squad && squad.error) {
      return res.json(squad)
    }
    else {
      return res.json({ error: "Squad não localizada" })
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const squad: any = await AppDataSource.manager.findOneBy(Squad, { id }).catch((e) => {
      return { error: "Identificador inválido" }
    })
    if (squad && squad.id) {
      const r = await AppDataSource.manager.remove(Squad, squad).catch((e) => e.message)
      return res.json(r)
    }
    else if (squad && squad.error) {
      return res.json(squad)
    }
    else {
      return res.json({ error: "Squad não localizada" })
    }
  }
}

export default new squadController()