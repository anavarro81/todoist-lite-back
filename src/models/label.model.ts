import mongoose, {Schema} from "mongoose";

const labelSchema = new Schema({
    name: {type: String, required: true, maxlength: 20},
    color: {type: String, required: false, maxlength: 20},
    favorite: {type: Boolean, required: false, default: false}
    
})

const labelModel = mongoose.model('Label', labelSchema)

export default labelModel