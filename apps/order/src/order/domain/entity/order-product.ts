import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '@apps/order/src/order/domain/entity';

@Entity('order_product')
export class OrderProduct {
    @PrimaryGeneratedColumn()
    order_product_id: number;

    @Column({ type: 'int', nullable: false })
    order_id: number;

    @Column({ type: 'int', nullable: false })
    host_id: number;

    @Column({ type: 'int', nullable: false })
    product_id: number;

    @Column({ type: 'varchar', length: 9, nullable: false, comment: 'H${host_id}-P${product_id}, id는 각 3자리, ex: H001-P001' })
    product_sku: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    product_name: string;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
    product_price: number;

    @Column({ type: 'int', default: 0, nullable: false })
    product_quantity: number;

    @ManyToOne(() => Order, (order) => order.orderProducts)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
