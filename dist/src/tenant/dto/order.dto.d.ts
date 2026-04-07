export declare class OrderItemDto {
    item_id: string;
    quantity: string;
    price: string;
    subtotal: string;
    note?: string;
    discount_id?: string;
}
export declare class OrderDiscountDto {
    item_id?: string;
    order_id?: string;
    discount_value?: string;
    discount_percent?: string;
    discount_id?: string;
}
export declare class OrderItemTaxDto {
    item_id?: string;
    tax_id: string;
    tax_percent?: string;
    tax_value?: string;
    fee_percent?: string;
    fee_value?: string;
}
export declare class OrderDeliveryDto {
    customer_name: string;
    contact_phone: string;
    shipping_address: string;
    city: string;
    postal_code: string;
    country?: string;
    estimated_arrival?: string;
}
export declare class OrderPaymentDto {
    payment_type_id: string;
    paid_sum: string;
    tip_amount?: string;
    discount_id?: string;
    payment_data?: string;
    payment_device_id?: string;
    payment_batch_id?: string;
    card_number?: string;
    card_expire_date?: string;
    card_type?: string;
    note?: string;
    label?: string;
    is_refunded?: boolean;
    settlement_id?: string;
}
export declare class CreateOrderDto {
    guid?: string;
    order_id: string;
    order_name?: string;
    total_discount?: string;
    total_tax?: string;
    total_paid?: string;
    total_change?: string;
    subtotal: string;
    total_sum: string;
    discount_percent?: string;
    discount_sum?: string;
    employee_id?: string;
    client_id?: string;
    payment_id?: string;
    automated_point_id: string;
    workplace_id: string;
    barcode?: string;
    delivery_fee?: string;
    settlement_id?: string;
    is_closed?: boolean;
    items: OrderItemDto[];
    discounts?: OrderDiscountDto[];
    taxes?: OrderItemTaxDto[];
    delivery?: OrderDeliveryDto;
    payments?: OrderPaymentDto[];
}
export declare class UpdateOrderDto {
    order_name?: string;
    total_discount?: string;
    total_tax?: string;
    total_paid?: string;
    total_change?: string;
    subtotal?: string;
    total_sum?: string;
    discount_percent?: string;
    discount_sum?: string;
    client_id?: string;
    payment_id?: string;
    delivery_fee?: string;
    payment_type_id?: string;
    settlement_id?: string;
    is_closed?: boolean;
    is_voided?: boolean;
    is_refunded?: boolean;
    items?: OrderItemDto[];
    discounts?: OrderDiscountDto[];
    taxes?: OrderItemTaxDto[];
    delivery?: OrderDeliveryDto;
    payments?: OrderPaymentDto[];
}
