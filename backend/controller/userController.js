const userModel = require('../Models/User')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const createUser = async (req,res)=> {
try {
    const {name,email,password} = req.body


    const response = await userModel.create({name,email,password})



    console.log('response',response)
    res.send(response)
} catch (error) {
    res.send(error)
}
}
const getUserById = async (req,res)=> {
try {
    const userId = req.params.id
    const response = await userModel.findOne({_id:userId})
    console.log('response',response)
    res.send(response)
} catch (error) {
    res.send(error)
}
}
const getAllUsers = async (req,res)=> {
try {
    const response = await userModel.find({})
    console.log('response',response)
    res.send(response)
} catch (error) {
    res.send(error)
}
}
const updateUserByid = async (req,res)=> {
try {
    const {name,email,password} = req.body
    const userId = req.params.id
    const response = await userModel.updateOne({_id:userId},{name})
    // updateOne updateMany findOneAndUpdate 3rd argument {new:true}
    console.log('response',response)
    res.send(response)
} catch (error) {
    res.send(error)
}
}

// module.exports = {createUser,getAllUsers,updateUserByid,getUserById}
// const userController = require('../controller/userController')

router.post('/',createUser);
router.get('/:id',getUserById);
router.put('/:id',updateUserByid);
router.get('/',getAllUsers);

module.exports = router;
