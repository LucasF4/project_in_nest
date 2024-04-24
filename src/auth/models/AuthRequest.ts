import { Request } from "express"
import { User } from "../entities/user.entities"

export interface AuthRequest extends Request{
    user: User;
}