const axios = require('axios');

const patientService = {
    getPatients() {
        let config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        };
        return axios.get(`${process.env.REACT_APP_API_URL}/patients`, config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return null;
            });
    },
    getPatient(patientId) {
        let config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        };
        return axios.get(`${process.env.REACT_APP_API_URL}/patients/${patientId}`, config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return null;
            });
    }
}

export default patientService;