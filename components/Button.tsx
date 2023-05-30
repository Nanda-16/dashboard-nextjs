import { ButtonStyles } from "./styles/styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant:
    | "primary"
    | "outline-primary"
    | "icon-primary"
    | "secondary"
    | "success"
    | "danger"
    | "icon-danger";
  size: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const Button = ({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${ButtonStyles.btn} ${ButtonStyles.variant[variant]} ${ButtonStyles.size[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;