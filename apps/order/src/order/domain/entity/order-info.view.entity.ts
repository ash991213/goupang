import { DataSource, ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    name: 'view_order_info',
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select('order.order_id', 'order_id')
            .addSelect('order.order_date', 'order_date')
            .addSelect('order.order_price', 'order_price')
            .addSelect('order.order_status', 'order_status')
            .addSelect('order_address.address', 'order_address')
            .addSelect('order_product.product_sku', 'product_sku')
            .addSelect('order_product.product_name', 'product_name')
            .addSelect('order_product.product_price', 'product_price')
            .addSelect('order_product.product_quantity', 'product_quantity')
            .addSelect('order_payment.payment_date', 'payment_date')
            .addSelect('order_payment.payment_price', 'payment_price')
            .addSelect('order_payment.payment_message', 'payment_message')
            .addSelect('order_payment.payment_transaction_id', 'payment_transaction_id')
            .addSelect('order_shipment.shipment_address', 'shipment_address')
            .addSelect('order_shipment.shipment_message', 'shipment_message')
            .addSelect('order_shipment.shipment_transaction_id', 'shipment_transaction_id')
            .from('order', 'order')
            .leftJoin('order_address', 'order_address', 'order.order_id = order_address.order_id')
            .leftJoin('order_product', 'order_product', 'order.order_id = order_product.order_id')
            .leftJoin('order_payment', 'order_payment', 'order.order_id = order_payment.order_id')
            .leftJoin('order_shipment', 'order_shipment', 'order.order_id = order_shipment.order_id'),
})
export class ViewOrderInfoEntity {
    @ViewColumn({ name: 'order_id' })
    order_id: number;

    @ViewColumn({ name: 'order_date' })
    order_date: Date;

    @ViewColumn({ name: 'order_price' })
    order_price: number;

    @ViewColumn({ name: 'order_status' })
    order_status: string;

    @ViewColumn({ name: 'order_address' })
    order_address: string;

    @ViewColumn({ name: 'product_sku' })
    product_sku: string;

    @ViewColumn({ name: 'product_name' })
    product_name: string;

    @ViewColumn({ name: 'product_price' })
    product_price: number;

    @ViewColumn({ name: 'product_quantity' })
    product_quantity: number;

    @ViewColumn({ name: 'payment_date' })
    payment_date: Date;

    @ViewColumn({ name: 'payment_price' })
    payment_price: number;

    @ViewColumn({ name: 'payment_message' })
    payment_message: string;

    @ViewColumn({ name: 'payment_transaction_id' })
    payment_transaction_id: string;

    @ViewColumn({ name: 'shipment_address' })
    shipment_address: string;

    @ViewColumn({ name: 'shipment_message' })
    shipment_message: string;

    @ViewColumn({ name: 'shipment_transaction_id' })
    shipment_transaction_id: string;
}
