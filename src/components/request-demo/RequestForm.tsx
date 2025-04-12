import { useIconColor } from "../../hooks/ui/useIconColor";
import Input from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import { useRequestForm } from "../../hooks/submit/useRequestForm";
import SuccessModal from "../ui/modal/SuccessModal";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { Country } from "../../types";


const RequestForm: React.FC<{ countries: Country[] }> = ({countries}) => {
  const { textColor, pColor, bgColor2 } = useIconColor();


  const {
    formData,
    setFormData,
    errors,
    handleBlur,
    isFormValid,
    setErrors,
    isLoading,
    isSuccess,
    checkFormComplete,
    setIsSuccess,
    handleSubmit,
  } = useRequestForm();
  
  return (
    <div className="flex flex-col items-center mx-auto py-10 ">
      <div
        className={`${bgColor2} ${textColor} w-full rounded-lg shadow-md border border-border-gray p-8 sm:p-15`}
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

        <form onSubmit={handleSubmit} >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-0">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onBlur={() => handleBlur("firstName")}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              errors={errors}
              placeholder="Enter first name"
              setErrors={setErrors}
              type="text"
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              onBlur={() => handleBlur("lastName")}
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              errors={errors}
              placeholder="Enter last name"
              setErrors={setErrors}
              className="max-md:-mt-3"
            />
          </div>

          <Input
            label="Organization Name"
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={(e) =>
              setFormData({ ...formData, organizationName: e.target.value })
            }
            errors={errors}
            placeholder="Enter organization name"
            setErrors={setErrors}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            onBlur={() => handleBlur("email")}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            errors={errors}
            placeholder="abc@company.com"
            setErrors={setErrors}
            required
          />

          <PhoneInput
            companyContact={formData.companyContact}
            phoneNumber={formData.phoneNumber}
            countries={countries}
            onCompanyContactBlur={() => handleBlur("companyContact")}
            onPhoneNumberBlur={() => handleBlur("phoneNumber")}
            onCompanyContactChange={(value) =>
              setFormData({ ...formData, companyContact: value })
            }
            onPhoneNumberChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, phoneNumber: value });
            }}
            errors={{
              companyContact: errors.companyContact,
              phoneNumber: errors.phoneNumber,
            }}
            setErrors={setErrors}
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
