import mongoose from "mongoose";

export const resetDatabase = async () => {

    try {

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
    
})
.catch((error) => {
    console.error('❌ error deleting data...', error)
    throw error
})