import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import uploadConfig from './config/upload'

import './database'

import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333')
})
