export class Usuario {
    id: string;
    usuario: string;
    correo: string;
    clave: string;
    fechaRegistro: Date;

    constructor(usuario: string = '', correo: string = '', clave: string = '', fechaRegistro: Date = new Date(), id: string = '') {
        this.usuario = usuario;
        this.correo = correo;
        this.clave = clave;
        this.id = id;
        this.fechaRegistro = fechaRegistro;
    }
}