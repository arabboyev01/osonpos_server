# OsonPOS Server API Documentation

**Base URL**: `http(s)://<your-domain>/api/v1`

All requests except registration and login require a **Bearer Token** in the `Authorization` header.

## 🔐 Authentication & Global User Management
| Action | Method | Endpoint | Roles Required |
| :--- | :--- | :--- | :--- |
| Register Business | POST | `/auth/register` | Public |
| Login | POST | `/auth/login` | Public |
| Get My Profile | GET | `/auth/user/info` | Authenticated |
| Create New User | POST | `/auth/user` | Authenticated |
| Update User | PATCH | `/auth/user/:id` | Authenticated |

---

## 👥 Employee Management
| Action | Method | Endpoint | Roles Required |
| :--- | :--- | :--- | :--- |
| Create Employee | POST | `/employee/create` | OWNER, ADMIN |
| List All Employees | GET | `/employee/all` | OWNER, ADMIN |
| Get One Employee | GET | `/employee/:id` | OWNER, ADMIN |
| Update Employee | PATCH | `/employee/update/:id` | OWNER, ADMIN |
| Delete Employee | DELETE | `/employee/delete/:id` | OWNER, ADMIN |

---

## 🏢 Business Configuration
| Action | Method | Endpoint | Roles Required |
| :--- | :--- | :--- | :--- |
| **Points** | | | |
| Create Point | POST | `/business-config/points/create` | OWNER, ADMIN |
| List Points | GET | `/business-config/points/all` | OWNER, ADMIN |
| Update Point | PATCH | `/business-config/points/update/:id` | OWNER, ADMIN |
| Delete Point | DELETE | `/business-config/points/delete/:id` | OWNER, ADMIN |
| **Workplaces** | | | |
| Create Workplace | POST | `/business-config/workplaces/create` | OWNER, ADMIN |
| List Workplaces| GET | `/business-config/workplaces/all` | OWNER, ADMIN |
| Update Workplace| PATCH | `/business-config/workplaces/update/:id` | OWNER, ADMIN |
| Delete Workplace| DELETE | `/business-config/workplaces/delete/:id" | OWNER, ADMIN |
| **Printers** | | | |
| Create Printer | POST | `/business-config/printers/create` | OWNER, ADMIN |
| List Printers | GET | `/business-config/printers/all` | OWNER, ADMIN |
| Update Printer | PATCH | `/business-config/printers/update/:id` | OWNER, ADMIN |
| Delete Printer | DELETE | `/business-config/printers/delete/:id` | OWNER, ADMIN |
| **Payment Devices** | | | |
| Create Device | POST | `/business-config/payment-devices/create` | OWNER, ADMIN |
| List Devices | GET | `/business-config/payment-devices/all` | OWNER, ADMIN |
| Update Device | PATCH | `/business-config/payment-devices/update/:id` | OWNER, ADMIN |
| Delete Device | DELETE | `/business-config/payment-devices/delete/:id` | OWNER, ADMIN |

---

## 📦 Inventory Management
| Action | Method | Endpoint | Roles Required |
| :--- | :--- | :--- | :--- |
| **Items** | | | |
| Create Item | POST | `/inventory/items/create` | OWNER, ADMIN |
| List Items | GET | `/inventory/items/all` | OWNER, ADMIN |
| Update Item | PATCH | `/inventory/items/update/:id` | OWNER, ADMIN |
| Delete Item | DELETE | `/inventory/items/delete/:id` | OWNER, ADMIN |
| **Item Groups** | | | |
| Create Group | POST | `/inventory/item-groups/create` | OWNER, ADMIN |
| List Groups | GET | `/inventory/item-groups/all` | OWNER, ADMIN |
| Update Group | PATCH | `/inventory/item-groups/update/:id` | OWNER, ADMIN |
| Delete Group | DELETE | `/inventory/item-groups/delete/:id` | OWNER, ADMIN |
| **Modifiers** | | | |
| Create Modifier | POST | `/inventory/modifiers/create` | OWNER, ADMIN |
| List Modifiers | GET | `/inventory/modifiers/all` | OWNER, ADMIN |
| Update Modifier | PATCH | `/inventory/modifiers/update/:id` | OWNER, ADMIN |
| Delete Modifier | DELETE | `/inventory/modifiers/delete/:id` | OWNER, ADMIN |
| **Modifier Groups** | | | |
| Create Mod Group | POST | `/inventory/modifier-groups/create` | OWNER, ADMIN |
| List Mod Groups | GET | `/inventory/modifier-groups/all` | OWNER, ADMIN |
| Update Mod Group | PATCH | `/inventory/modifier-groups/update/:id` | OWNER, ADMIN |
| Delete Mod Group | DELETE | `/inventory/modifier-groups/delete/:id` | OWNER, ADMIN |

---

## 💰 Finance Configuration
| Action | Method | Endpoint | Roles Required |
| :--- | :--- | :--- | :--- |
| **Taxes & Fees** | | | |
| Create Tax/Fee | POST | `/finance/taxes/create` | OWNER, ADMIN |
| List Taxes/Fees | GET | `/finance/taxes/all` | OWNER, ADMIN |
| Update Tax/Fee | PATCH | `/finance/taxes/update/:id` | OWNER, ADMIN |
| Delete Tax/Fee | DELETE | `/finance/taxes/delete/:id` | OWNER, ADMIN |
| **Discounts** | | | |
| Create Discount | POST | `/finance/discounts/create` | OWNER, ADMIN |
| List Discounts | GET | `/finance/discounts/all` | OWNER, ADMIN |
| Update Discount | PATCH | `/finance/discounts/update/:id` | OWNER, ADMIN |
| Delete Discount | DELETE | `/finance/discounts/delete/:id` | OWNER, ADMIN |

---

## 🛒 Order Management
| Action | Method | Endpoint | Roles Required |
| :--- | :--- | :--- | :--- |
| Create Order | POST | `/orders/create` | OWNER, ADMIN |
| List All Orders | GET | `/orders/all` | OWNER, ADMIN |
| Get Order Details| GET | `/orders/:id` | OWNER, ADMIN |

---

## 📝 Logs & Audit
| Action | Method | Endpoint | Roles Required |
| :--- | :--- | :--- | :--- |
| Create Log Entry | POST | `/logs/create` | OWNER, ADMIN |
| View Recent Logs| GET | `/logs/all` | OWNER, ADMIN |
