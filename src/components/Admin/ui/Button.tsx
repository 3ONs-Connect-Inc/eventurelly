


type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClick}>{children}</button>
);