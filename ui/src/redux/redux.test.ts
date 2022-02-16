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

});