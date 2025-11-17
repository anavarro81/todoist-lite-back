import express from 'express';
import server from './server'
import 'module-alias/register';


const PORT = process.env.PORT || 3000


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});