import React from "react";
import Modal from "../Modal";
import { LiaTimesCircleSolid } from "react-icons/lia";

export default function VehicleDetailModal({ show, onHide, data }) {
    return (
        <Modal show={show} maxWidth="lg">
            <div className="px-5 py-4 flex flex-row justify-between border-b-2 border-b-slate-300">
                <p className="text-lg font-bold">Data Kendaraan</p>
                <button onClick={() => onHide()}>
                    <LiaTimesCircleSolid size={30} />
                </button>
            </div>
            <div className="px-5 py-7 flex flex-col">
                <div className="md:mx-32">
                    <div className="border border-purple-300 rounded-md bg-slate-300 overflow-hidden flex justify-center relative py-1 ">
                        <img
                            src={`storage/${data.image}`}
                            alt="Vehicle Image"
                            className="object-contain  max-h-44"
                        />
                        <p className="absolute w-fit top-0 right-0 bg-indigo-400 text-white px-5 py-1 rounded-bl-md">
                            Preview
                        </p>
                    </div>
                </div>
                <div className="flex flex-col mt-5 md:mx-10 ">
                    <div className="flex md:flex-row flex-col justify-between">
                        <div className="flex flex-col gap-2 md:mb-0 mb-2">
                            <div className="inline-flex">
                                <p className="w-28 font-semibold">Nama :</p>
                                <p>{data.name}</p>
                            </div>
                            <div className="inline-flex">
                                <p className="w-28 font-semibold">Tipe :</p>
                                <p>{data.type}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="inline-flex">
                                <p className="w-28 font-semibold">
                                    Plat Nomor :
                                </p>
                                <p>{data.plate_number}</p>
                            </div>
                            <div className="inline-flex">
                                <p className="w-28 font-semibold">
                                    Serive Per KM :
                                </p>
                                <p>{data.service_distance}</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:mt-4 mt-2 md:text-center">
                        <p className=" font-semibold">Deskripsi :</p>
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
