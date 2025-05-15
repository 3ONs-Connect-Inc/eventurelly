import { FieldConfig } from "../components/ui/FormRenderer";

export const RequestFields: FieldConfig[] = [
  { component: "Input", name: "firstName", label: "First Name", placeholder: "Enter first name", onBlur: "firstName",    groupId: "nameGroup" },
  { component: "Input", name: "lastName", label: "Last Name", placeholder: "Enter last name", onBlur: "lastName",     groupId: "nameGroup"},
  { component: "Input", name: "organizationName", label: "Organization Name", placeholder: "Enter organization name" },
  { component: "Input", name: "email", label: "Email Address", type: "email", placeholder: "abc@company.com", onBlur: "email" },
  { component: "PhoneInput" },
];











