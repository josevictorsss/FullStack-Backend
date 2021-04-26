import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { UserInputDTO } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

const userBusiness = new UserBusiness(
  new IdGenerator(),
  new Authenticator(),
  new HashManager(),
  new UserDatabase()
);
class UserController {
  public signup = async (req: Request, res: Response) => {
    try {
      const { name, email, nickname, password, role } = req.body;
      const input: UserInputDTO = {
        name,
        email,
        nickname,
        password,
        role,
      };
      const token = await userBusiness.signup(input);
      res.status(201).send({ token });
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  };
}

export { UserController };