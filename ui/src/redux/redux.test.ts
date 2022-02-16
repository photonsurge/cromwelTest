import jwt from "jsonwebtoken";
import { loginToken } from "./authData";
import { store } from "./store";
describe('Redux', () => {
    test('malformed jwt', () => {
        let state = store.getState();
        const auth = state.auth
        expect(auth.loggedIn).toBe(false);


        store.dispatch(loginToken('bad token'));
        let state2 = store.getState();


        expect(state2.auth.loggedIn).toBe(false);
    });



    test('good jwt', () => {
        let state = store.getState();

        const auth = state.auth
        expect(auth.loggedIn).toBe(false);
        const jwtPayload: any = { user_id: 'test', name: 'test' }

        const token = jwt.sign(
            jwtPayload,
            "JWT_SECRET_KEY",
            {
                expiresIn: "2h",
            }
        );
        store.dispatch(loginToken(token));
        let state2 = store.getState();


        expect(state2.auth.loggedIn).toBe(true);

        expect(state2.auth.name).toBe("test");
    });
});