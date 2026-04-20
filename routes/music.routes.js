import express from 'express';
import createMusic from '../controllers/music.controller.js'
import multer, { memoryStorage } from 'multer'


const musicRouter = express.Router();
const upload = multer({
    storage: memoryStorage()
})

musicRouter.post('/create',upload.single("music"), createMusic)


export default musicRouter;