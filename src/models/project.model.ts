import mongoose, {Schema} from "mongoose";

const projectSchema = new Schema({
    name: {type: String, required: true, maxlength: 20},
    color: {type: String,  maxlength: 20},
    projectParent: {type: String,  maxlength: 20},
    favourite: {type: Boolean,  default: false},
    layout: {type: String,  enum: ["List", "Board", "Calendar"]}

})

const projectModel = mongoose.model("Project", projectSchema)

export default projectModel

