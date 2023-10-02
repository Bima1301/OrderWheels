import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination, Stack } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#9333ea",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#e2e8f0",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function createData(name, type, service_distance, amount, plate_number) {
    return { name, type, service_distance, amount, plate_number };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, "AG 777"),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, "AG 777"),
    createData("Eclair", 262, 16.0, 24, 6.0, "AG 777"),
    createData("Cupcake", 305, 3.7, 67, 4.3, "AG 777"),
    createData("Gingerbread", 356, 16.0, 49, 3.9, "AG 777"),
];

export default function VehicleTable() {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Nama</StyledTableCell>
                            <StyledTableCell>Tipe</StyledTableCell>
                            <StyledTableCell align="center">
                                Jarak Service (km)
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Jumlah Tersedia
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Plat Nomor
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell>{row.type}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.service_distance} km
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.amount}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.plate_number}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="w-full flex justify-end mt-4">
                <Pagination
                    count={10}
                    size="small"
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => alert(value)}
                />
            </div>
        </>
    );
}
