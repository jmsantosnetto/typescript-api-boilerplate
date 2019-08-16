import express, { Application } from 'express'
import cors from 'cors'
import routes from './Routes'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'

import DatabaseConnection from '../Database/DatabaseConnection'
import LogService from '../Services/LogService'
// import HttpCodes from './Http/HttpCodes'

class App {
    public express: Application

    private useStaticFiles: boolean

    public constructor () {
      dotenv.config()
      const USE_STATIC_FILES = process.env.USE_STATIC_FILES

      this.useStaticFiles = USE_STATIC_FILES === 'true'
      this.express = express()

      this.middlewares()
      this.routes()
      DatabaseConnection.connect()
        .then((response): void => LogService.logIntoConsole(response))
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(express.urlencoded())
      this.express.use(cors())
      this.express.use(morgan('dev'))

      if (this.useStaticFiles) {
        this.express.use(express.static(path.join(__dirname, '../', '../', 'public')))
      }
    }

    private routes (): void {
      this.express.use('/api/v1', routes)
      // this.express.use('*', (req, res) => {
      //   console.log(req.hostname)
      //   if (req.path === '/api/v1') {
      //     return res.status(404).send()
      //   }

      //   const USE_CLIENT_MODE = process.env.USE_CLIENT_MODE
      //   const useClientMode = USE_CLIENT_MODE === 'true'

      //   if (useClientMode) {
      //     return res.sendFile(path.join(__dirname, '../', '../', '../', 'public/index.html'))
      //   }

      //   return res.status(HttpCodes.OK).json({ message: 'Hello from Api Boilerplate', see: 'https://github.com/jmsantosnetto/typescript-api-boilerplate' })
      // })
    }
}

export default new App().express
