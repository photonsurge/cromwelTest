import { Express } from 'express-serve-static-core';
import { Server } from 'http';
import { createServer } from "./utils/server";
let server: Express;
let port: Server;
createServer()
    .then(s => {
        server = s.server;

        console.info(`Listening on http://localhost:3001`)


    })
    .catch(err => {
        console.error(`Error: ${err}`)
    })

