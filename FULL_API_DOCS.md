# 🚀 OsonPOS Full API Integration Guide

This document contains all the information needed to integrate the OsonPOS frontend with the backend.

- **Base URL**: `https://posapi.osonpos.com/api/v1`
- **Primary Domain**: `https://posapi.osonpos.com`

---

## 🔑 1. Authentication & Users

### POST `/auth/register`
Creates a new business and an owner user.
**Body:**
```json
{
  "login": "string (unique)",
  "password": "string (min 6 characters)",
  "businessName": "string",
  "name": "string (Owner full name)",
  "phoneNumber": "string (optional)",
  "address": "string (optional)"
}
```

### POST `/auth/login`
Returns a JWT token and user details.
**Body:**
```json
{
  "login": "string",
  "password": "string"
}
```
**Response Sample:**
```json
{
  "id": "uuid",
  "login": "string",
  "access_token": "JWT_TOKEN",
  "businessId": "uuid",
  "dbName": "string"
}
```

### GET `/auth/user/info`
Returns current user profile based on Bearer token.
**Header:** `Authorization: Bearer <token>`

---

## 👥 2. Employee Management

### POST `/employee/create`
**Body:**
```json
{
  "full_name": "string",
  "role": "OWNER | ADMIN | MANAGER | CASHIER",
  "password": "string",
  "phone_number": "string (optional)",
  "email": "string (optional)",
  "employee_address": "string (optional)",
  "notes": "string (optional)"
}
```

### GET `/employee/all`
Returns an array of all employees for the business.

---

## 📦 3. Inventory Management

### POST `/inventory/items/create`
**Body:**
```json
{
  "name": "string",
  "measurement": "string (e.g., pcs, kg, l)",
  "price": "string (numeric string)",
  "type": "ITEM | ITEM_GROUP | MODIFIER",
  "group_id": "uuid (optional)",
  "description": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "is_menu": "boolean (default: false)"
}
```

### GET `/inventory/items/all`
Returns all products/services.

### GET `/inventory/item-groups/all`
Returns all categories/groups.

---

## 🛒 4. Orders

### POST `/orders/create`
**Body:**
```json
{
  "order_id": "string (Internal ID, e.g., #1001)",
  "subtotal": "string",
  "total_sum": "string",
  "employee_id": "uuid",
  "automated_point_id": "uuid",
  "workplace_id": "uuid",
  "payment_type_id": "uuid",
  "items": [
    {
      "item_id": "uuid",
      "quantity": "string",
      "price": "string",
      "subtotal": "string",
      "note": "string (optional)"
    }
  ],
  "delivery": {
    "customer_name": "string",
    "contact_phone": "string",
    "shipping_address": "string",
    "city": "string",
    "postal_code": "string"
  }
}
```

---

## 🏢 5. Business Settings (Config)

### GET `/business-config/points/all`
Returns all Automated Points (Sales Points).

### GET `/business-config/workplaces/all`
Returns all Workplaces (Desks/Stations).

### GET `/business-config/payment-devices/all`
Returns all integrated payment terminals.

---

## 💰 6. Finance

### GET `/finance/taxes/all`
Returns configured taxes and fees.

### GET `/finance/discounts/all`
Returns available discount templates.

---

## 🗂 Enums & Types

| Enum | Possible Values |
| :--- | :--- |
| **S_Employee_Role** | `OWNER`, `ADMIN`, `MANAGER`, `CASHIER` |
| **S_Item_Type** | `ITEM`, `ITEM_GROUP`, `ITEM_SUBCATEGORY`, `MODIFIER` |
| **S_Tax_Fee_Type** | `TAX`, `FEE` |
| **T_Delivery_Status**| `PENDING`, `SHIPPED`, `IN_TRANSIT`, `DELIVERED`, `CANCELLED` |

---

## 🛠 Integration Notes
1. **Decimal handling**: Always send and receive prices as **strings** to avoid floating point precision issues.
2. **Date Format**: Standard ISO-8601 (`YYYY-MM-DDTHH:mm:ss.sssZ`).
3. **Multi-tenancy**: You don't need to specify which database to use. The server detects it automatically from the `access_token`.


Created Employee Role Controller
Implemented 

src/tenant/controllers/employee-role.controller.ts
 with the following endpoints:

POST /employee-role/create: Create a new role.
GET /employee-role/all: List all roles.
GET /employee-role/:id: Get role details.
PATCH /employee-role/update/:id: Update a role.
DELETE /employee-role/delete/:id: Soft delete a role.