
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

export const filterOptions = {
  "Event Category": ["Adventure", "Learning", "Wellness", "Fun"],
  "Group Size": ["1-10", "11-50", "51-200", "201-500", "500+ employees"],
  "Expected Outcome": ["Collaboration", "Creativity", "Communication", "Leadership", "Engagement"],
  "Format": ["In-person", "Virtual", "Hybrid"],
};

export const cardData = [
  {
    image: "/images/ppl/card-img.png",
    title: "Professional Development",
    description:
      "Effective training programs designed to enhance team dynamics. Available as in-person sessions or virtual workshops.",
    buttonText: "Learn More",
    tags: ["Outdoor", "Workshops"],
    slug: "professional-development", 
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Adventure Retreat",
    description:
      "Exciting retreats designed to build teamwork and resilience in an adventurous setting.",
    buttonText: "Learn More",
    tags: ["Training", "Adventure"],
    slug: "Adventure-Retreat", 
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Outdoor Team Challenge",
    description:
      "Fun and engaging challenges designed to strengthen team collaboration in an outdoor environment.",
    buttonText: "Learn More",
    tags: ["Teamwork", "Challenge"],
    slug: "Outdoor-Team-Challenge", 
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Professional Development",
    description:
      "Effective training programs designed to enhance team dynamics. Available as in-person sessions or virtual workshops.",
    buttonText: "Learn More",
    tags: ["Training", "Workshops"],
    slug: "professional-development", 
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Adventure Retreat",
    description:
      "Exciting retreats designed to build teamwork and resilience in an adventurous setting.",
    buttonText: "Learn More",
    tags: ["Outdoor", "Adventure"],
    slug: "Adventure-Retreat", 
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Outdoor Team Challenge",
    description:
      "Fun and engaging challenges designed to strengthen team collaboration in an outdoor environment.",
    buttonText: "Learn More",
    tags: ["Teamwork", "Challenge"],
    slug: "Outdoor-Team-Challenge", 
  },
];



export const tagColorMap: Record<string, string> = {
  Training: "bg-green-100 text-green-700",
  Workshops: "bg-blue-100 text-blue-700",
  Outdoor: "bg-yellow-100 text-yellow-700",
  Adventure: "bg-orange-100 text-orange-700",
  challenge: "bg-purple-100 text-purple-700",
  Teamwork: "bg-pink-100 text-pink-700",
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
    ],
  },
  {
    title: "Contact Us",
    links: [
      { name: "+647-532-7885", url: "#" },
      { name: "info@eventurelly.com", url: "#" },
    ],
  },
];


export const infoItems = [
  {
    icon: "/images/icon/user-check.png",
    title: "EVENT FORMAT",
    description: "In person",
  },
  {
    icon: "/images/icon/map.png",
    title: "Location",
    description: "Toronto, ON",
  },
  { icon: "/images/icon/users.png", 
    title: "Team Size",
     description: "4-5" 
    },
  { icon: "/images/icon/clock.png", 
    title: "Duration",
     description: "2 hours"
     },
  {
    icon: "/images/icon/activity.png",
    title: "ACTIVITY",
    description: "Moderate",
  },
];

