"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDto = exports.CreateOrderDto = exports.OrderPaymentDto = exports.OrderDeliveryDto = exports.OrderItemTaxDto = exports.OrderDiscountDto = exports.OrderItemDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class OrderItemDto {
    item_id;
    quantity;
    price;
    subtotal;
    note;
    discount_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { item_id: { required: true, type: () => String }, quantity: { required: true, type: () => String }, price: { required: true, type: () => String }, subtotal: { required: true, type: () => String }, note: { required: false, type: () => String }, discount_id: { required: false, type: () => String } };
    }
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "subtotal", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "discount_id", void 0);
class OrderDiscountDto {
    item_id;
    order_id;
    discount_value;
    discount_percent;
    discount_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { item_id: { required: false, type: () => String }, order_id: { required: false, type: () => String }, discount_value: { required: false, type: () => String }, discount_percent: { required: false, type: () => String }, discount_id: { required: false, type: () => String } };
    }
}
exports.OrderDiscountDto = OrderDiscountDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDiscountDto.prototype, "item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDiscountDto.prototype, "order_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDiscountDto.prototype, "discount_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDiscountDto.prototype, "discount_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDiscountDto.prototype, "discount_id", void 0);
class OrderItemTaxDto {
    item_id;
    tax_id;
    tax_percent;
    tax_value;
    fee_percent;
    fee_value;
    static _OPENAPI_METADATA_FACTORY() {
        return { item_id: { required: false, type: () => String }, tax_id: { required: true, type: () => String }, tax_percent: { required: false, type: () => String }, tax_value: { required: false, type: () => String }, fee_percent: { required: false, type: () => String }, fee_value: { required: false, type: () => String } };
    }
}
exports.OrderItemTaxDto = OrderItemTaxDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemTaxDto.prototype, "item_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderItemTaxDto.prototype, "tax_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemTaxDto.prototype, "tax_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemTaxDto.prototype, "tax_value", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemTaxDto.prototype, "fee_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemTaxDto.prototype, "fee_value", void 0);
class OrderDeliveryDto {
    customer_name;
    contact_phone;
    shipping_address;
    city;
    postal_code;
    country;
    estimated_arrival;
    static _OPENAPI_METADATA_FACTORY() {
        return { customer_name: { required: true, type: () => String }, contact_phone: { required: true, type: () => String }, shipping_address: { required: true, type: () => String }, city: { required: true, type: () => String }, postal_code: { required: true, type: () => String }, country: { required: false, type: () => String }, estimated_arrival: { required: false, type: () => String } };
    }
}
exports.OrderDeliveryDto = OrderDeliveryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDeliveryDto.prototype, "customer_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDeliveryDto.prototype, "contact_phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDeliveryDto.prototype, "shipping_address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDeliveryDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderDeliveryDto.prototype, "postal_code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDeliveryDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderDeliveryDto.prototype, "estimated_arrival", void 0);
class OrderPaymentDto {
    payment_type_id;
    paid_sum;
    tip_amount;
    discount_id;
    payment_data;
    payment_device_id;
    payment_batch_id;
    card_number;
    card_expire_date;
    card_type;
    note;
    label;
    is_refunded;
    settlement_id;
    static _OPENAPI_METADATA_FACTORY() {
        return { payment_type_id: { required: true, type: () => String }, paid_sum: { required: true, type: () => String }, tip_amount: { required: false, type: () => String }, discount_id: { required: false, type: () => String }, payment_data: { required: false, type: () => String }, payment_device_id: { required: false, type: () => String }, payment_batch_id: { required: false, type: () => String }, card_number: { required: false, type: () => String }, card_expire_date: { required: false, type: () => String }, card_type: { required: false, type: () => String }, note: { required: false, type: () => String }, label: { required: false, type: () => String }, is_refunded: { required: false, type: () => Boolean }, settlement_id: { required: false, type: () => String } };
    }
}
exports.OrderPaymentDto = OrderPaymentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "payment_type_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "paid_sum", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "tip_amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "discount_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "payment_data", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "payment_device_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "payment_batch_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "card_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "card_expire_date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "card_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OrderPaymentDto.prototype, "is_refunded", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderPaymentDto.prototype, "settlement_id", void 0);
class CreateOrderDto {
    guid;
    order_id;
    order_name;
    total_discount;
    total_tax;
    total_paid;
    total_change;
    subtotal;
    total_sum;
    discount_percent;
    discount_sum;
    employee_id;
    client_id;
    payment_id;
    automated_point_id;
    workplace_id;
    barcode;
    delivery_fee;
    settlement_id;
    is_closed;
    items;
    discounts;
    taxes;
    delivery;
    payments;
    static _OPENAPI_METADATA_FACTORY() {
        return { guid: { required: false, type: () => String }, order_id: { required: true, type: () => String }, order_name: { required: false, type: () => String }, total_discount: { required: false, type: () => String }, total_tax: { required: false, type: () => String }, total_paid: { required: false, type: () => String }, total_change: { required: false, type: () => String }, subtotal: { required: true, type: () => String }, total_sum: { required: true, type: () => String }, discount_percent: { required: false, type: () => String }, discount_sum: { required: false, type: () => String }, employee_id: { required: false, type: () => String }, client_id: { required: false, type: () => String }, payment_id: { required: false, type: () => String }, automated_point_id: { required: true, type: () => String }, workplace_id: { required: true, type: () => String }, barcode: { required: false, type: () => String }, delivery_fee: { required: false, type: () => String }, settlement_id: { required: false, type: () => String }, is_closed: { required: false, type: () => Boolean }, items: { required: true, type: () => [require("./order.dto").OrderItemDto] }, discounts: { required: false, type: () => [require("./order.dto").OrderDiscountDto] }, taxes: { required: false, type: () => [require("./order.dto").OrderItemTaxDto] }, delivery: { required: false, type: () => require("./order.dto").OrderDeliveryDto }, payments: { required: false, type: () => [require("./order.dto").OrderPaymentDto] } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "guid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "order_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "order_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "total_discount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "total_tax", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "total_paid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "total_change", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "subtotal", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "total_sum", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "discount_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "discount_sum", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "employee_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "client_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "payment_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "automated_point_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "workplace_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "barcode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "delivery_fee", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "settlement_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateOrderDto.prototype, "is_closed", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderDiscountDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "discounts", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemTaxDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "taxes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OrderDeliveryDto),
    __metadata("design:type", OrderDeliveryDto)
], CreateOrderDto.prototype, "delivery", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderPaymentDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "payments", void 0);
class UpdateOrderDto {
    order_name;
    total_discount;
    total_tax;
    total_paid;
    total_change;
    subtotal;
    total_sum;
    discount_percent;
    discount_sum;
    client_id;
    payment_id;
    delivery_fee;
    payment_type_id;
    settlement_id;
    is_closed;
    is_voided;
    is_refunded;
    items;
    discounts;
    taxes;
    delivery;
    payments;
    static _OPENAPI_METADATA_FACTORY() {
        return { order_name: { required: false, type: () => String }, total_discount: { required: false, type: () => String }, total_tax: { required: false, type: () => String }, total_paid: { required: false, type: () => String }, total_change: { required: false, type: () => String }, subtotal: { required: false, type: () => String }, total_sum: { required: false, type: () => String }, discount_percent: { required: false, type: () => String }, discount_sum: { required: false, type: () => String }, client_id: { required: false, type: () => String }, payment_id: { required: false, type: () => String }, delivery_fee: { required: false, type: () => String }, payment_type_id: { required: false, type: () => String }, settlement_id: { required: false, type: () => String }, is_closed: { required: false, type: () => Boolean }, is_voided: { required: false, type: () => Boolean }, is_refunded: { required: false, type: () => Boolean }, items: { required: false, type: () => [require("./order.dto").OrderItemDto] }, discounts: { required: false, type: () => [require("./order.dto").OrderDiscountDto] }, taxes: { required: false, type: () => [require("./order.dto").OrderItemTaxDto] }, delivery: { required: false, type: () => require("./order.dto").OrderDeliveryDto }, payments: { required: false, type: () => [require("./order.dto").OrderPaymentDto] } };
    }
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "order_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "total_discount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "total_tax", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "total_paid", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "total_change", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "subtotal", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "total_sum", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "discount_percent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "discount_sum", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "client_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "payment_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "delivery_fee", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "payment_type_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "settlement_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateOrderDto.prototype, "is_closed", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateOrderDto.prototype, "is_voided", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateOrderDto.prototype, "is_refunded", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderDiscountDto),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "discounts", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemTaxDto),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "taxes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OrderDeliveryDto),
    __metadata("design:type", OrderDeliveryDto)
], UpdateOrderDto.prototype, "delivery", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderPaymentDto),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "payments", void 0);
//# sourceMappingURL=order.dto.js.map