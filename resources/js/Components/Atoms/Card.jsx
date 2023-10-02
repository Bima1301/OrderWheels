import React from "react";

export default function Card({ children, headerText, rightButton }) {
    return (
        <section className="bg-white shadow-[0_.15rem_1.75rem_0_rgba(58,59,69,.15)] rounded-md">
            <div className="p-4 bg-indigo-100 text-purple-600  border-b-2 border-b-slate-300 flex md:flex-row flex-col md:gap-0 gap-3 justify-between items-center">
                <p className="font-bold text-lg">{headerText}</p>
                {rightButton}
            </div>
            <div className="py-4 md:px-7 px-4">{children}</div>
        </section>
    );
}
