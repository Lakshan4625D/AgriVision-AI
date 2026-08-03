import {
    LayoutDashboard,
    ScanSearch,
    History,
    FileText,
    BarChart3,
    Users,
    Settings,
    HelpCircle
} from "lucide-react";

export const navigation = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        title: "Crop Analysis",
        icon: ScanSearch,
        path: "/analysis"
    },
    {
        title: "History",
        icon: History,
        path: "/history"
    },
    {
        title: "Reports",
        icon: FileText,
        path: "/reports"
    },
    {
        title: "Analytics",
        icon: BarChart3,
        path: "/analytics"
    },
    {
        title: "Users",
        icon: Users,
        path: "/admin"
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings"
    },
    {
        title: "Help",
        icon: HelpCircle,
        path: "/help"
    }
];