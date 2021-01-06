import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import uploadConfig from './config/upload'

import AppError from './errors/AppError'

import './database'

import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
        //Se cair aqui significa que o erro que ocorreu foi originado pela aplicação
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message
            })
        }

        //Erro não esperado da aplicação
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
)

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333')
})
