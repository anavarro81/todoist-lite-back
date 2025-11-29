import mongoose, {Schema} from "mongoose";
import { isDataView } from "util/types";

const projectSchema = new Schema({
    name: {type: String, required: true, maxlength: 20},
    color: {type: String,  maxlength: 20},
    projectParent: {type: String,  maxlength: 20},
    favourite: {type: Boolean,  default: false},
    layout: {type: String,  enum: ["List", "Board", "Calendar"], default: "List"},
    
    // El proyecto Inbox es el proyecto por defecto para todos los usuario. El resto tendrá valor = false
    isDefault: {type: Boolean, default: false},

    //Relations
    // Un proyecto está asociado a un unico usuario. 
    // Cada proyecto debe de tener un usuario asociado. required: true
    // Se crea un indice para este campo. MongoDB optimiza las búsquedas
    user: {type: Schema.Types.ObjectId, ref: "User", required: true, index: true }


})

// Crea el indice para buscar por los campos user y isDefault. 
projectSchema.index({ user: 1, isDefault: 1 }, { unique: true, partialFilterExpression: { isDefault: true } })


const projectModel = mongoose.model("Project", projectSchema)

export default projectModel

