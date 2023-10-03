import React from "react";
import Modal from "../Modal";
import { LiaTimesCircleSolid } from "react-icons/lia";
import InputLabel from "@/Components/Atoms/InputLabel";
import TextInput from "@/Components/Atoms/TextInput";
import InputError from "@/Components/Atoms/InputError";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import TextAreaInput from "@/Components/Atoms/TextAreaInput";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useEffect } from "react";

export default function RoleSettingModal({ show, onHide, dataEdit, roles }) {
    const { data, setData, patch, progress, errors, reset } = useForm({
        role: "",
    });

    useEffect(() => {
        if (dataEdit?.role?.name) {
            setData({
                ...data,
                role: dataEdit.role.id,
            });
        }
    }, [dataEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("update-user-role", dataEdit?.id), {
            preserveScroll: false,
            preserveState: true,
            onProgress: () => {
                toast.loading("Loading...");
            },
            onError: () => {
                toast.dismiss();
                toast.error("Terjadi kesalahan!");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Berhasil melakukan pengembalian!");
                reset();
                onHide();
            },
        });
    };
    return (
        <Modal show={show} maxWidth="sm">
            <div className="px-5 py-4 flex flex-row justify-between border-b-2 border-b-slate-300">
                <p className="text-lg font-bold">Ubah Role</p>
                <button onClick={() => onHide()}>
                    <LiaTimesCircleSolid size={30} />
                </button>
            </div>
            <div className="px-5 py-7">
                <form action="">
                    <div className="mb-3">
                        <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            size="small"
                            fullWidth
                        >
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={data?.role}
                                displayEmpty
                                label="Age"
                                onChange={(e) =>
                                    setData({ role: e.target.value })
                                }
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>Pilih Role</em>;
                                    } else {
                                        return (
                                            roles
                                                ?.find(
                                                    (item) =>
                                                        item.id == selected
                                                )
                                                ?.name.charAt(0)
                                                .toUpperCase() +
                                            roles
                                                ?.find(
                                                    (item) =>
                                                        item.id == selected
                                                )
                                                ?.name.slice(1)
                                        );
                                    }
                                }}
                            >
                                <MenuItem selected value="">
                                    <em className="text-red-500">None</em>
                                </MenuItem>
                                {roles?.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                        {item.name.charAt(0).toUpperCase() +
                                            item.name.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <InputError message={errors?.role} className="mt-1" />
                    </div>
                </form>
            </div>
            <div className="px-5 py-4 flex flex-row justify-end border-t-2 border-t-slate-300">
                <button
                    onClick={handleSubmit}
                    className="bg-purple-600 px-8 py-3 rounded-md text-white font-bold inline-flex items-center gap-2 hover:bg-purple-500"
                >
                    Simpan
                </button>
            </div>
        </Modal>
    );
}
