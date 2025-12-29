// src/__tests__/utils/test-db-setup.ts
import mongoose from 'mongoose';

export const setupDB = async () => {
  // ✅ Usa getClient().db() para obtener el nombre real de la BD (no db?.databaseName)
  if (mongoose.connection.readyState === 1) {
    const dbName = mongoose.connection.getClient().db().databaseName;
    if (dbName === 'todoist_test') return;
  }

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.BD_URI!, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    retryWrites: false
  });
};

export const teardownDB = async () => {
  // ✅ Obtén la BD explícitamente por nombre para evitar undefined
  const client = mongoose.connection.getClient();
  const db = client.db('todoist_test');
  
  const collections = await db.collections();
  await Promise.all(
    collections.map(collection => collection.deleteMany({}))
  );
};

export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};