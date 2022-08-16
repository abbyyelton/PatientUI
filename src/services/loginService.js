const axios = require('axios');

const loginService = {
    login(email, password) {
        return axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            email: email,
            password: password
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return null;
            });
    }
}

export default loginService;