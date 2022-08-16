import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom";
import patientService from '../services/patientService';

export default function Patients() {
    const [patients, setPatients] = useState([])
    const [isLoading, setLoading] = useState(true);

    const fetchData = useCallback(() => {
        patientService.getPatients()
            .then(data => {
                setPatients(data)
            })
            .finally(() => {
                setLoading(false); 
            })
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div>
            <h1>Patients</h1>
            {isLoading && (<CircularProgress />)}
            {!isLoading && patients?.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableBody>
                            {patients.map(patient => (
                                <TableRow key={patient.patientId} sx={{ 'td': { border: 0 } }}>
                                    <TableCell>
                                        <Link to={patient.patientId}>
                                            {patient.firstName} {patient.lastName}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </div>
    )
}
