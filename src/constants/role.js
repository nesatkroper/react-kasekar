export const ROLE = [
  {
    value: "admin",
    data: "Admin (Access all Permission)",
  },
  {
    value: "management",
    data: "Management (Allow all Data)",
  },
  {
    value: "accountant",
    data: "Accountant (Allow all Finance)",
  },
  {
    value: "sale",
    data: "Sale (For General Staff)",
  },
  {
    value: "client",
    data: "Client (View Landing Only)",
  },
];

export const ROLES = {
  ADMIN: "admin",
  CLIENT: "client",
  MANAGEMENT: "management",
  ACCOUNTANT: "accountant",
  SALE: "sale",
};

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 100,
  [ROLES.MANAGEMENT]: 80,
  [ROLES.ACCOUNTANT]: 60,
  [ROLES.SALE]: 40,
  [ROLES.CLIENT]: 20,
};
