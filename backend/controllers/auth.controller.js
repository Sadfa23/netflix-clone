import { User } from "../models/user.model.js";
import bcrptjs from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const {email, password, username} = req.body;
        if(!email || !password || !username) 
            return res.status(400).json({success:false, message: "All fields are required"});

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email format"});
        }

        if(password.length < 6)
            return res.status(400).json({success: false, message: "Password must be at least 6 characters"});

        const existingUserbyEmail = await User.findOne({email:email});
        if(existingUserbyEmail) {
            res.status(400).json({success:false, message:"Email already exists"})
        }

        const existingUserbyUsername = await User.findOne({username:username});
        if(existingUserbyUsername) {
            res.status(400).json({success:false, message:"Username already exists"})
        }

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const salt = await bcrptjs.genSalt(10);
        const hashedPassword = await bcrptjs.hash(password, salt)

        const newUser = new User({
            email,
            password:hashedPassword,
            username,
            image
        });

        
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({success: true, user:{
            ...newUser._doc,
            password:''
        }});

    } catch (error) {
        console.log('Error in sign up route'. error);
        res.status(500).json({success:false, message:'Internal server error'})
    }
}

export async function login(req, res) {
    /*
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400).json({success:false, message:'All fields are required'})
    }

    const user = await User.findOne({email:email});
    if(!user) {
        res.status(404).json({success:false, message:'Not signed up yet'})
    }

    const isPasswordCorrect = await bcrptjs.compare(password, user.password)
    if(!isPasswordCorrect) {
        res.status(404).json({success:false, message:'Invalid credentials'})
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({success: true, user:{
        ...user._doc,
        password:''
    }});
    */

    try {
        const {email, password} = req.body;

        if(!email || !password) {
            res.status(400).json({success:false, message:'All fields are required'})
        }

        const user = await User.findOne({email:email});
            if(!user) {
            res.status(404).json({success:false, message:'Not signed up yet'})
        }

        const isPasswordCorrect = await bcrptjs.compare(password, user.password)
        if(!isPasswordCorrect) {
            res.status(404).json({success:false, message:'Invalid credentials'})
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({success: true, user:{
            ...user._doc,
            password:''
        }});
    } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export async function logout(req, res) {
    try {
        res.clearCookie('jwt-netflix');
        res.status(200).json({success:true, message:'Logged out successfully'})
    } catch (error) {
        console.log('Error in log out', error.message);
        res.status(500).json({success:false, message:'Internal server error'})
    }
}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}