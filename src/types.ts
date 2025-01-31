
// Base interface for common properties
export interface BaseUser {
  id: string;
    companyName: string;
    companyContact: string;  
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    ageConfirmed: boolean;
    contactInfo?: string;
    captcha?: string;
    role: "Admin" | "CorporateAdmin" | "Manager" | "Editor"|  "User";
    timestamp: any;
    emailVerified: boolean,
}

// Interface for the User role (if different from the base, extend and add properties)
export interface User extends BaseUser {
  firstName: string;
  lastName: string;
  emailUsername?: string;
  emailDomain?: string;
}

// Interface for the CorporateAdmin role
export interface CorporateAdmin extends BaseUser {
  companyAddress: string;
}



// Type for form errors
export type FormErrors = Partial<Record<keyof User | keyof CorporateAdmin, string>>;

