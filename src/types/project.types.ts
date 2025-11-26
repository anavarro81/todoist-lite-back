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


