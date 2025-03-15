import React from "react";

// Define button style variants
const buttonVariants = {
  outline: "border-2 border-primary700 text-primary700 hover:bg-primary700 hover:text-white",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  default: "bg-primary700 text-white hover:bg-primary900",
};

const Button = ({ variant = "default", children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold ${buttonVariants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
