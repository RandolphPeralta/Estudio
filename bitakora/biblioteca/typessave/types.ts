export type Libro = {
    id: string
    titulo: string
    autor: string
    disponible: boolean
}

export type Estudiante = {
    id: string
    nombre: string,
    identificacion: string
    grado: string
}

export type Prestamos = {
    idLibro: string,
    idCliente: string
    fechaPrestamo: Date;
    fechaDevolucion?: Date;
}

export type MenuOption = {
    key: number;
    label: string;
}