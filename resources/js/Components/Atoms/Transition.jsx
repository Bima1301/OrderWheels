// Transition.tsx
import { useState, useEffect, Fragment } from "react";

const Transition = ({ show, duration = 400, children }) => {
    const [isMounted, setIsMounted] = useState(show);

    useEffect(() => {
        if (show) {
            setIsMounted(true);
        } else {
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration]);

    return (
        <div className="fixed left-0 top-0 w-full z-50">
            <div
                className={`transition-transform duration-${duration} transform ${
                    show ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {isMounted && <Fragment>{children}</Fragment>}
            </div>
        </div>
    );
};

export default Transition;
