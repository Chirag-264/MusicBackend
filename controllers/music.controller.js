import musicModel from "../models/music.model.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import upload from '../services/upload.service.js'
import albumModel from "../models/album.model.js";

async function createMusic(req, res) {

    const token = req.cookies.token;

    
        
    const {title} = req.body;
    const file = req.file;

    const result = await upload(file.buffer.toString('base64'))

    const music = await musicModel.create({
        URI: result.url,
        title,
        artist: req.user.id
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

async function createAlbum(req, res) {
    const {title, musicIds} = req.body;

    const album = albumModel.create({
        title,
        artist: req.user.id,
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

async function getAllMusic(req, res) {
    const musics = await musicModel.find().populate("artist");
    res.status(200).json({message: "all music fetched successfully", musics: musics})
}

async function getAlbums(req, res) {
    const albums = await albumModel.find().populate("artist")
    res.status(200).json({message: "all albums fetched successfully", albums: albums})

}

async function getAlbumsById(req, res) {
    const albumId = req.params.albumId
    const album = await albumModel.findById(albumId).populate("artist")
}

export default {createMusic, createAlbum, getAllMusic, getAlbums};