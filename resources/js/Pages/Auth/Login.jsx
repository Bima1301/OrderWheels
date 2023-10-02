import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Alert, IconButton } from "@mui/material";
import { useState } from "react";

import { FaTimes } from "react-icons/fa";
import TextInput from "@/Components/Atoms/TextInput";
import Checkbox from "@/Components/Atoms/Checkbox";
import PrimaryButton from "@/Components/Atoms/PrimaryButton";
import InputLabel from "@/Components/Atoms/InputLabel";
import InputError from "@/Components/Atoms/InputError";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const { errors: propError, flash } = usePage().props;

    const [openAlert, setOpenAlert] = useState({
        success: false,
        error: false,
    });

    useEffect(() => {
        if (propError?.unauthorized) {
            setOpenAlert({ success: false, error: true });
        } else if (flash?.success) {
            setOpenAlert({ success: true, error: false });
        } else {
            setOpenAlert({ success: false, error: false });
        }
    }, [propError]);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);
    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };
    return (
        <>
            <GuestLayout>
                {openAlert?.error && (
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenAlert(false);
                                }}
                            >
                                <FaTimes />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {propError?.unauthorized}
                    </Alert>
                )}
                {openAlert?.success && (
                    <Alert
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenAlert(false);
                                }}
                            >
                                <FaTimes />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {flash?.success}
                    </Alert>
                )}
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        )} */}

                        <Link
                            href={route("register")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Don't have an account?{" "}
                        </Link>

                        <PrimaryButton className="ml-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </>
    );
}
