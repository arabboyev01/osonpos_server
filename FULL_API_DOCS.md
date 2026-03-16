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

## 📦 3. Item & Modifier Management

### 🏷️ 3.1 Items (Products)

**POST `/item-modifier/items/create`**
**Body:**

```json
{
  "name": "string",
  "measurement": "string (e.g., pcs, kg, l)",
  "price": "string (numeric string)",
  "type": "ITEM",
  "group_id": "uuid (optional)",
  "description": "string (optional)",
  "search_name": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "color": "string (optional)",
  "pictures": ["url1", "url2"],
  "is_menu": "boolean (optional)",
  "is_service": "boolean (optional)",
  "allow_pickup": "boolean (optional)",
  "allow_delivery": "boolean (optional)"
}
```

**GET `/item-modifier/items/all`**
Returns all products/services.

**PATCH `/item-modifier/items/update/:id`**
**Body:**

```json
{
  "name": "string (optional)",
  "measurement": "string (optional)",
  "price": "string (optional)",
  "type": "ITEM (optional)",
  "group_id": "uuid (optional)",
  "description": "string (optional)",
  "search_name": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "color": "string (optional)",
  "pictures": ["url1", "url2"] (optional),
  "is_menu": "boolean (optional)",
  "is_service": "boolean (optional)",
  "allow_pickup": "boolean (optional)",
  "allow_delivery": "boolean (optional)"
}
```

**DELETE `/item-modifier/items/delete/:id`**

---

### 📁 3.2 Item Groups & Item Subcategories

Categories and their Subcategories share the same endpoints.

**POST `/item-modifier/item-groups/create`**
Create an Item Group (Category) or an Item Subcategory. Use `type: "ITEM_SUBCATEGORY"` to create a subgroup and link it using `group_id`.
**Body:**

```json
{
  "name": "string",
  "measurement": "string",
  "price": "string",
  "type": "ITEM_GROUP | ITEM_SUBCATEGORY",
  "description": "string (optional)",
  "search_name": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "color": "string (optional)",
  "pictures": ["url1"],
  "is_menu": "boolean (optional)",
  "is_service": "boolean (optional)",
  "allow_pickup": "boolean (optional)",
  "allow_delivery": "boolean (optional)",
  "id_automated_point": "uuid (optional)"
}
```

**GET `/item-modifier/item-groups/all`**
Returns all categories/groups and subgroups.

**PATCH `/item-modifier/item-groups/update/:id`**
**Body:**

```json
{
  "name": "string (optional)",
  "measurement": "string (optional)",
  "price": "string (optional)",
  "type": "ITEM_GROUP | ITEM_SUBCATEGORY (optional)",
  "description": "string (optional)",
  "search_name": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "color": "string (optional)",
  "pictures": ["url1"] (optional),
  "is_menu": "boolean (optional)",
  "is_service": "boolean (optional)",
  "allow_pickup": "boolean (optional)",
  "allow_delivery": "boolean (optional)",
  "id_automated_point": "uuid (optional)"
}
```

**DELETE `/item-modifier/item-groups/delete/:id`**

---

### 🔧 3.3 Modifiers

**POST `/item-modifier/modifiers/create`**
Create an individual modifier for your items.
**Body:**

```json
{
  "name": "string",
  "measurement": "string",
  "price": "string",
  "type": "MODIFIER",
  "group_id": "uuid (optional, ID of modifier group or subgroup)",
  "description": "string (optional)",
  "search_name": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "color": "string (optional)",
  "pictures": ["url1"],
  "is_menu": "boolean (optional)",
  "is_service": "boolean (optional)",
  "allow_pickup": "boolean (optional)",
  "allow_delivery": "boolean (optional)"
}
```

**GET `/item-modifier/modifiers/all`**
Returns all modifiers.

**PATCH `/item-modifier/modifiers/update/:id`**
**Body:**

```json
{
  "name": "string (optional)",
  "measurement": "string (optional)",
  "price": "string (optional)",
  "type": "MODIFIER (optional)",
  "group_id": "uuid (optional, ID of modifier group or subgroup)",
  "description": "string (optional)",
  "search_name": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "color": "string (optional)",
  "pictures": ["url1"] (optional),
  "is_menu": "boolean (optional)",
  "is_service": "boolean (optional)",
  "allow_pickup": "boolean (optional)",
  "allow_delivery": "boolean (optional)"
}
```

**DELETE `/item-modifier/modifiers/delete/:id`**

---

### 📂 3.4 Modifier Groups & Modifier Subgroups

**POST `/item-modifier/modifier-groups/create`**
Create a group or subgroup for your modifiers.
**Body:**

```json
{
  "name": "string",
  "measurement": "string",
  "price": "string",
  "type": "ITEM_GROUP | ITEM_SUBCATEGORY | MODIFIER",
  "description": "string (optional)",
  "search_name": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "color": "string (optional)",
  "pictures": ["url1"],
  "is_menu": "boolean (optional)",
  "is_service": "boolean (optional)",
  "allow_pickup": "boolean (optional)",
  "allow_delivery": "boolean (optional)",
  "id_automated_point": "uuid (optional)"
}
```

**GET `/item-modifier/modifier-groups/all`**
Returns all modifier groups and subgroups.

**PATCH `/item-modifier/modifier-groups/update/:id`**
**Body:**

```json
{
  "name": "string (optional)",
  "measurement": "string (optional)",
  "price": "string (optional)",
  "type": "ITEM_GROUP | ITEM_SUBCATEGORY | MODIFIER (optional)",
  "description": "string (optional)",
  "search_name": "string (optional)",
  "cost": "string (optional)",
  "shtrix": "string (optional)",
  "color": "string (optional)",
  "pictures": ["url1"] (optional),
  "is_menu": "boolean (optional)",
  "is_service": "boolean (optional)",
  "allow_pickup": "boolean (optional)",
  "allow_delivery": "boolean (optional)",
  "id_automated_point": "uuid (optional)"
}
```

**DELETE `/item-modifier/modifier-groups/delete/:id`**

---

### 📏 3.5 Measurements

**POST `/measurements/create`**
Create custom measurement units (e.g., kg, liters, units) to assign to items.
**Body:**

```json
{
  "name": "string (e.g., 'kg')"
}
```

**GET `/measurements/all`**
Returns all defined measurement units.

**PATCH `/measurements/update/:id`**
**Body:**

```json
{
  "name": "string (optional)"
}
```

**DELETE `/measurements/delete/:id`**

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
  "discounts": [
    {
      "item_id": "uuid (optional)",
      "discount_value": "string (optional)",
      "discount_percent": "string (optional)",
      "discount_id": "uuid (optional)"
    }
  ],
  "taxes": [
    {
      "item_id": "uuid (optional)",
      "tax_id": "uuid",
      "tax_percent": "string (optional)",
      "tax_value": "string (optional)",
      "fee_percent": "string (optional)",
      "fee_value": "string (optional)"
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

### 🏪 5.1 Automated Points (Sales Points)

**POST `/business-config/points/create`**

```json
{
  "name": "string",
  "guid": "string (optional)"
}
```

**GET `/business-config/points/all`**
Returns all Automated Points.
**PATCH `/business-config/points/update/:id`** | **DELETE `/business-config/points/delete/:id`**

---

### 🖥️ 5.2 Workplaces (Desks/Stations)

**POST `/business-config/workplaces/create`**

```json
{
  "name": "string",
  "automated_point_id": "uuid",
  "employee_id": "uuid",
  "guid": "string (optional)"
}
```

**GET `/business-config/workplaces/all`**
Returns all Workplaces.
**PATCH `/business-config/workplaces/update/:id`** | **DELETE `/business-config/workplaces/delete/:id`**

---

### 🖨️ 5.3 Printers

**POST `/business-config/printers/create`**

```json
{
  "name": "string",
  "ip_address": "string (optional)",
  "port": "string (optional)",
  "provider": "string (optional)",
  "mac_address": "string (optional)",
  "type": "string (optional)",
  "guid": "string (optional)"
}
```

**GET `/business-config/printers/all`**
Returns all Printers.

**PATCH `/business-config/printers/update/:id`**
**Body:**

```json
{
  "name": "string (optional)",
  "ip_address": "string (optional)",
  "port": "string (optional)",
  "provider": "string (optional)",
  "mac_address": "string (optional)",
  "type": "string (optional)",
  "guid": "string (optional)"
}
```

**DELETE `/business-config/printers/delete/:id`**

---

### 💳 5.4 Payment Devices (Terminals)

**POST `/business-config/payment-devices/create`**

```json
{
  "name": "string",
  "ip_address": "string (optional, valid IP)",
  "port": "string (optional)",
  "provider": "string (optional)",
  "mac_address": "string (optional)",
  "type": "string (optional)",
  "guid": "string (optional)"
}
```

**GET `/business-config/payment-devices/all`**
Returns all integrated payment terminals.

**PATCH `/business-config/payment-devices/update/:id`**
**Body:**

```json
{
  "name": "string (optional)",
  "ip_address": "string (optional, valid IP)",
  "port": "string (optional)",
  "provider": "string (optional)",
  "mac_address": "string (optional)",
  "type": "string (optional)",
  "guid": "string (optional)"
}
```

**DELETE `/business-config/payment-devices/delete/:id`**

---

## 💰 6. Finance & Marketing

### 📊 6.1 Taxes and Fees

Create standard taxes or custom fees. Use them to apply percentages or fixed amounts on orders later.

**POST `/finance/taxes/create`**
**Body:**

```json
{
  "name": "string",
  "tax_percent": "string (optional numeric string, e.g., '15' for 15%)",
  "tax_value": "string (optional fixed amount)",
  "fee_percent": "string (optional numeric string)",
  "fee_value": "string (optional fixed amount)",
  "guid": "string (optional sync identifier)",
  "id_automated_point": "uuid (optional, specific point)"
}
```

**GET `/finance/taxes/all`**
Returns all configured taxes and fees.

**PATCH `/finance/taxes/update/:id`**
**Body:**

```json
{
  "name": "string (optional)",
  "tax_percent": "string (optional)",
  "tax_value": "string (optional)",
  "fee_percent": "string (optional)",
  "fee_value": "string (optional)",
  "id_automated_point": "uuid (optional)"
}
```

**DELETE `/finance/taxes/delete/:id`**

---

### 🎁 6.2 Discounts

Create custom discounts to be applied to specific products or whole checks.

**POST `/finance/discounts/create`**
**Body:**

```json
{
  "name": "string",
  "discount_percent": "string (optional numeric string, e.g., '10' for 10% off)",
  "discount_value": "string (optional fixed sum)",
  "guid": "string (optional sync identifier)",
  "id_automated_point": "uuid (optional, restrict to a specific point)"
}
```

**GET `/finance/discounts/all`**
Returns all available discount templates.

**PATCH `/finance/discounts/update/:id`**
**Body:**

```json
{
  "name": "string (optional)",
  "discount_percent": "string (optional)",
  "discount_value": "string (optional)",
  "id_automated_point": "uuid (optional)"
}
```

**DELETE `/finance/discounts/delete/:id`**

---

## 🗂 Enums & Types

| Enum                  | Possible Values                                              |
| :-------------------- | :----------------------------------------------------------- |
| **S_Employee_Role**   | `OWNER`, `ADMIN`, `MANAGER`, `CASHIER`                       |
| **S_Item_Type**       | `ITEM`, `ITEM_GROUP`, `ITEM_SUBCATEGORY`, `MODIFIER`         |
| **T_Delivery_Status** | `PENDING`, `SHIPPED`, `IN_TRANSIT`, `DELIVERED`, `CANCELLED` |

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
