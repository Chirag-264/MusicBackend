import musicModel from "../models/music.model.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import upload from '../services/upload.service.js'

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

export default createMusic;