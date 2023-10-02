import { Link, router } from "@inertiajs/react";
import clsx from "clsx";
import React from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

export default function BackButton({ className, href }) {
    return (
        <button
            // href={href}
            className={clsx(
                "group relative px-5 py-2 overflow-hidden rounded-md bg-white shadow",
                className
            )}
            onClick={() => {
                router.get(href);
            }}
        >
            <div className="absolute inset-0 w-3 bg-indigo-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white flex flex-row items-center gap-3">
                <BiSolidLeftArrow /> Kembali
            </span>
        </button>
    );
}
