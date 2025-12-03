import mongoose from "mongoose";
import 'dotenv/config'
import {connectDB} from '../config/bd'

console.log('datos ', process.env.BD_URI)

export const resetDatabase = async () => {

    try {

        await connectDB()

        const collections = await mongoose.connection.db?.collections()

        if(collections) {
            for (const collection of collections){
                await collection.deleteMany({})
                console.log(`${collection.collectionName} sucesfully deleted`);                
            }
        }

    } catch (error) {
        throw error
        
    }

}

resetDatabase()
.then( () => {
    console.log('💚 database succesfully deleted');
    process.exit(1)
    
})
.catch((error) => {
    console.error('❌ error deleting data...', error)
    throw error
})