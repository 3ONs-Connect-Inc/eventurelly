

// Base interface for common properties
export interface BaseUser {
  id: string;
    companyName: string;
    normalizedCompanyName: string;
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
    terms: boolean,
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

export interface Country {
  code: string;
  name: string;
}

export interface Event {
  isBooked?: boolean;
  id: string;
  image?: string;
  eventName: string;
  eventTagline: string;
  eventNameLower?: string;
  bookingId?: string;
  eventDescription: string;
  eventDesc: string;
  buttonText?: string;
  slug: string;
  eventFormat?: string;
  location?: string;
  duration?: string;
  teamSize?: string;
  eventCategory?: string,
  searchKeywords?: string[],
  expectedOutcome?: string,
 agendas: { title: string; desc: string; time: string }[];
  servicesIncluded?: string[];
  servicesNotIncluded?: string[];
  optionalServices: { [serviceName: string]: boolean };
}

export interface BookingData {
  bookingId?: string;
  eventNamePrefix: string;
  userId?: string;
  slug?: string;
  eventId?: string;
  eventName: string;
  eventDate: Date | null;
  optionalServices: { [serviceName: string]: boolean };
  eventDescription: string;
  eventDesc: string;
  eventFormat: string;
  location: string;
  eventCategory?: string,
  searchKeywords?: string[],
  expectedOutcome?: string,
  duration: string;
  teamSize: string;
  servicesIncluded: string[];
  servicesNotIncluded: string[];
}











