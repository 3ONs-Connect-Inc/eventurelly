
import Button from "../components/ui/Button";

interface ErrorProps {
  onReset: () => void;
}

export const Error: React.FC<ErrorProps> = ({ onReset }) => {
  return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-red-100 text-red-900 text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg mb-8">An unexpected error occurred. Please try again later.</p>
        <Button
          className='px-6 py-3 bg-primary text-white  bg-hover'
          onClick={onReset}
         label='Go to Home'
        />
      </div>
    );
  };