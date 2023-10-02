import clsx from "clsx";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = ({ className, name, onChange, placeholder, ...props }) => {
    return (
        <div
            className={clsx(
                "flex flex-row items-center gap-4 py-1 px-4 bg-white border border-slate-300 rounded-md",
                className
            )}
        >
            <AiOutlineSearch className="text-[#6B7280] scale-150" size={20} />
            <input
                className="focus:outline-none focus:ring-0 w-full border-0 px-0"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default Searchbar;
