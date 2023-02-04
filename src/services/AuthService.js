import React, { Component } from 'react'
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/v1/';

class AuthService {

    register(username, email, password) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        
        axios.post(API_URL + "auth/register", formData)
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
          });
    };
};

export default AuthService();