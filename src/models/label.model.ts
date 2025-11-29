import mongoose, {Schema} from "mongoose";
import {LABEL_COLOR} from '../config/colors'

const labelSchema = new Schema({
    name: {type: String, required: true, maxlength: 60},
    color: {type: String, required: false, enum: LABEL_COLOR},
    isfavorite: {type: Boolean, default: false},
    
    // Relations
    userId: {type: Schema.Types.ObjectId, ref: "User", index: true, required: true}    
},
{
    timestamps: true
}
)

const labelModel = mongoose.model('Label', labelSchema)

export default labelModel