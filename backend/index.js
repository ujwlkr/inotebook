const connectToMongo=require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000 //3000 pe react app chlayenge
app.use(cors()) //to access the API call in browser
app.use(express.json())
//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})