import React from "react";
import Modal from "../Modal";
import { LiaTimesCircleSolid } from "react-icons/lia";

export default function FuelConsumptionDetail({ show, onHide, data }) {
    return (
        <Modal show={show} maxWidth="md">
            <div className="px-5 py-4 flex flex-row justify-between border-b-2 border-b-slate-300">
                <p className="text-lg font-bold">Rincian Pengembalian</p>
                <button onClick={() => onHide()}>
                    <LiaTimesCircleSolid size={30} />
                </button>
            </div>
            <div className="px-5 py-7 flex flex-col">
                <div className="flex flex-col md:mx-10 ">
                    <div className="flex flex-col gap-2 md:mb-0 mb-2">
                        <div className="inline-flex">
                            <p className="w-56 font-semibold">Jarak Tempuh :</p>
                            <p>{data?.distance} km</p>
                        </div>
                        <div className="inline-flex">
                            <p className="w-56 font-semibold">
                                Total Bahan Bakar :
                            </p>
                            <p>{data?.liters} L</p>
                        </div>
                        <div className="inline-flex">
                            <p className="w-56 font-semibold">
                                Biaya Bahan Bakar (/L) :
                            </p>
                            <p>Rp. {data?.cost_per_liter}</p>
                        </div>
                    </div>
                    <div className="md:mt-4 mt-2 md:text-center">
                        <p className=" font-semibold">Deskripsi :</p>
                        <p>{data?.description}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
