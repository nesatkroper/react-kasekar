import { image } from "./nav-user";
import {
  Bot,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
  SquareTerminal,
  ClipboardPen,
  HomeIcon,
} from "lucide-react";

export const data = {
  user: {
    name: "Suon Phanun",
    email: "phanunsuon@gmail.com",
    avatar: image,
  },
  teams: [
    {
      name: "Kasekar",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "pro",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "all-pro",
          url: "product",
        },
        {
          title: "pro-cate",
          url: "category",
        },
        {
          title: "pro-brand",
          url: "brand",
        },
      ],
    },

    {
      title: "human",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "emp",
          url: "employee",
        },
        {
          title: "dep",
          url: "department",
        },
        {
          title: "pos",
          url: "position",
        },
        {
          title: "auth",
          url: "authentication",
        },
        {
          title: "cus",
          url: "customer",
        },
        {
          title: "sup",
          url: "supplier",
        },
      ],
    },
    {
      title: "setting",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "gen",
          url: "#",
        },
        {
          title: "team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "home",
      url: "home",
      icon: HomeIcon,
    },
    {
      name: "dash",
      url: "dashboard",
      icon: PieChart,
    },
    {
      name: "po",
      url: "pos",
      icon: ClipboardPen,
    },
  ],
};
