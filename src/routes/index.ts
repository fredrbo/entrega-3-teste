import { Router, Request, Response } from "express"
import usuario from './usuario'
import horaExtra from './horaExtra'
import sobreaviso from './sobreaviso'
import squad from './squad'
import user from './user'
import department from './department'
import UsersController from "../controllers/UsersController"

const routes = Router()
routes.post("/login", UsersController.login)

routes.use("/department", department)
routes.use("/hora-extra", horaExtra)
routes.use("/sobreaviso", sobreaviso)
routes.use("/usuario", usuario)
routes.use("/squad", squad)
routes.use("/user", user)

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) )

export default routes
