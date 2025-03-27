

type CardProps = {
    children: React.ReactNode;
  };
  

export const Card: React.FC<CardProps> = ({ children }) => (
    <div className="bg-white shadow-md p-4 rounded-lg">{children}</div>
  );
export   const CardContent: React.FC<CardProps> = ({ children }) => <div className="p-4">{children}</div>;
  