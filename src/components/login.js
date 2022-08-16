import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import loginService from '../services/loginService';
import PropTypes from 'prop-types';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

export default function Login({ setToken }) {
    const [isError, setError] = useState(false);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: 'test@email.com',
            password: 'password',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            loginService.login(values.email, values.password).then((result) => {
                if (result === null) {
                    setError(true);
                }
                else {
                    setToken(result);
                    navigate("/patients");
                }
            }).catch(() => {
                setError(true);
            });
        },
    });

    return (
        <div>
            <h1>Login {isError && <span id="errorMessage">Failed</span>}</h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button color="primary" variant="contained" fullWidth margin="normal" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
