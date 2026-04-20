import jwt from 'jsonwebtoken'

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.status(409).json({message: "unauthorized"});
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(decode.role !== 'artist') {
            return res.status(401).json({message: "Forbidden"})
        }
        req.user = decode;
        next();
    }
    catch(err) {
        return res.status(409).json({message: "unauthorized"});
    }
}

export default authMiddleware