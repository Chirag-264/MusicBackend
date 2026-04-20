import express from 'express';
import musicController from '../controllers/music.controller.js'
import multer, { memoryStorage } from 'multer'
import authMiddleware from '../middlewares/auth.middleware.js';


const musicRouter = express.Router();
const upload = multer({
    storage: memoryStorage()
})

musicRouter.post('/create',authMiddleware, upload.single("music"), musicController.createMusic)
musicRouter.post('/create-album',authMiddleware, musicController.createAlbum)


export default musicRouter;