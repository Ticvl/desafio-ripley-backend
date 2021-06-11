import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repositorys/auth.repository";

const CONFIG = require('../configs/config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class AuthService {

    private authRepository = new AuthRepository();

    constructor() { }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        console.log('AuthService - login');
        if(!req.body.correo) {
            res.status(422).send({ error: 'Campos incompletos' });
            return;
        }
        return await this.authRepository.login(req.body.correo).then( async (result) => {
            if(!result) {
                return res.status(400).send('Usuario o password incorrectos.')
            }
            const validarPassword = await this.compararPassword(req.body.password, result.password);
            if(!validarPassword) {
                return res.status(400).send('Usuario o password incorrectos.');
            }
            const jwtToken = this.generarJWT(result._id, result.correo);
            return res.status(200).header('Authorization', jwtToken).send({ isAuthenticated: true});
        }, (error) => {
            next(error);
        });
    }

    private compararPassword = async (password: string, dbPassword: string) => {
        return await bcrypt.compare(password, dbPassword);
    }

    private generarJWT = (_id: string, correo: string) => {
        return jwt.sign({ _id: _id, correo: correo }, CONFIG.PRIVATE_KEY);
    }

    public verificarJWT = async (jwtToken: string) => {
        return await jwt.verify(jwtToken, CONFIG.PRIVATE_KEY);
    }
        
}