import express from 'express';
import connection from './database/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import { route } from './routes/route.js';
const app=express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',route);

connection();

const PORT = 8000;
app.listen(PORT, ()=>{console.log('running')})