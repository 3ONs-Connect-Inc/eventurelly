import { FieldConfig } from "../../components/ui/FormRenderer";
import { termsLabel } from "./termsLabel";


export const registerFormFields: FieldConfig[] = [
    { component: "Input", label: "Company Name", name: "companyName", type: "text", placeholder: "Amazon", onBlur: "handleCompanyBlur" },
    { component: "Input", label: "Company Address", name: "companyAddress", type: "text", placeholder: "Enter your Address", onBlur: "handleBlur", refName: "addressInputRef" },
    { component: "PhoneInput" },
    { component: "Input", label: "Email Address", name: "email", type: "email", placeholder: "abc@example.com", onBlur: "handleEmailBlur" },
    { component: "Input", label: "Password", name: "password", type: "password", placeholder: "N4&vQ2!p" },
    { component: "Input", label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "N4&vQ2!p" },
    { component: "ReCAPTCHA" },
    { component: "Checkbox", name: "ageConfirmed", label: "I confirm that I am above the age of 18." },
    {
      component: "Checkbox",
      name: "terms",
      label: termsLabel,
    },
  ];
  

export const employeeFormFields: FieldConfig[] = [
  {
    component: "Input",
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
  },
  {
    component: "Input",
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
  },
  {
    component: "CompanyDropdown",
    name: "companyName",
    label: "Company Name",  
  },
  {
    component: "PhoneInput",
  },
  {
    component: "EmailAddressInput",
  },
  {
    component: "Input",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "N4&vQ2!p",
  },
  {
    component: "Input",
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "N4&vQ2!p",
  },
  {
    component: "ReCAPTCHA",
  },
  {
    component: "Checkbox",
    name: "ageConfirmed",
    label: "I confirm that I am above the age of 18.",
  },
  {
    component: "Checkbox",
    name: "terms",
    label: termsLabel,
  },
];


export const signInFormFields: FieldConfig[] = [
    {
      component: "Input",
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "abc@example.com",
      onBlur: "handleBlur",
    },
    {
      component: "Input",
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      onBlur: "handleBlur",
    },
    {
      component: "Checkbox",
      name: "rememberMe",
      label: "Remember Me",
    },
  ];
  
