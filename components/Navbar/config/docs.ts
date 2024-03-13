export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: any;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav?: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    { label: "Donor", title: "Donor Dashboard", href: "/donor" },
    { label: "Donor", title: "Donor Login", href: "/donor/login" },
    { label: "Donor", title: "Donor Signup", href: "/donor/login" },
    { label: "Bank", title: "Demo", href: "/donor" },
  ],
  // sidebarNav: [
  //   {
  //     title: "Getting Started",
  //     items: [
  //       {
  //         title: "Introduction",
  //         href: "/docs",
  //         items: [],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Components",
  //     items: [
  //       {
  //         title: "Accordion",
  //         href: "/docs/components/accordion",
  //         items: [],
  //       },
  //     ],
  //   },
  // ],
};
