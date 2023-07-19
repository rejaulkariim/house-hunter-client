import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Link } from "react-router-dom";

const buttonVariants = cva("py-2 px-4 rounded-md duration-300 cursor-pointer bg-accent text-dark hove:bg-accent/90", {
  variants: {
    color: {
      green: "bg-accent text-dark hove:bg-accent/90",
    },
  },
  defaultVariants: {
    color: "green",
  },
});
const Button = ({ href, color, placeholder }) => {
  return (
    <Link to={href} className={clsx(buttonVariants({ color }))}>
      {placeholder}
    </Link>
  );
};

export default Button;
