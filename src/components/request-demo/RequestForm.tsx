import { useColor } from "../../hooks/ui/useColor";
import { useRequestForm } from "../../hooks/submit/useRequestForm";
import SuccessModal from "../ui/modal/SuccessModal";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { Country } from "../../types";
import { FormRenderer } from "../ui/FormRenderer";
import { RequestFields } from "../../data/data";

const RequestForm: React.FC<{ countries: Country[] }> = ({ countries }) => {
  const { textColor, pColor, bgColor2 } = useColor();

  const {
    formData,
    setFormData,
    errors,
    handleBlur,
    isFormValid,
    setErrors,
    isLoading,
    isSuccess,
    handleChange,
    checkFormComplete,
    setIsSuccess,
    handleSubmit,
  } = useRequestForm();

  return (
    <div className="flex flex-col items-center mx-auto py-10  px-6">
      <div
        className={`${bgColor2} ${textColor} shadow-lg w-full max-w-5xl rounded-lg  border border-border-foreground p-8 sm:p-15`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold max-md:text-2xl">
            Let’s Get Started – Request Your Demo
          </h2>
          <p className={`${pColor} mt-2 text-base max-md:text-sm`}>
            Fill out the form below, and we’ll be in touch soon to schedule your
            personalized demo!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormRenderer
            fields={RequestFields}
            formData={formData}
            errors={errors}
            setErrors={setErrors}
            handleChange={handleChange}
            specialHandlers={{ handleBlur }}
            setFormData={setFormData}
            countries={countries}
          />

          <div className="flex justify-end max-sm:justify-center ">
            <button
              type="submit"
              className="flex max-xs:px-4 items-center whitespace-nowrap gap-2 bg-primary hover:bg-primary/90 mt-4 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !checkFormComplete() || !isFormValid}
            >
              {isLoading ? "Submitting..." : "Submit"}
              <IoPaperPlaneOutline className="w-4 h-4 flex items-center font-bold" />
            </button>
          </div>
        </form>
      </div>

      {isSuccess && (
        <SuccessModal
          header="Thank you! Your demo request has been received"
          message="Our team will reach out shortly to schedule your session. We look forward to helping you build stronger teams!"
          onClose={() => {
            setIsSuccess(false);
          }}
        />
      )}
    </div>
  );
};

export default RequestForm;
