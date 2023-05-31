import { CardStyles } from "../styles/styles";

interface CardProps extends React.PropsWithChildren {
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return <div className={`${className} ${CardStyles.card}`}>{children}</div>;
};

const CardHeader = ({ children, className }: CardProps) => {
  return <div className={`${className} ${CardStyles.head}`}>{children}</div>;
};

const CardTitle = ({ children, className }: CardProps) => {
  return <div className={`${className} ${CardStyles.title}`}>{children}</div>;
};

const CardSubTitle = ({ children, className }: CardProps) => {
  return <div className={`${className} ${CardStyles.subtitle}`}>{children}</div>;
};

const CardAction = ({ children, className }: CardProps) => {
  return <div className={`${className} ${CardStyles.action}`}>{children}</div>;
};

const CardBody = ({ children, className }: CardProps) => {
  return <div className={`${className}`}>{children}</div>;
};

const CardFooter = ({ children, className }: CardProps) => {
  return <div className={`${className} ${CardStyles.footer}`}>{children}</div>;
};

Card.Body = CardBody;
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.SubTitle = CardSubTitle;
Card.Action = CardAction;
Card.Footer = CardFooter;

export default Card;