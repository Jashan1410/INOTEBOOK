const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Notes = require('../Models/Notes')
const fetchuser = require('../middleware/fetchtoken');
const { body, validationResult } = require("express-validator");


//  endpoints for fetch notes data

router.get('/fetchNotes', fetchuser , async (req, res)=>{
  try {
  
    const userid = req.data.Userinfo.id;
    let note = await Notes.find({user:userid});
    if (note.length > 0) {  
      res.json(note);
    }else{
    res.json({"error":"false","msg":"No Notes Available"});
    }
      
  } catch (error) {
    return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
  }
});

// endpoints for create notes data 


router.post("/createNotes",body("title", "You can Use English Alphabets only in Title").isAlpha('en-US', {ignore: ' '}).isLength({ min: 5 }),
body("descripation", "descripation should be atleast 5 characters").isLength({ min: 5 }),
fetchuser , async (req, res) => {
  try {

    // checking user input fileds

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ ValidationErrors: errors.array() , "error":"True" , "msg":" Syntax error" });
    }

    // create a notes of user

    const userid = req.data.Userinfo.id;
    const {title,descripation,tag} = req.body;
    const newNote = {user: userid};
    if(title){newNote.title = title};
    if(descripation){newNote.descripation = descripation};
    if(tag !== ""){newNote.tag = tag};

       await Notes.create(newNote);
          return res.json({"error":"false","msg":"Note added succesfully"});

  } catch (error) {
    return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
  }


});

// endpoints for updates a notes data

router.put('/updateNotes/:id', fetchuser , async (req, res)=>{
  try {
  
    const {title,descripation,tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(descripation){newNote.descripation = descripation};
    if(tag !== ""){newNote.tag = tag};

    const userid = req.data.Userinfo.id;
    const userId = req.params.id;

    let note = await Notes.findOneAndUpdate({user:userid,_id:userId},{$set:newNote},{new:true});
    if(!note){return res.status(403).json({"error":"true","msg":"the note you want to eidt is dos't exist"})}
    res.json({"error":"false","msg":"Note updated succesfully"});
      
  } catch (error) {
    return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
  }
});



// endpoints for Delete a notes data

router.delete('/deleteNotes/:id', fetchuser , async (req, res)=>{
  try {
    const userid = req.data.Userinfo.id;
    const userId = req.params.id;

    const check = await Notes.findOne({_id:userId});
    if(!check){return res.status(409).json({"error":"true","msg":"Invalid Note"})}
    if(check.user.toString()!==userid){return res.status(401).json({"error":"true","msg":"Authentication error"})};


    await Notes.findByIdAndDelete({_id:userId});
    res.json({"error":"false","msg":"Note removed succesfully"});
  
  } catch (error) {
    return res.status(500).json({"error":error.message,"msg":"Intarnal server error"});
  }
});



module.exports = router