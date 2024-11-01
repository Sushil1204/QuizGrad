import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // Toggle between showing and hiding the password
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative flex items-center">
        <input
          type={showPassword && type === "password" ? "text" : type}
          className={cn(
            "flex h-6 w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 pr-10", // Added padding for icon space
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
