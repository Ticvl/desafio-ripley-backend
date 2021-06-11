import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repositorys/auth.repository";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class AuthService {

    private authRepository = new AuthRepository();

    constructor() { }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        console.log('AuthService - login');
        return await this.authRepository.login(req.body.correo).then((result) => {
            if(!result) {
                return res.status(400).send('Usuario o password incorrectos.')
            }
            /*
            const salt = bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const validarPassword = await bcrypt.compare(hashPassword, result.password);
            */
            if(req.body.password !== result.password) {
                return res.status(400).send('Usuario o password incorrectos.');
            }
            console.log(result);
            const jwtToken = this.generarJWT(result._id, result.correo);
            return res.status(200).header('Authorization', jwtToken).send({ isAuthenticated: true});
        }, (error) => {
            console.log('error', error);
        });
    }

    private generarJWT = (_id: string, correo: string) => {
        return jwt.sign({ _id: _id, correo: correo }, 'clave');
    }

    public verificarJWT = async (jwtToken: string) => {
        return await jwt.verify(jwtToken, 'clave');
    }
        
}