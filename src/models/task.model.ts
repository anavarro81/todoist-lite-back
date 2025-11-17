import mongoose, { Schema }  from "mongoose";


const repetitionSchema = new Schema({
    
})

const taskSchema = new Schema({
    name: {type: String, required: true, maxlength: 50},
    description: {type: String, required: false, maxlength: 100},
    created: {type: Date, default: Date.now},
    priority: {type: String, enum: ["priority 1", "priority 2", "priority 3", "priority 4"], default: "priority 4" },
    deadline: {type: Date, required: false },
    // relations
    user: {type: Schema.Types.ObjectId, ref: "User"},
    label: [{type: Schema.Types.ObjectId, ref: "Label" }]

    
})

const taskModel = mongoose.model("Task", taskSchema)

export default taskModel

