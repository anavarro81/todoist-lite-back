
import mongoose, { Schema }  from "mongoose";



const taskSchema = new Schema({
    name: {type: String, required: true, maxlength: 50},
    description: {type: String, required: false, maxlength: 100},
    created: {type: Date, default: Date.now},
    priority: {type: String, enum: ["priority 1", "priority 2", "priority 3", "priority 4"], default: "priority 4" },
    deadline: {type: Date, required: false },
    dueTime: {type: Date},
    
    // TODO  Termina de definir el modelo para la repetición. Preguntar a GPT si los nombres son correctos. 
    repeat: {
       repeatType: {type: String, required: true, enum: ['none', 'weekday', 'weekend', 'custom'], default: 'none'},
       custom: {
            interval: {type: Number, min: 1},
            unit: {type: String, enum: ['day', 'week', 'month', 'year']}
       }
        
    },
    
    
    // relations
    user: {type: Schema.Types.ObjectId, ref: "User", required: true },
    label: [{type: Schema.Types.ObjectId, ref: "Label" }],
    project: {type: Schema.Types.ObjectId, ref: "Project" },
    parentTask: {type: Schema.Types.ObjectId, ref: "Task", index: true },

    
}, 
{
    timestamps: true, // add createdAt y updatedAt
})

const taskModel = mongoose.model("Task", taskSchema)

export default taskModel

