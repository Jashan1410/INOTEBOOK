const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
 user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'users'
 },
 title:{
   type: String,
   require: true
 },
 descripation:{
    type: String,
    require: true
 },
 tag:{
    type: String,
    default: "General"
 },
 date:{
    type: Date,
    default: Date.now
 },  
});

module.exports = mongoose.model('notes',UserSchema);