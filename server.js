require('dotenv').config()
const express = require('express')
const api = require('./server/routes/api')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()

app.use(cors()); 
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload());

app.use('/', api)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

const PORT = process.env.PORT || 4200
app.listen(PORT, () => {
  console.log(`Up and running on ${PORT}`)
})