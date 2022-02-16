import axios from "axios";

export const checkEmail = async (email: string): Promise<boolean> => {
    const response = await axios.post('/api/users/checkUser', { email }).then((response) => {
        return response.data.ok;
    });
    return response
}


interface IResponse {
    ok: boolean;
    token?: string;
}


export const login = async (email: string, password: string): Promise<IResponse> => {
    const response = await axios.post('/api/users/login', { email, password }).then((response) => {
        return response.data;
    });
    return response
}

export const register = async (name: string, email: string, password: string): Promise<IResponse> => {
    const response = await axios.post('/api/users/register', { name, email, password }).then((response) => {
        return response.data;
    });
    return response
}


export const getUsers = async (token: string): Promise<any[]> => {
    const response = await axios.get(`/api/users?token=${token}`,).then((response) => {
        return response.data;
    });
    return response
}




export const getRandom = async (token: string): Promise<string> => {
    const options = {
        headers: { 'x-access-token': token }
    };
    const response = await axios.get('/api/users/secureEndpoint', options).then((response) => {
        return response.data.r;
    });
    return response
}