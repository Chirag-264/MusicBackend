import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'

async function registerUser(req, res) {
    const {username, email, password, role="user"} = req.body;

    const hashPassword = await bcrypt.hash(password, 8);

    const userAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(userAlreadyExists) {
        return res.status(409).json({message: "User already exists!"});
    }

    const user = await userModel.create({
        username,
        email,
        password: hashPassword,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({message: "Account created successfully", 
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

}

export default registerUser;