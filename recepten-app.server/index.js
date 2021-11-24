require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const path = require('path')

const port = process.env.PORT || 7555

const app = express()

const server = http.createServer(app)

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.static(path.resolve(__dirname, '../recepten-app.client/build')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../recepten-app.client/build', 'index.html'))
})

server.listen(port, () => {
  console.log(`Recepten-app backend running on port: ${port}`)
})
