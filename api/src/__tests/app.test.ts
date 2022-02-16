
import { Server } from "http";
import { connect } from "mongoose";
import request from "supertest";
import { UserModel } from "../data/user";
import { createServer } from "../utils/server";

describe('/user', () => {

    let server: any;
    let port: Server;

    beforeAll(async () => {
        const x = await createServer();
        server = x.server;
        port = x.port;
    });

    test('it should echo ', async () => {

        const res = await request(server).get('/api/users/echo')

        expect(res.statusCode).toEqual(200)
    });
    test('test@test.com should be useable and register and then use token to access a secure endpoint ', async () => {

        const res = await request(server).post('/api/users/checkUser').send({ email: 'test@test.com' })

        expect(res.statusCode).toEqual(200)
        expect(res.body.ok).toEqual(false)


        const resRegister = await request(server).post('/api/users/register').send({ name: 'test', password: "somepasswordS0$", email: 'test@test.com' })

        expect(resRegister.statusCode).toEqual(200)
        expect(resRegister.body.ok).toEqual(true)



        const checkAgain = await request(server).post('/api/users/checkUser').send({ email: 'test@test.com' })

        expect(checkAgain.statusCode).toEqual(200)
        expect(checkAgain.body.ok).toEqual(true)

        const login = await request(server).post('/api/users/login').send({ email: 'test@test.com', password: "somepasswordS0$", })

        expect(login.statusCode).toEqual(200)
        expect(login.body.ok).toEqual(true)

        const token = login.body.token;

        const secureEndpoint = await request(server).get(`/api/users/secureEndpoint?token=${token}`)
        expect(secureEndpoint.statusCode).toEqual(200)
        expect(secureEndpoint.body.ok).toEqual(true)


        const resRegisterAgain = await request(server).post('/api/users/register').send({ name: 'test', password: "somepasswordS0$", email: 'test@test.com' })

        expect(resRegisterAgain.statusCode).toEqual(200)

        expect(resRegisterAgain.body.ok).toEqual(undefined)


    });
    test('secure endpoint should require token', async () => {

        const secureEndpoint = await request(server).get(`/api/users/secureEndpoint`)
        expect(secureEndpoint.statusCode).not.toEqual(200)
    });



    afterAll((done) => {
        port.close(() => {
            connect('mongodb://localhost:27017/demoTesting').then(() => {
                UserModel.deleteMany({}, () => {
                    done();
                });
            })
        });
        //  console.log("closed")
    })
});

