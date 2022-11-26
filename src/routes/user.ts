import { Router } from "express"
import UserController from "../controllers/UsersController"
import {authorization} from '../middlewares'

const routes = Router()
// routes.put('/', authorization, UserController.update)
// routes.post('/create',authorization, UserController.create)
routes.post('/create', UserController.create)

export default routes