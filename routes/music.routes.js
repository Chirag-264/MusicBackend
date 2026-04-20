import express from 'express';
import musicController from '../controllers/music.controller.js'
import multer, { memoryStorage } from 'multer'


const musicRouter = express.Router();
const upload = multer({
    storage: memoryStorage()
})

musicRouter.post('/create',upload.single("music"), musicController.createMusic)
musicRouter.post('/create-album',upload.single("music"), musicController.createAlbum)


export default musicRouter;