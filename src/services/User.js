import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/v1/';

export async function createUser(data) {
    axios.post(API_URL + "auth/register", data)
        .then(response => {
        console.log(response);
        return response
    }).catch(error => {
         console.error(error);
    });
};