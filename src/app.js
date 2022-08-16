import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Patients from './components/patients';
import Patient from './components/patient';
import useToken from './useToken';

export default function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <Routes>
            <Route path="/patients" element={<Patients />}></Route>
            <Route path="/patients/:patientId" element={<Patient />}></Route>
        </Routes>
    )
}
