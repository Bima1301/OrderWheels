import React from "react";
import Modal from "../Modal";
import { LiaTimesCircleSolid } from "react-icons/lia";

export default function ImageShowModal({
    show,
    onHide,
    image,
    description,
    name,
}) {
    return (
        <Modal show={show}>
            <div className="px-5 py-3 flex flex-row justify-between">
                <p className="text-lg font-bold">Preview Data</p>
                <button onClick={() => onHide()}>
                    <LiaTimesCircleSolid size={30} />
                </button>
            </div>
            <div className="flex flex-col w-full justify-center px-11 pb-5">
                <div className="md:mx-32">
                    <div className="border border-purple-300 rounded-md bg-slate-300 overflow-hidden flex justify-center relative py-1 ">
                        <img
                            src={`storage/${image}`}
                            alt="Vehicle Image"
                            className="object-contain  max-h-44"
                        />
                        <p className="absolute w-fit top-0 right-0 bg-indigo-400 text-white px-5 py-1 rounded-bl-md">
                            Preview
                        </p>
                    </div>
                </div>
                {name && (
                    <div className="mt-10 text-center">
                        <p className="font-bold">
                            Nama : <span className="font-normal">{name}</span>
                        </p>
                    </div>
                )}
                {description && (
                    <div className="mt-2 text-center">
                        <p className="font-bold">
                            Deskripsi :{" "}
                            <span className="font-normal">{description}</span>
                        </p>
                    </div>
                )}
            </div>
        </Modal>
    );
}
