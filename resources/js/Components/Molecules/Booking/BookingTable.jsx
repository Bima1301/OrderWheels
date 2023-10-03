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
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { MdCarRental } from "react-icons/md";
import dayjs from "dayjs";

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

function createData(
    id,
    driver_name,
    status,
    purpose,
    booking_date,
    return_date
) {
    return {
        id,
        driver_name,
        status,
        purpose,
        booking_date,
        return_date,
    };
}

export default function BookingTable({ data, query }) {
    const { data: booking } = data;
    const rows = booking.map((item) => {
        return createData(
            item.id,
            item.driver_name,
            item.status,
            item.purpose,
            item.booking_date,
            item.return_date
        );
    });
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Nama Peminjam</StyledTableCell>
                            <StyledTableCell align="center">
                                Status
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Tujuan
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Tanggal Pinjam
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Tanggal kembali
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.driver_name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <p className="px-3 py-1 bg-indigo-200 rounded-xl font-semibold">
                                        {row.status == "pending"
                                            ? "Menunggu"
                                            : row.status == "approved"
                                            ? "Disetujui"
                                            : row.status == "rejected"
                                            ? "Ditolak"
                                            : row.status == "returned"
                                            ? "Dikembalikan"
                                            : "-"}
                                    </p>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.purpose}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {dayjs(row.booking_date).format(
                                        "DD MMMM YYYY"
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {dayjs(row.return_date).format(
                                        "DD MMMM YYYY"
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.status == "approved" ? (
                                        <Link
                                            href={`/booking/${row.id}`}
                                            className="bg-purple-600 px-4 py-3 rounded-md text-white font-bold inline-flex items-center gap-2 hover:bg-purple-500"
                                        >
                                            {" "}
                                            Selesai
                                            <MdCarRental size={20} />
                                        </Link>
                                    ) : (
                                        "-"
                                    )}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="w-full flex justify-end mt-4">
                <Pagination
                    count={data?.meta?.last_page}
                    size="small"
                    variant="outlined"
                    shape="rounded"
                    page={data?.meta?.current_page}
                    onChange={(e, value) => {
                        router.get("vehicle", {
                            page: value,
                            keyword: query?.keyword,
                            type: query?.type,
                        });
                    }}
                />
            </div>
        </>
    );
}
