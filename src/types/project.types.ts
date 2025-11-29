import {Document, Types} from 'mongoose'

export interface IProject {

    name: string
    color?: string | null
    projectParent?: string  | null
    favourite?: boolean
    layout?: string 
    isDefault?: boolean
    user: Types.ObjectId | string
}

export type ProjectDocument = Document & IProject


interface User {
    id: number
    name: string
    email: string
    age?: number
}

let newUser: User

// Crea una interfaz User con los campos: id (number), name (string), email (string) y un campo opcional age (number).
// Define una variable de tipo User.
