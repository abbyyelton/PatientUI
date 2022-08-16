import React, { useEffect, useState, useCallback } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useParams } from "react-router-dom";
import Moment from 'moment';
import patientService from '../services/patientService';

export default function Patient() {
    const [patient, setPatient] = useState([])
    const { patientId } = useParams()
    const [isLoading, setLoading] = useState(true);

    const fetchData = useCallback(() => {
        patientService.getPatient(patientId)
            .then(data => {
                setPatient(data);
            })
            .finally(() => {
                setLoading(false); 
            })
    }, [patientId])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
        <div>
            <h1>Patient</h1>
            {isLoading && (<CircularProgress />)}
            {!isLoading && patient && (
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow key="name">
                                <TableCell>Name</TableCell>
                                <TableCell>{patient.firstName} {patient.lastName}</TableCell>
                            </TableRow>
                            <TableRow key="gender">
                                <TableCell>Gender</TableCell>
                                <TableCell>{patient.gender}</TableCell>
                            </TableRow>
                            <TableRow key="date">
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>{Moment(patient.dateOfBirth).format('MM-DD-YYYY')}</TableCell>
                            </TableRow>
                            <TableRow key="address1">
                                <TableCell>Street Address</TableCell>
                                <TableCell>
                                    {patient.addressLine1}
                                    {(patient.addressLine2?.length > 0) && (<span><br />{patient.addressLine2}</span>)}
                                </TableCell>
                            </TableRow>
                            <TableRow key="city">
                                <TableCell>City</TableCell>
                                <TableCell>{patient.city}</TableCell>
                            </TableRow>
                            <TableRow key="state">
                                <TableCell>State</TableCell>
                                <TableCell>{patient.state}</TableCell>
                            </TableRow>
                            <TableRow key="code">
                                <TableCell>Postal Code</TableCell>
                                <TableCell>{patient.postalCode}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>)}
            <br />
            <Link to="/patients">Back to list</Link>
        </div>
    )
}
