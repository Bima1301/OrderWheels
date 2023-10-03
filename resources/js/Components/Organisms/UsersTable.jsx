import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination } from "@mui/material";
import { useState } from "react";
import ImageShowModal from "../Molecules/Vehicle/ImageShowModal";
import { Link, router } from "@inertiajs/react";
import { MdCarRental } from "react-icons/md";
import { BiUserCheck } from "react-icons/bi";
import RoleSettingModal from "../Molecules/Users/RoleSettingModal";

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
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function createData(id, name, email, position, role) {
    return {
        id,
        name,
        email,
        position,
        role,
    };
}

export default function UsersTable({ data, query, roles }) {
    const [modalShow, setModalShow] = useState(false);

    const { data: users } = data;
    const rows = users.map((item) => {
        return createData(
            item.id,
            item.name,
            item.email,
            item.position,
            item.role
        );
    });
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Nama</StyledTableCell>
                            <StyledTableCell align="center">
                                Email
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Jabatan
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Role
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.email}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.position}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <p className="font-semibold">
                                        {row.role?.name
                                            .charAt(0)
                                            .toUpperCase() +
                                            row.role?.name.slice(1) || "-"}
                                    </p>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <button
                                        className="bg-indigo-600 px-4 py-3 rounded-md text-white font-bold inline-flex items-center gap-2 hover:bg-indigo-500"
                                        onClick={() =>
                                            setModalShow(row.id + "-" + index)
                                        }
                                    >
                                        Role Setting
                                        <BiUserCheck size={20} />
                                    </button>
                                    <RoleSettingModal
                                        dataEdit={row}
                                        roles={roles}
                                        show={
                                            modalShow == row.id + "-" + index
                                                ? true
                                                : false
                                        }
                                        onHide={() => setModalShow(false)}
                                    />
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
