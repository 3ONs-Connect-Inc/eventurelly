import Button from "./Button";

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  className?: string;
  buttonAlignment?: "right" | "center";
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  buttonText,
  className = "",
  buttonAlignment = "right",
  onClick,
}) => {
  return (
    <div
      className={`shadow-lg p-6 flex flex-col items-center text-center w-full max-w-xs ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-cover mb-4 rounded-full"
      />
      <h2 className="text-2xl black-2 font-medium font-figtree mb-2">
        {title}
      </h2>
      <p className="text-sm font-normal gray-3 font-figtree mb-4">
        {description}
      </p>
      <div
        className={`flex w-full ${
          buttonAlignment === "right" ? "justify-end" : "justify-center"
        }`}
      >
        <Button
          label={buttonText}
          className="bg-white rounded-lg border black-2 border-color hover-effect"
          onClick={onClick}
        />
      </div>
    </div>
  );
}; //buttonAlignment="center"

export default Card;
