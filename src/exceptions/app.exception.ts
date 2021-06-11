

export class AppException extends Error {

    public readonly codigo: number;
    public readonly mensaje: string;

    constructor(codigo: number, mensaje: string) {
        
        super(mensaje);
        this.codigo = codigo;
        this.mensaje = mensaje;
        
    }

 }