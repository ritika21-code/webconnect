
import user from "../models/User.js";

export const adduser = async (req, res) => {
    try {
        const exist = await user.findOne({ sub: req.body.sub });

        if (exist !== null) {
            return res.status(200).json({ msg: "already exists" });
        }

        const newuser = new user(req.body);
        await newuser.save();

        return res.status(200).json(newuser);
    } catch (error) {
        console.error('Error while processing adduser route:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getuser=async(req,res)=>{
    try{
        const users=await user.find({});
        return res.status(200).json(users);
    }
    catch(error){
        console.error('Error while processing getuser route:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}