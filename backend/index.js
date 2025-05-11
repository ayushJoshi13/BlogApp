import express from 'express';
import cors from 'cors'
import connectMongoDB from './db/db.js';

import authRouter from './routes/auth.js'
import noteRouter from './routes/note.routes.js'

const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/note', noteRouter)

app.listen(port || 5001, ()=>{
    connectMongoDB()
    console.log('server is running on port 5000');
    
})