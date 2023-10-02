export default function InputLabel({
    value,
    className = "",
    required = false,
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block font-medium text-sm text-gray-700 ` + className}
        >
            {value ? value : children}{" "}
            {required && <span className="text-red-500">*</span>}
        </label>
    );
}
