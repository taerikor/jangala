const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key');


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected'))
.catch((err) => console.log(err))

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser());


app.use('/api/users', require('./routes/users'))

app.use('/uploads', express.static('uploads'));



const port = 5000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})