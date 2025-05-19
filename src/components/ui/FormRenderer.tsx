
import ReCAPTCHA from "react-google-recaptcha";
import Input from "./Input";
import PhoneInput from "./PhoneInput";
import Checkbox from "./Checkbox";
import MapComponent from "../ShowMap";
import React from "react";
import CompanyDropdown from "./CompanyDropdown";
import EmailAddressInput from "./EmailAddressInput";

export type FieldConfig = {
    component: string;
    name?: string;
    label?: string | React.ReactNode;
    type?: string;
    placeholder?: string;
    onBlur?: string;
    refName?: string;
    wrapperClass?: string;      
    groupId?: string;  
  };
  
  interface FormRendererProps<TFormData extends Record<string, any>> {
    fields: FieldConfig[];
    formData: TFormData;
    errors: Record<string, string>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    specialHandlers: Record<string, (e: any) => void>;
    refs?: Record<string, any>;
    setFormData?: React.Dispatch<React.SetStateAction<TFormData>>;
    countries?: { name: string; code: string }[];
    recaptchaRef?: React.RefObject<ReCAPTCHA>;
    handleRecaptcha?: (token: string | null) => void;
    theme?: "light" | "dark";
    showMap?: boolean;
    markerPosition?: any;
    setMarkerPosition?: any;
    mapRef?: any;
    markerRef?: any;
    handleMapClick?: any;
    formSubmitted?: boolean; 
    domains?: any;
      
  }
  
  export const FormRenderer = <TFormData extends Record<string, any>>({
    fields,
    formData,
    errors,
    setErrors,
    handleChange,
    specialHandlers,
    refs,
    setFormData,
    countries,
    recaptchaRef,
    theme,
    handleRecaptcha,
    showMap,
    markerPosition,
    setMarkerPosition,
    mapRef,
    markerRef,
    handleMapClick,
    formSubmitted,
    domains,
}: FormRendererProps<TFormData>) => {
    const groupedFields = fields.reduce((acc, field) => {
        if (field.groupId) {
          acc[field.groupId] = acc[field.groupId] || [];
          acc[field.groupId].push(field);
        } else {
          acc["__ungrouped__"] = acc["__ungrouped__"] || [];
          acc["__ungrouped__"].push(field);
        }
        return acc;
      }, {} as Record<string, FieldConfig[]>);
      
    return (
      <>
         {Object.entries(groupedFields).map(([key, groupFields], idx) => {
      
      const isGrouped = key !== "__ungrouped__";

        return (
          <div
            key={idx}
            className={isGrouped ? "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 m-0" : ""}
          >
            {groupFields.map((field, idx) => {
          switch (field.component) {
            case "PhoneInput":
                if (!countries || !setFormData) return null;
              return (
                <PhoneInput
                  key={idx}
                  companyContact={formData.companyContact}
                  phoneNumber={formData.phoneNumber}
                  countries={countries}
                  onCompanyContactChange={(value) =>
                    setFormData((prev) => ({ ...prev, companyContact: value }))
                  }
                  onPhoneNumberChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  errors={{
                    companyContact: errors.companyContact,
                    phoneNumber: errors.phoneNumber,
                  }}
                  setErrors={setErrors}
                />
              );
  
              case "Input":         
                return (
                  <React.Fragment key={idx}>
                    <Input
                      label={typeof field.label === 'string' ? field.label : ''}
                      type={field.type || "text"}
                      name={field.name!}
                      value={formData[field.name!]}
                      placeholder={field.placeholder ?? ""}
                      onChange={handleChange}
                      onBlur={field.onBlur ? specialHandlers[field.onBlur] : undefined}
                      errors={{ [field.name!]: errors[field.name!] }}
                      setErrors={setErrors}
                      ref={refs?.[field.refName || ""]}
                    />
                    {/* Render MapComponent directly after companyAddress input */}
                    {field.name === "companyAddress" && showMap && setFormData && (
                      <MapComponent
                        markerPosition={markerPosition}
                        setMarkerPosition={setMarkerPosition}
                        setFormData={setFormData}
                        addressInputRef={refs?.[field.refName || ""]}
                        mapRef={mapRef}
                        handleMapClick={handleMapClick}
                        markerRef={markerRef}
                      />
                    )}
                  </React.Fragment>
                );
              
  
            case "Checkbox":
              return (
                <Checkbox
                  key={idx}
                  name={field.name!}
                  checked={!!formData[field.name!]}
                  onChange={handleChange}
                  label={field.label}
                  errors={errors}
                />
              );
  
            case "ReCAPTCHA":
              return (
                <div
                  key={idx}
                  className="mb-4 flex flex-col justify-center items-center"
                >
                  <div
                    className="captcha-container mt-4 mb-4"
                    style={{
                      width: "auto",
                      transformOrigin: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ReCAPTCHA
                      sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
                      ref={recaptchaRef}
                      onChange={handleRecaptcha}
                      theme={theme}
                    />
                  </div>
                </div>
              );

              case "CompanyDropdown":
                return (
                  <CompanyDropdown
                    key={idx}
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    errors={{
                      companyName: formSubmitted ? errors.companyName : undefined,
                    }}
                    setErrors={setErrors}
                  />
                );
              
                case "EmailAddressInput":
                    return (
                      
        <EmailAddressInput
        key={idx}
        emailUsername={formData.emailUsername}
        emailDomain={formData.emailDomain}
        domains={domains}
        onUsernameChange={(e) => handleChange(e)}
        onDomainChange={(e) => {
          const domain = e.target.value.trim();
          if (!domain) {
            return;
          }
          handleChange(e);  
        }}
        errors={{
          emailUsername: errors.emailUsername,
          emailDomain: errors.emailDomain,
        }}
        setErrors={setErrors}
      />
                    );

            default:
              return null;
            }
        })}
      </div> 
    );
  })}
</>
    );
  };