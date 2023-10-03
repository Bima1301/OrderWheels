"use client";

import { Link } from "@inertiajs/react";
import clsx from "clsx";
import React from "react";

function className({ active }) {
    return clsx(
        `pl-6 py-3 mx-5 rounded-md text-center cursor-pointer mb-3 flex items-center transition-colors md:text-base text-sm`,
        active
            ? "bg-indigo-600 bg-opacity-[0.5] text-white"
            : "text-white hover:bg-indigo-600 hover:bg-opacity-[0.6] hover:text-white"
    );
}
const Items = ({
    label,
    icon: Icon,
    active,
    href,
    onClick,
    isButton,
    method,
}) => (
    <>
        {isButton ? (
            <div onClick={onClick} className={className({ active })}>
                <Icon className="h-5 w-5 shrink-0 mr-2" />
                <div>
                    <p>{label}</p>
                </div>
            </div>
        ) : (
            <Link href={href} className={className({ active })} method={method}>
                <Icon className="h-5 w-5 shrink-0 mr-2 " />
                <div>
                    <p>{label}</p>
                </div>
            </Link>
        )}
    </>
);

const DashboardItem = ({ mainLabel, items, pageName, userRole }) => (
    <div className="mb-4">
        <p className="px-6 mx-5 md:mb-2 mb-0 text-white text-sm text-opacity-[0.5]">
            {mainLabel}
        </p>
        {items.map((item, index) => {
            if (item.role == userRole || item.role === "all") {
                return (
                    <Items
                        key={index}
                        label={item.label}
                        icon={item.icon}
                        active={item.label === pageName}
                        href={item.href}
                        isButton={item.isButton}
                        onClick={item.onClick}
                        method={item.method}
                    />
                );
            }
        })}
    </div>
);

export default DashboardItem;
