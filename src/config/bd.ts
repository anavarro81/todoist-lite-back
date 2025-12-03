import mongoose from "mongoose";


export const connectDB = async () => {

    try {


        if (!process.env.BD_URI) {
            console.error('Cadena de conexion no definida')
            process.exit(1)
        }

        const connection = await mongoose.connect(process.env.BD_URI)
        console.log('Conexion a base de datos correcta')
        
    } catch (error) {
        console.error('Error realizando la conexion ', error)
        process.exit(1)
        
    }


}