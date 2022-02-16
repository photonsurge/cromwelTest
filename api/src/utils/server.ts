import bodyParser from 'body-parser'
import express from 'express'
import { Express } from 'express-serve-static-core'
import { Server } from 'http'
import { connect } from 'mongoose'
import { UserModel } from '../data/user'
import router from '../routes'
interface IExpress { server: Express, port: Server }
export const createServer = async (): Promise<IExpress> => {
    const server = express()
    const mongoString = (process.env.MONGO ? process.env.MONGO : 'mongodb://localhost:27017/demo') // if MONGO
    await UserModel; //Ensure user model is made and indexes have been createed
    await connect(mongoString)
    server.use(bodyParser.json()); // parse json 
    server.use('/', router)
    const port = await server.listen(3001);
    return { server, port }
}