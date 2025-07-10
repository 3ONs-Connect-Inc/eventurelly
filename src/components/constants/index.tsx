import { ChartColumn, 
    Home, 
    NotepadText, 
    Package, 
    CalendarCheck, 
    CalendarDays,
    //PackagePlus,
     Settings, 
    // ShoppingBag,    
   //  UserCheck,
      UserPlus, 
      Users } from "lucide-react";
import { FieldConfig } from "../ui/FormRenderer";
import { termsLabel } from "../termsLabel";
import { ConfigField } from "../Admin/ui/RenderForm";



//user
export interface NavLink {
    label: string;
    href: string;
  }
  
  export const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    {
      label: "Team Building Events",
      href: "/team-building-events",
    },
    { label: "Request a demo", href: "/demo-request" },
  ];
  
  
  export const tagColorMap: Record<string, string> = {
    "Adventure": "bg-green-100 text-green-700",
    "Learning": "bg-blue-100 text-blue-700",
    "Wellness": "bg-yellow-100 text-yellow-700",
    "Fun": "bg-green-100 text-green-700",
  
  };
  
  
  export const footerLinks = [
    {
      title: "Events",
      links: [
        { name: "In Person", url: "#" },
        { name: "Virtual/Remote", url: "#" },
        { name: "Hybrid", url: "#" },
        { name: "Tutorials", url: "#" },
      ],
    },
    {
      title: "Locations",
      links: [
        { name: "Virtual/Remote", url: "#" },
        { name: "Canada", url: "#" },
        { name: "United States", url: "#" },
        { name: "Global", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About us", url: "#" },  
        { name: "Careers", url: "#" },
        { name: "News", url: "#" },
        {name: "Privacy Policy", url: "/privacy-policy"},
        {name: "Terms and Conditions", url: "/terms-and-conditions"}
      ],
    },
    {
      title: "Contact Us",
      links: [
        { name: "+1 905-933-8653", url: "#" },
        { name: "info@eventurelly.com", url: "#" },
      ],
    },
  ];
  
  
  
  
  export const carousel = [
    {
      title: "Strengthen Bonds, Build a Thriving Team",
      desc: "Create unforgettable experiences that bring your team closer. Our corporate events foster collaboration, trust, and a sense of belonging—turning colleagues into a connected workforce.",
      img: "/images/slides/blob.png",
    },
    {
      title: "Inspire Connection, Ignite Engagement",
      desc: "Boost morale and employee engagement with events that inspire. From interactive workshops to thrilling experiences, we help you design moments that keep your team motivated and invested.",
      img: "/images/slides/blob2.png",
    },
    {
      title: "Create a Workplace Where People Belong",
      desc: "Happy employees stay longer. Our expertly curated corporate events enhance job satisfaction, making your company a place where people want to grow, thrive, and succeed.",
      img: "/images/slides/blob3.png",
    },
  ];
  
  
  
  
    export const servicesTags =['Diversity training materials',
      'Interactive sessions', 
      'Certification of Participation'
    
    ]
     
       
  
      export const filterOptions = {
        "event Category": ["Adventure", "Learning", "Wellness", "Fun"],
        "team Size": ["1-10",
           "11-50", "51-200", 
           "201-500", "500+employees"],
        "expected Outcome": [
          "Collaboration",
          "Creativity",
          "Communication",
          "Leadership",
          "Engagement",  
        ],
        eventFormat: ["In-person", "Virtual", "Hybrid"],
      };
  
      const getRandomValue = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
      // Randomly select tags on each render
      export const defaultTags = [
        getRandomValue(filterOptions["event Category"]),
        getRandomValue(filterOptions["team Size"]),
        getRandomValue(filterOptions["expected Outcome"]),
        getRandomValue(filterOptions.eventFormat),
      ];
  
    
      // locations: ['Vancouver, BC, CA', 'Toronto, ON, CA',
      //   'New York, NY, US', 'London, ENG, GB', 
      //   'Sydney, NSW, AU', 'Paris, ÎLE-DE-FR, FR',
      // 'Tokyo, 13, JP', 'Berlin, BE, DE','Los Angeles, CA, US',
      //  'São Paulo, SP, BR', 'Mumbai, MH, IN']
        
      
   
  
      export const services: string[] = [
        "Venue Rental – Choose from premium corporate training spaces.",
        "Catering Services – Coffee, snacks, and lunch options.",
        "Guest Speaker Session – A leadership expert to enhance the session.",
        "Event Photography – Capture key moments professionally.",
        "Personalized Certificates – Customized digital or printed certificates.",
      ];
    
  
      export const agendas = [
        {
          title: "Opening Discussion: The Importance of Inclusion",
          desc: "Explore why diversity and inclusion matter in the workplace and how they drive innovation, collaboration, and overall team success.",
          time: "20 Minutes",
        },
        {
          title: "Interactive Case Studies & Scenarios",
          desc: "Engage with real-world diversity challenges through case studies and scenarios that highlight workplace biases and opportunities for growth.",
          time: "40 Minutes",
        },
        {
          title: "Team Discussion & Personal Reflection",
          desc: "Participate in guided discussions and self-reflection exercises to understand different perspectives and foster a more inclusive mindset.",
          time: "30 Minutes",
        },
        {
          title: "Strategy Development",
          desc: "Work together to create actionable plans and strategies for promoting inclusivity within your team and organization.",
          time: "45 Minutes",
        },
        {
          title: "Q&A and Wrap-up",
          desc: "Wrap up the session with key takeaways, open discussions, and next steps to implement inclusive practices in your workplace.",
          time: "20 Minutes",
        },
      ];
      
      
      export const data = [
        { name: "Jan", sales: 4000 },
        { name: "Feb", sales: 3000 },
        { name: "Mar", sales: 5000 },
        { name: "Apr", sales: 4000 },
      ];
  



//forms
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
  


  
export const RequestFields: FieldConfig[] = [
  { component: "Input", name: "firstName", label: "First Name", placeholder: "Enter first name", onBlur: "firstName",    groupId: "nameGroup" },
  { component: "Input", name: "lastName", label: "Last Name", placeholder: "Enter last name", onBlur: "lastName",     groupId: "nameGroup"},
  { component: "Input", name: "organizationName", label: "Organization Name", placeholder: "Enter organization name" },
  { component: "Input", name: "email", label: "Email Address", type: "email", placeholder: "abc@company.com", onBlur: "email" },
  { component: "PhoneInput" },
];



//admin
export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/admin",
                
            },
            {
                label: "Analytics",
                icon: ChartColumn,
                path: "/admin/analytics",
            },
            {
                label: "Reports",
                icon: NotepadText,
                path: "/admin/reports",
            },
        ],
    },  
    {
        title: "Events",
        links: [
            {
                label: "Events",
                icon: CalendarCheck,
                path: "/admin/view-events",
            },  
            {
                label: "Add Event",
                icon: CalendarDays,
                path: "/admin/add-events",
            },
            {
                label: "Bookings",
                icon: Package,
                path: "/admin/view/bookings",
            },
        ],
    },
    {
        title: "Customers",
        links: [
            {
                label: "Customers",
                icon: Users,
                path: "/admin/view-users",
            },
            {
                label: "Manage Users",
                icon: UserPlus,
                path: "/admin/manage-users",
            },
          
        ],
    },
 
    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "/admin/settings",
            },
        ],
    },
];

export const addEventFormFields: ConfigField[] = [
  { type: "text", name: "eventName", placeholder: "Event Name", label: "Event Name", required: true },
  { type: "text", name: "eventTagline", placeholder: "Event Tag", label: "Event Tagline", required: true },
  { type: "textarea", name: "eventDescription",  placeholder: "Event Description", label: "Event Description", required: true },
  { type: "text", name: "slug", label: "Slug",  placeholder: "Slug", readOnly: true },
  { type: "text", name: "location",  placeholder: "Location",  label: "Location" },
  { type: "text", name: "duration",  placeholder: "Duration", label: "Duration" },
  ...Object.entries(filterOptions).map(
    ([label, options]) =>
      ({
        type: "select",
        name: label.replace(/\s+/g, ""),
        label,
        options,
      } as ConfigField)
  ),
];






