import React, { useEffect, useState } from 'react';
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { fetchAllAppointments } from '../../firebase/db';
import Page from '@/components/Page';
import Label from '@/components/Label';
import Scrollbar from '@/components/Scrollbar';
import SearchNotFound from '@/components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '@/components/_dashboard/user';
import { sentenceCase } from 'change-case';

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'mobileNumber', label: 'Mobile Number', alignRight: false },
    { id: 'timeSlot', label: 'Time Slot', alignRight: false },
    { id: 'painAreas', label: 'Pain Areas', alignRight: false },
    { id: 'message', label: 'Message', alignRight: false },
];

const Appointments = (): JSX.Element => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterName, setFilterName] = useState('');
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const data = await fetchAllAppointments();
        setAppointments(data);
    };

    useEffect(() => {
        fetchAppointments();
    } , [])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredAppointments = appointments.filter((appointment) =>
        `${appointment.firstName} ${appointment.lastName}`
            .toLowerCase()
            .includes(filterName.toLowerCase())
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredAppointments.length) : 0;

    return (
        <Page title="Appointments">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Appointments
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={plusFill} />}
                    >
                        New Appointment
                    </Button>
                </Stack>

                {/* <Button variant="contained" onClick={fetchAppointments}>
                    Fetch Appointments
                </Button> */}

                <Card>
                    <UserListToolbar
                        numSelected={0}
                        filterName={filterName}
                        onFilterName={(e) => setFilterName(e.target.value)}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={appointments.length}
                                    numSelected={0}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredAppointments.length > 0 ? (
                                        filteredAppointments
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((appointment, index) => {
                                                const {
                                                    id,
                                                    firstName,
                                                    lastName,
                                                    address,
                                                    mobileNumber,
                                                    timeSlot,
                                                    painAreas,
                                                    message,
                                                } = appointment;

                                                // Extract pain area keys where the value is true
                                                const painAreaKeys = Object.keys(painAreas).filter((key) => painAreas[key]);

                                                // Calculate the serial number
                                                const serialNumber = page * rowsPerPage + index + 1;

                                                return (
                                                    <TableRow key={id}>
                                                        <TableCell>{serialNumber}</TableCell> {/* Serial number column */}
                                                        <TableCell>{`${firstName} ${lastName}`}</TableCell>
                                                        <TableCell>{address || 'N/A'}</TableCell>
                                                        <TableCell>{mobileNumber || 'N/A'}</TableCell>
                                                        <TableCell>{timeSlot || 'N/A'}</TableCell>
                                                        <TableCell>{painAreaKeys.length > 0 ? painAreaKeys.join(', ') : 'None'}</TableCell>
                                                        <TableCell>{message || 'No message'}</TableCell>
                                                    </TableRow>
                                                );
                                            })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center"> {/* Updated colSpan to include serial number */}
                                                <Typography variant="body1">No appointments found.</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={7} /> {/* Updated colSpan to include serial number */}
                                        </TableRow>
                                    )}
                                </TableBody>

                                {filteredAppointments.length === 0 && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredAppointments.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
};

export default Appointments;
