import express from 'express'
import {adduser, getuser } from '../controllers/usercontroller.js';
import { getconversation, newconversation } from '../controllers/conversation-control.js';
import { getmessage, newmessage } from '../controllers/messagecontroller.js';
import { getImage, uploadImage } from '../controllers/image-controller.js';
import upload from '../utils/upload.js';

export const route=express.Router();
route.post('/add',adduser);
route.get('/users',getuser);


route.post('/conversation/add',newconversation);
route.post('/conversation/get',getconversation);


route.post('/message/new',newmessage);
route.get('/message/get/:id',getmessage);


route.post('/file/upload',upload.single('file'),uploadImage);
route.get('/file/:filename', getImage);

