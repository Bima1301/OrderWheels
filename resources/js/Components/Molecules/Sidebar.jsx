import { LiaTimesCircleSolid } from "react-icons/lia";
import { sidebarItems } from "../Constant/SidebarItems";
import { Link, usePage } from "@inertiajs/react";
import DashboardItem from "../Atoms/DashboardItem";
import { GiCarWheel } from "react-icons/gi";

const Sidebar = ({ setShowNav, userRole }) => {
    const { pageName } = usePage().props;
    return (
        <aside className="fixed  top-0 flex flex-col justify-between h-screen  bg-purple-500 transition duration-300 xl:w-64 w-60 ">
            <div className="w-full md:hidden flex p-2 justify-end text-white absolute">
                <button
                    onClick={() => {
                        setShowNav(false);
                    }}
                >
                    <LiaTimesCircleSolid size={30} />
                </button>
            </div>
            <Link
                href={"/"}
                className="flex justify-center py-8 bg-purple-600 mb-3"
            >
                <picture className="flex flex-row items-center  gap-1">
                    <GiCarWheel className="text-white" size={30} />
                    <p className="md:text-2xl text-lg font-extrabold text-white">
                        - Wheels
                    </p>
                </picture>
            </Link>
            <div className="flex flex-col h-full justify-between overflow-y-auto overflow-x-hidden blue-scroll">
                <div className="flex flex-col">
                    {sidebarItems[0]?.top?.map((item) => (
                        <DashboardItem
                            userRole={userRole}
                            key={item.mainLabel}
                            mainLabel={item.mainLabel}
                            items={item.items}
                            pageName={pageName}
                        />
                    ))}
                </div>
                <div className="flex flex-col mb-2">
                    {sidebarItems[1]?.bottom?.map((item) => (
                        <DashboardItem
                            userRole={userRole}
                            key={item.mainLabel}
                            mainLabel={item.mainLabel}
                            items={item.items}
                            pageName={pageName}
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
