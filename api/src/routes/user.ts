import bcrypt from 'bcryptjs';
import crypto from "crypto";
import { NextFunction, Router } from "express";
import jwt from "jsonwebtoken";
import { addUser, checkIfEmailExists, findUsers, IError, isError, ISUser } from "../data/user";
let userRouter = Router();


const JWT_SECRET_KEY = "asdklflskdjflkasdjflkasdjflksdajfasdf" //  this should be in .env!


// middlewre to validate jwt token
const verifyToken = (req: any, res: any, next: NextFunction) => { // verify token middleware
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

//check if email exists ca;;
userRouter.get('/echo', async (req, res) => {

    res.send({ ok: true, })

})


//check if email exists ca;;
userRouter.post('/checkUser', async (req, res) => {
    let error: string = '';
    let ok: boolean = false;
    try {
        if (!req.body.email) {
            error = 'no email specified';
        } else {
            const email = req.body.email;
            const response = await checkIfEmailExists(email);
            if (typeof response === "boolean") {
                ok = response;
                // console.log(response)
            } else {
                error = response.text.toString();
            }
        }
    } catch (errored: any) {
        error = errored.toString;
    } finally {
        if (error) {
            res.send({ error: true, text: error.toString() })
        } else {
            res.send({ ok })
        }
    }
})

//register route
userRouter.post('/register', async (req, res) => {
    let error: string = ''
    try {

        const { name, email, password } = req.body;

        const ok = await checkIfEmailExists(email);
        // console.log(name, email, password, ok)
        if (typeof ok === "boolean") {
            // do some server side validation!
            if (ok === false) {
                const passwordHash = await bcrypt.hash(password, 10);

                const newUserData: any = { name, email, password: passwordHash };


                const newUser = await addUser(newUserData);
                if (isError(newUser)) {
                    const E = <IError>newUser;
                    error = E.text.toString();
                }
            } else {
                error = "Email already used"
            }


        } else {
            error = ok.text.toString();
        }

    } catch (errored: any) {
        error = errored.toString();
    } finally {

        if (error) {
            res.send({ error: true, text: error.toString() })
        } else {
            res.send({ ok: true })
        }

    }
})



//login route
userRouter.post('/login', async (req, res) => {
    let error: string = ''
    let token: string = '';
    try {
        const { email, password } = req.body;
        // do some server side validation!

        const users = await findUsers({ email }, true);  // use find users funciton with get email = true
        if (isError(users)) {
            const E = <IError>users;
            error = E.text.toString();
        } else {
            // not error
            const usersArray = <ISUser[]>users;
            if (usersArray.length === 1) {
                const user = usersArray[0];
                const passwordResult = await bcrypt.compare(password, user.password);
                if (passwordResult === true) {

                    token = jwt.sign(
                        { user_id: user._id, name: user.name, },
                        JWT_SECRET_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );


                }
            }
        }


    } catch (errored: any) {
        error = errored.toString();
    } finally {

        if (error) {
            res.send({ error: true, text: error.toString() })
        } else {
            if (token !== '') {
                res.send({ ok: true, token })
            } else {
                res.send({ ok: false })
            }
        }

    }
})


// a demo jwt secure route, (random hex generation)
userRouter.get('/secureEndpoint', verifyToken, async (req, res) => {
    const r = crypto.randomBytes(20).toString('hex');

    res.send({ r, ok: true })
})


// list of users
userRouter.get('/', verifyToken, async (req, res) => {


    let error: string = ''
    let users: ISUser[] | undefined = undefined;
    try {

        const usersR = await findUsers({});
        if (Array.isArray(usersR)) {
            users = usersR
        }

    } catch (errored: any) {
        error = errored.toString();
    } finally {

        if (error) {
            res.send({ error: true, text: error.toString() })
        } else {
            users && res.send(users)
        }

    }
})



export default userRouter;