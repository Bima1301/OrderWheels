import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
export default function SaveButton({ className, children, endIcon, ...props }) {
    const ColorButton = styled(Button)(({ theme }) => ({
        borderRadius: "0.375rem",
        backgroundColor: "#6366f1",
        "&:hover": {
            backgroundColor: "#818cf8",
        },
    }));
    return (
        <ColorButton variant="contained" endIcon={endIcon} {...props}>
            {children}
        </ColorButton>
    );
}
