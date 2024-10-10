import { FileSignatureIcon, FileText, Layout, Settings, Users } from 'lucide-react';

export const sideBarOptions = {
    general: [
        {
            name: "Dashboard",
            icon: Layout,
            href: "/dashboard",
        },
        {
            name: "Content Explorer",
            icon: FileText,
            href: "/dashboard/content-explorer",
        },
        {
            name: "Audience Insights",
            icon: Users,
            href: "/dashboard/audience-insights",
        },
        {
            name: "Preferences",
            icon: FileSignatureIcon,
            href: "/dashboard/preferences",
        },
    ],
};
