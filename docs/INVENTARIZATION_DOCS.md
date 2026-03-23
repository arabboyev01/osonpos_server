# Inventarization API Documentation

This documentation provides details for the newly implemented inventarization endpoints in the `OsonPOS` system. All endpoints require **JWT Bearer Authentication** and follow the tenant-based architecture.

## Base URL
`/api/tenant/...` (Standard tenant-based prefix)

## Endpoints Overview

- `/inventory`
- `/receipt`
- `/write-off` (Cancellation)
- `/warehouses`
- `/suppliers`
- `/movement`
- `/stock-quantity`

---

## 1. Inventory (/inventory)
Used for physical inventory counts (Stock take).

### Create Inventory
- **Method:** `POST`
- **Path:** `/inventory/create`
- **Body:**
```json
{
  "name": "Periodic Inventory March",
  "warehouseId": ["warehouse-id-1"],
  "organizationId": "org-id",
  "total": "1000",
  "totalPlanned": "950",
  "totalDiff": "50",
  "employeeId": "emp-id",
  "clientId": "supplier-or-client-id",
  "conducted": true,
  "items": [
    {
      "itemId": "item-uuid",
      "quantity": "50",
      "price": "20.00",
      "plannedQuantity": "45",
      "measureId": "measure-uuid"
    }
  ]
}
```
*Note: If `conducted` is true, stock list quantities are overwritten (REPLACED) by the quantities in the inventory.*

### List All
- **Method:** `GET`
- **Path:** `/inventory/all`

### Get By ID
- **Method:** `GET`
- **Path:** `/inventory/:id`

### Soft Delete
- **Method:** `DELETE`
- **Path:** `/inventory/delete/:id`

---

## 2. Receipt (/receipt)
Used for receiving stock from suppliers.

### Create Receipt
- **Method:** `POST`
- **Path:** `/receipt/create`
- **Body:**
```json
{
  "name": "Monday Delivery",
  "warehouseId": ["warehouse-id-1"],
  "organizationId": "org-id",
  "total": "5000",
  "employeeId": "emp-id",
  "clientId": "supplier-id",
  "conducted": true,
  "items": [
    {
      "itemId": "item-uuid",
      "quantity": "100",
      "price": "50.00",
      "plannedQuantity": "100",
      "measureId": "measure-uuid"
    }
  ]
}
```
*Note: If `conducted` is true, stock list quantities are increased (ADD).*

---

## 3. Write-off (/write-off)
Used for cancelling or removing damaged/missing stock.

### Create Write-off
- **Method:** `POST`
- **Path:** `/write-off/create`
- **Body:**
```json
{
  "name": "Damaged Goods",
  "warehouseId": ["warehouse-id-1"],
  "organizationId": "org-id",
  "employeeId": "emp-id",
  "conducted": true,
  "items": [
    {
      "itemId": "item-uuid",
      "quantity": "5",
      "price": "50.00",
      "measureId": "measure-uuid"
    }
  ]
}
```
*Note: If `conducted` is true, stock list quantities are decreased (SUBTRACT).*

---

## 4. Movement (/movement)
Used for transferring stock between warehouses.

### Create Movement
- **Method:** `POST`
- **Path:** `/movement/create`
- **Body:**
```json
{
  "name": "Transfer to Store A",
  "warehouseId": "warehouse-source-id",
  "toWarehouseId": "warehouse-dest-id",
  "organizationId": "org-id",
  "employeeId": "emp-id",
  "items": [
    {
      "itemId": "item-uuid",
      "quantity": "20",
      "price": "50.00",
      "measureId": "measure-uuid"
    }
  ]
}
```
*Note: This subtracts from the source warehouse and adds to the destination warehouse.*

---

## 5. Warehouses (/warehouses)
Manage storage locations.

- `POST /warehouses/create`: Create a warehouse.
- `GET /warehouses/all`: List all warehouses.
- `GET /warehouses/:id`: Get warehouse details.
- `PATCH /warehouses/update/:id`: Update warehouse info.
- `DELETE /warehouses/delete/:id`: Soft delete warehouse.

---

## 6. Suppliers (/suppliers)
Manage external suppliers.

- `POST /suppliers/create`: Create a supplier.
- `GET /suppliers/all`: List all suppliers.
- `GET /suppliers/:id`: Get supplier details.
- `PATCH /suppliers/update/:id`: Update supplier info.
- `DELETE /suppliers/delete/:id`: Soft delete supplier.

---

## 7. Stock Quantity (/stock-quantity)
View and manage the calculated stock levels.

- `GET /stock-quantity/all`: View all stock records.
- `GET /stock-quantity/:id`: View specific stock record.
- `PATCH /stock-quantity/update/:id`: Manually adjust stock record.
- `DELETE /stock-quantity/delete/:id`: Delete stock record.

---

## Implementation Notes
- **Soft Delete:** All `DELETE` operations set `is_deleted = true`.
- **Stock Updates:** Stock updates occur automatically when `conducted` is true for Inventory, Receipt, or Write-off, and always for Movement.
- **Data Types:** All quantities and prices are stored as `String` in the database, but parsed to `Float` for calculation and then converted back.
