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
  "Expected Outcome": [
    "Collaboration",
    "Creativity",
    "Communication",
    "Leadership",
    "Engagement",
  ],
  Format: ["In-person", "Virtual", "Hybrid"],
};

export const cardData = [
  {
    image: "/images/top-picks/img1.png",
    title: "Leadership Development Workshop",
    description:
      "Foster growth and collaboration with hands-on leadership exercises designed to enhance decision-making, teamwork, and strategic thinking.",
    buttonText: "Learn More",
    tags: ["Virtual"],
    slug: "Leadership-Development-Workshop",
  },
  {
    image: "/images/top-picks/img2.png",
    title: "Diversity & Inclusion Workshop",
    description:
      "Encourage open discussions, explore real-world scenarios, and develop actionable strategies to build a diverse and welcoming work environment.",
    buttonText: "Learn More",
    tags: ["In-Person"],
    slug: "Diversity-&-Inclusion-Workshop",
  },
  {
    image: "/images/top-picks/img3.png",
    title: "Corporate Wellness Day",
    description:
      "A day dedicated to health and wellness! Engage in yoga, stress management workshops, and interactive fitness activities to promote a healthy work culture.",
    buttonText: "Learn More",
    tags: ["Virtual"],
    slug: "Corporate-Wellness-Day",
  },
  {
    image: "/images/top-picks/img4.png",
    title: "Chess Tournament",
    description:
      "Test your problem-solving skills in a high-energy chess tournament that encourages strategic thinking, teamwork, and friendly competition.",
    buttonText: "Learn More",
    tags: ["Hybrid"],
    slug: "Chess-Tournament",
  },
  {
    image: "/images/top-picks/img5.png",
    title: "Soccer Event",
    description:
      "Unleash your competitive spirit in an exciting soccer match where collaboration and strategy lead to victory. Perfect for team bonding and fitness!",
    buttonText: "Learn More",
    tags: ["In-Person"],
    slug: "Soccer-Event",
  },
  {
    image: "/images/top-picks/img6.png",
    title: "Corporate Casual Lunch",
    description:
      "Take a break from work and enjoy a relaxed team lunch designed to encourage informal networking, collaboration, and camaraderie in a stressfree setting.",
    buttonText: "Learn More",
    tags: ["Hybrid"],
    slug: "Corporate-Casual-Lunch",
  },
];
export const tagColorMap: Record<string, string> = {
  Hybrid: "bg-green-100 text-green-700",
  "In-Person": "bg-blue-100 text-blue-700",
  Virtual: "bg-yellow-100 text-yellow-700",
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
  { icon: "/images/icon/users.png", title: "Team Size", description: "4-5" },
  { icon: "/images/icon/clock.png", title: "Duration", description: "2 hours" },
  {
    icon: "/images/icon/activity.png",
    title: "ACTIVITY",
    description: "Moderate",
  },
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



  export const services: string[] = [
    "Personalized 1-on-1 Coaching – Health, fitness, and stress management.",
    "Healthy Meal Plans – Custom nutrition plans for employees.",
    "On-Site Fitness Equipment & Trainers – Yoga mats, resistance bands, and instructors.",
    "Live Relaxation Music – Professional musicians for calming ambiance.",
    "Wellness Gift Kits – Custom merchandise like water bottles, stress balls, and planners.",
  ];

  export const servicesTags =['Diversity training materials',
    'Interactive sessions', 
    'Certification of Participation']








