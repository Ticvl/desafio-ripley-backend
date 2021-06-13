import { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repositorys/auth.repository";
import { UsuarioRepository } from "../repositorys/usuario.reposity";

const CONFIG = require('../configs/config');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class AuthService {

    private authRepository = new AuthRepository();
    private usuarioRepository = new UsuarioRepository();

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
            return res.status(200).send({ 
                isAuthenticated: true,
                token: jwtToken
            });
        }, (error) => {
            next(error);
        });
    }

    public registrarUsuario = async (req: Request, res: Response, next: NextFunction) => {

        if(!req.body.correo || !req.body.password || !req.body.rut) {            
            res.status(422).send({ error: 'Parámetros incompletos.' });
            return;
        }

        const usuario = await this.usuarioRepository.existeUsuario(req.body.rut);
        if(usuario) {
            res.status(409).send({ error: 'El recurso ya existe.' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        return await this.usuarioRepository.crearUsuario(req.body.correo, hashPassword, req.body.rut)
            .then((result) => {
                res.status(200).send({
                    _id: result._id,
                    correo: result.correo,
                    rut: result.rut
                });
            })
            .catch((error) => {
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