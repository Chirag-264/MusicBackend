import express from 'express';
import musicController from '../controllers/music.controller.js'
import multer, { memoryStorage } from 'multer'
import authMiddleware from '../middlewares/auth.middleware.js';


const musicRouter = express.Router();
const upload = multer({
    storage: memoryStorage()
})

musicRouter.post('/create',authMiddleware.authArtist, upload.single("music"), musicController.createMusic)
musicRouter.post('/create-album',authMiddleware.authArtist, musicController.createAlbum)
musicRouter.get('/',authMiddleware.authUser, musicController.getAllMusic)
musicRouter.get('/albums',authMiddleware.authUser, musicController.getAlbums)
musicRouter.get('/albums/:albumId',authMiddleware.authUser, musicController.getAlbums)


export default musicRouter;