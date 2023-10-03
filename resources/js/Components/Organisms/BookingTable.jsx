import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination } from "@mui/material";
import { Link, router } from "@inertiajs/react";
import dayjs from "dayjs";
import ReturnModal from "../Molecules/Booking/ReturnModal";
import { useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { AiFillCar } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import VehicleDetailModal from "../Molecules/Booking/VehicleDetailModal";
import FuelConsumptionDetail from "../Molecules/Booking/FuelConsumptionDetail";

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

function createData(
    id,
    driver_name,
    status,
    purpose,
    booking_date,
    return_date,
    vehicle,
    fuel_consumption
) {
    return {
        id,
        driver_name,
        status,
        purpose,
        booking_date,
        return_date,
        vehicle,
        fuel_consumption,
    };
}

export default function BookingTable({ data, query }) {
    const [modalShow, setModalShow] = useState(false);

    const { data: booking } = data;
    const rows = booking.map((item) => {
        return createData(
            item.id,
            item.driver_name,
            item.status,
            item.purpose,
            item.booking_date,
            item.return_date,
            item.vehicle,
            item.fuel_consumption
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
                                Kendaraan
                            </StyledTableCell>
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
                                <StyledTableCell component="th" scope="row">
                                    <button
                                        onClick={() =>
                                            setModalShow(
                                                row.id +
                                                    "-" +
                                                    row.status +
                                                    "detail"
                                            )
                                        }
                                        className="bg-indigo-600 px-4 py-3 rounded-md text-white font-bold inline-flex items-center gap-2 hover:bg-indigo-500"
                                    >
                                        {" "}
                                        Detail
                                        <AiFillCar size={20} />
                                    </button>
                                    <VehicleDetailModal
                                        data={row.vehicle}
                                        show={
                                            modalShow ==
                                            row.id + "-" + row.status + "detail"
                                                ? true
                                                : false
                                        }
                                        onHide={() => setModalShow(false)}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <p
                                        className={`px-3 py-1 rounded-xl font-semibold ${
                                            row.status === "pending"
                                                ? "bg-yellow-200"
                                                : row.status === "approved"
                                                ? "bg-green-200"
                                                : row.status === "rejected"
                                                ? "bg-red-200"
                                                : row.status === "returned"
                                                ? "bg-indigo-200"
                                                : ""
                                        }`}
                                    >
                                        {row.status === "pending"
                                            ? "Menunggu"
                                            : row.status === "approved"
                                            ? "Disetujui"
                                            : row.status === "rejected"
                                            ? "Ditolak"
                                            : row.status === "returned"
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
                                        <button
                                            onClick={() =>
                                                setModalShow(
                                                    row.id + "-" + row.status
                                                )
                                            }
                                            className="bg-purple-600 px-4 py-3 rounded-md text-white font-bold inline-flex items-center gap-2 hover:bg-purple-500"
                                        >
                                            {" "}
                                            Selesai
                                            <BsCheckCircle size={20} />
                                        </button>
                                    ) : row.status == "returned" ? (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setModalShow(
                                                        row.id +
                                                            "-" +
                                                            row.status +
                                                            "fuelConsumption"
                                                    )
                                                }
                                                className="bg-indigo-200 px-4 py-3 rounded-md text-black font-bold inline-flex items-center gap-2 hover:bg-indigo-300"
                                            >
                                                {" "}
                                                Rincian
                                                <TbListDetails size={20} />
                                            </button>
                                            <FuelConsumptionDetail
                                                data={row?.fuel_consumption}
                                                show={
                                                    modalShow ==
                                                    row.id +
                                                        "-" +
                                                        row.status +
                                                        "fuelConsumption"
                                                        ? true
                                                        : false
                                                }
                                                onHide={() =>
                                                    setModalShow(false)
                                                }
                                            />
                                        </>
                                    ) : (
                                        "-"
                                    )}
                                    <ReturnModal
                                        show={
                                            modalShow ==
                                            row.id + "-" + row.status
                                                ? true
                                                : false
                                        }
                                        onHide={() => setModalShow(false)}
                                        id={row.id}
                                        dataEdit={row}
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
