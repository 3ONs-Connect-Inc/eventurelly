import Button from "./Button";

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  className?: string; 
  buttonAlignment?: "right" | "center"; 
}

const Card: React.FC<CardProps> = ({
   image, title, description, buttonText, 
   className = "",
   buttonAlignment = "right",
  }) => {
  return (
    <div className={`shadow-lg p-6 flex flex-col items-center text-center w-full max-w-xs ${className}`}>
      <img src={image} alt={title} className="w-24 h-24 object-cover mb-4 rounded-full" />
      <h2 className="text-2xl dark font-medium font-figtree mb-2">{title}</h2>
      <p className="text-sm font-normal gray-3 font-figtree mb-4">{description}</p>
      <div className={`flex w-full ${buttonAlignment === "right" ? "justify-end" : "justify-center"}`}>
        <Button label={buttonText}
        className="bg-white rounded-lg border border-color hover-effect"
        />
      </div>
    </div>
  );
};//buttonAlignment="center"

export default Card;
