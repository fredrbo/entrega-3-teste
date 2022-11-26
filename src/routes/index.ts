import { Router, Request, Response } from "express"
import usuario from './usuario'
import horaExtra from './horaExtra'
import sobreaviso from './sobreaviso'
import squad from './squad'

const routes = Router()

routes.use("/hora-extra", horaExtra)
routes.use("/sobreaviso", sobreaviso)
routes.use("/usuario", usuario)
routes.use("/squad", squad)

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) )

export default routes
