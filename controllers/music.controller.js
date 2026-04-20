import musicModel from "../models/music.model.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import upload from '../services/upload.service.js'
import albumModel from "../models/album.model.js";

async function createMusic(req, res) {

    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'artist') {
            return res.status(403).json({message: "Forbidden"})
        }
        const {title} = req.body;
        const file = req.file;

        const result = await upload(file.buffer.toString('base64'))

        const music = await musicModel.create({
            URI: result.url,
            title,
            artist: decoded.id
        })
        
        res.status(201).json({message: "Song uploaded successfully", 
            music: {
                id: music._id,
                uri: music.URI,
                title: music.title,
                artist: music.artist
            }
        })
    }

    catch(err) {
        return res.status(401).json({message: "Unauthorized"})
    }
}

async function createAlbum(req, res) {
    const token = req.cookies.token;
    if(!token) {
        return res.status(409).json({message: "unauthorized"});
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(decode.role !== 'artist') {
            return res.status(401).json({message: "Forbidden"})
        }
        
        const {title, musicIds} = req.body;

        const album = albumModel.create({
            title,
            artist: decoded.id,
            musics: musicIds
        })

        res.status(201).json({message: "album created successfully", 
            album: {
                title: album.title,
                id: album._id,
                artist: album.artist,
                musics: album.music
            }
        })
    }

    catch (err) {
        return res.status(409).json({message: "unauthorized"});
    }
}

export default {createMusic, createAlbum};