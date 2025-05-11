import jwt from 'jsonwebtoken'
import User from '../models/User.js'


const middleware = async(req , res , next)=>{
    try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

         
         if(!token){
           return res.status(401).json({success:false, message:"Unauthorized"})
         }

         const decoded = jwt.verify(token, "secretKeyofnoteapp123@#" );

         if(!decoded){
            return res.status(401).json({success:false, message:"wrong token"})
         }

         const user = await User.findById( decoded.id)

         if(!user){
            return res.status(401).json({success:false, message:"No User Found"})
         }

        //  const newUser = {name:user.name,id:user._id}
        //  req.user = newUser
        //  next()

          req.user = { name: user.name, id: user._id };
        next();
    }catch(error){
        return res.status(500).json({success:false, message:"please Login"})
    }
}

export default middleware