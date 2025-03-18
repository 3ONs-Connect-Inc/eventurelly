import { useIconColor } from "../../../hooks/useIconColor";

const SuccessModal = ({
  message,
  onClose,
  header,
}: {
  message: string;
  header: string;
  onClose: () => void;
}) => {
  const { textColor, bgColor2 } = useIconColor();

  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 px-6" 
     style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
       <div
      className={`p-6 rounded-lg shadow-lg text-center w-full max-w-md ${bgColor2} ${textColor}`} >
        <div
          className="flex justify-center items-center w-10 h-10
   bg-green-100 rounded-full mx-auto mb-4"
        >
          <img src="/images/icon/check.png" loading="lazy" alt="check" />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">{header}</h2>
          <p className="text-sm font-normal mt-2">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-primary bg-hover text-white px-4 py-2 rounded-lg shadow-md"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
