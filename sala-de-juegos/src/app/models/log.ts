export class Log {
    id: string;
    fecha: Date;

    constructor(id: string = '', fecha: Date = new Date()) {
        this.id = id;
        this.fecha = fecha;
    }
}