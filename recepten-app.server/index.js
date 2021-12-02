require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const http = require('http')
const path = require('path')

const mainRouter = require('./controllers')

const port = process.env.PORT || 7555

const app = express()

const server = http.createServer(app)

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.static(path.resolve(__dirname, '../recepten-app.client/build')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../recepten-app.client/build', 'index.html'))
})

//Setup router for API routes
mainRouter(app)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../recepten-app.client/build', 'index.html'))
})

server.listen(port, () => {
  console.log(`Recepten-app backend running on port: ${port}`)
})
