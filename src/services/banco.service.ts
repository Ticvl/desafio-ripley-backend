import { NextFunction, Request, Response, Router } from "express";
import axios, { AxiosResponse } from 'axios';

export class BancoService {

    constructor() { }

    public obtenerBancos = async (req: Request, res: Response, next: NextFunction) => {
        console.log('BancoService - obtenerBancos');
        return await axios.get('https://bast.dev/api/banks.php')
            .then((response: AxiosResponse) => {
                return res.status(200).send(response.data.banks);
            }, (error) => {
                next(error);
            });
    }
}