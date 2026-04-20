import 'dotenv/config'
import ImageKit from '@imagekit/nodejs'


const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function upload(file) {
    const response = await ImageKitClient.files.upload({
        file: file,
        fileName: "music_" + Date.now(),
        folder: "Music-backend"
    })
    return response;
}

export default upload;
