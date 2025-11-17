import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    photo: {type: String, required: false}, 
    name: {type: String, required: false,  trim: true, minlength: 3,  maxlength:20 },
    email: {type: String, required: true, trim: true },
    password: {type: String, required: true, trim: true},
    task: [{type: Schema.Types.ObjectId, ref: "Task"}]

}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)

export default userModel