

import User from "../models/userModel.mjs";
import bcrypt from "bcryptjs";
// 
const getUsers= async (req, res) => {
 try {
const users = await User.find()

  res.status(200).json({users:users})
}
catch(error){
  console.log(error.msg)
  res.status(500).json({error:error})

}

}



const showSingleUser=async(req, res) => {
 try {
  const id = req.params.id  //75
  const user =await  User.findById(id)
  if (user != null) {
    
    res.status(200).json({msg:"user found",user:user})
  } else {
    res.status(200).json({msg:"user not found invalid id"})
    
  }

 } catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
  
 }
}

//Signup

const Signup=async(req, res) => {
 try {
  const userData = req.body;
  const checkUser= await User.findOne({email:userData.email})
  if (checkUser != null) {
        res.status(200).json({msg:"Account already registered. Please login now..!"})
  } else {

    const hashpassword= bcrypt.hashSync( userData.password,10);
    // console.log(hashpassword)

    const newUser= new User({
      email: userData.email,
      username: userData.username,
      password:hashpassword,
      profilePicture: userData.profilePicture,
    });
    const addUser = await newUser.save();
 if (addUser) {
    res.status(200).json({msg:"Account registered Successfully. Please login now..!", user:addUser});
  } else {
    res.status(200).json({msg:"Signup Failed..!"});
  }
    // res.status(200).json({msg:"user not found invalid id"})
  }
 } catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
 }
}


//login



const Login=async(req, res) => {
 try {
  const userData = req.body;
  const checkUser= await User.findOne({email:userData.email})
  if (checkUser == null) {

        res.status(200).json({msg:"Account not registered. Please Signup now..!"})
  } else {

    const verifyPassword= bcrypt.compareSync( userData.password,checkUser.password);
   
 if (verifyPassword) {
    res.status(200).json({msg:"Login Success..!", user:checkUser});
  } else {
    res.status(200).json({msg:"Invalid Credentials..!"});
  }

  }
 } catch (error) {
  console.log(error.msg)
  res.status(500).json({msg:"Internal Server Error"})
 }
}


const UserController ={
    getUsers,
    showSingleUser,
    Signup,
    Login
   
}

export default UserController;