
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
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Adventure Retreat",
    description:
      "Exciting retreats designed to build teamwork and resilience in an adventurous setting.",
    buttonText: "Learn More",
    tags: ["Training", "Adventure"],
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Outdoor Team Challenge",
    description:
      "Fun and engaging challenges designed to strengthen team collaboration in an outdoor environment.",
    buttonText: "Learn More",
    tags: ["Teamwork", "Challenge"],
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Professional Development",
    description:
      "Effective training programs designed to enhance team dynamics. Available as in-person sessions or virtual workshops.",
    buttonText: "Learn More",
    tags: ["Training", "Workshops"],
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Adventure Retreat",
    description:
      "Exciting retreats designed to build teamwork and resilience in an adventurous setting.",
    buttonText: "Learn More",
    tags: ["Outdoor", "Adventure"],
  },
  {
    image: "/images/ppl/card-img.png",
    title: "Outdoor Team Challenge",
    description:
      "Fun and engaging challenges designed to strengthen team collaboration in an outdoor environment.",
    buttonText: "Learn More",
    tags: ["Teamwork", "Challenge"],
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
    title: "Product",
    links: [
      { name: "Overview", url: "#" },
      { name: "Features", url: "#" },
      { name: "Solutions", url: "#" },
      { name: "Tutorials", url: "#" },
      { name: "Pricing", url: "#" },
      { name: "Releases", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", url: "#" },
      { name: "Careers", url: "#" },
      { name: "Press", url: "#" },
      { name: "News", url: "#" },
      { name: "Media kit", url: "#" },
      { name: "Contact", url: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", url: "#" },
      { name: "Newsletter", url: "#" },
      { name: "Events", url: "#" },
      { name: "Help centre", url: "#" },
      { name: "Tutorials", url: "#" },
      { name: "Support", url: "#" },
    ],
  },
];



