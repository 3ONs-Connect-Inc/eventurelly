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







