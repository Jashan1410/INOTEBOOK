const connectToMongo = require('./Database');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors')
const app = express()
const port = 5000
const sunilqurry = require('./controller/userController')
const auth = require('./routes/auth')
const notes = require('./routes/notes')

connectToMongo();

app.use(cors())
app.use(express.json());

app.use('/api/auth',auth);
app.use('/api/notes',notes);
app.use('/sunil',sunilqurry);


// app.get('/json', (req, res) => {
//   res.send('Hello World! i am jashan singla')
//   // res.json({"jashan":22})
//   res.status(404)
// })
app.get('/', (req, res) => {
  res.send('Hello World!')
//   // res.sendFile(path.join(__dirname,'index.html'))
})
// app.get('/person/:name', (req, res) => {
//   res.send('Hello World! hi guys my name is ' + req.params.name )
//   res.status(500)
// })

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})