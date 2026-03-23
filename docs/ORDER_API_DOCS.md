# 🛒 Order API Documentation

This document provides detailed information on how to create and manage orders in the OsonPOS system.

## 🔑 Base URL
`https://posapi.osonpos.com/api/v1`

---

## 1. Create Order

**Endpoint:** `POST /orders/create`  
**Authentication:** Bearer Token required  
**Allowed Roles:** `OWNER`, `ADMIN`

### Request Body (`CreateOrderDto`)

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | `string` | Yes | Internal reference ID (e.g., "#1001") |
| `order_name` | `string` | No | Optional name for the order |
| `guid` | `string` | No | Optional unique sync identifier |
| `subtotal` | `string` | Yes | Sum of items before taxes and discounts |
| `total_sum` | `string` | Yes | Final total sum after all adjustments |
| `total_discount` | `string` | No | Total discount applied to the order |
| `total_tax` | `string` | No | Total tax applied to the order |
| `total_paid` | `string` | No | Total amount paid by the customer |
| `total_change` | `string` | No | Change returned to the customer |
| `discount_percent`| `string` | No | Global discount percentage |
| `discount_sum` | `string` | No | Global discount value |
| `employee_id` | `uuid` | Yes | ID of the employee creating the order |
| `automated_point_id`| `uuid` | Yes | ID of the Sales Point |
| `workplace_id` | `uuid` | Yes | ID of the specific Desk/Station |
| `payment_type_id` | `uuid` | Yes | ID of the payment method |
| `client_id` | `uuid` | No | ID of the customer (if linked) |
| `payment_id` | `uuid` | No | ID of the payment transaction record |
| `barcode` | `string` | No | Optional barcode for the order |
| `delivery_fee` | `string` | No | Fee for delivery services |
| `is_closed` | `boolean` | No | Whether the order is finalized |
| `items` | `OrderItemDto[]`| Yes | Array of items in the order |
| `discounts` | `OrderDiscountDto[]`| No | Array of order-level discounts |
| `taxes` | `OrderItemTaxDto[]`| No | Array of order-level taxes/fees |
| `delivery` | `OrderDeliveryDto`| No | Delivery details if applicable |

### Data Structures

#### `OrderItemDto`
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `item_id` | `uuid` | Yes | ID of the product/service |
| `quantity` | `string` | Yes | Quantity (e.g., "2", "0.5") |
| `price` | `string` | Yes | Price per unit |
| `subtotal` | `string` | Yes | Quantity * Price |
| `note` | `string` | No | Optional note for the item |
| `discount_id` | `uuid` | No | ID of applied discount |

#### `OrderDiscountDto`
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `item_id` | `uuid` | No | Link to specific item if item-level |
| `discount_id` | `uuid` | No | ID of the discount template |
| `discount_value` | `string` | No | Fixed discount amount |
| `discount_percent`| `string` | No | Discount percentage |

#### `OrderItemTaxDto`
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `tax_id` | `uuid` | Yes | ID of the tax/fee template |
| `item_id` | `uuid` | No | Link to specific item if item-level |
| `tax_percent` | `string` | No | Tax percentage |
| `tax_value` | `string` | No | Fixed tax value |
| `fee_percent` | `string` | No | Additional fee percentage |
| `fee_value` | `string` | No | Additional fee value |

#### `OrderDeliveryDto`
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `customer_name` | `string` | Yes | Name of the recipient |
| `contact_phone` | `string` | Yes | Contact phone number |
| `shipping_address`| `string` | Yes | Full delivery address |
| `city` | `string` | Yes | City |
| `postal_code` | `string` | Yes | Postal/Zip code |
| `country` | `string` | No | Country (Default: "USA") |
| `estimated_arrival`| `ISO Date` | No | Estimated delivery time |

---

## 2. Update Order

**Endpoint:** `POST /orders/update/:id`  
**Authentication:** Bearer Token required  
**Allowed Roles:** `OWNER`, `ADMIN`

This endpoint allows partial updates. For related collections (`items`, `discounts`, `taxes`), providing the array will **replace** the entire existing collection for that order.

### Request Body (`UpdateOrderDto`)
All fields from `CreateOrderDto` are optional here. Additionally includes:

| Field | Type | Description |
| :--- | :--- | :--- |
| `is_voided` | `boolean` | Mark order as voided |
| `is_refunded` | `boolean` | Mark order as refunded |

---

## 3. Other Endpoints

### Get All Orders
**Endpoint:** `GET /orders/all`

### Get Order by ID
**Endpoint:** `GET /orders/:id`

### Delete (Soft) Order
**Endpoint:** `DELETE /orders/delete/:id`
