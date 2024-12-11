import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '@apps/order/src/order/domain/entity';

@Entity('order_address')
export class OrderAddress {
    @PrimaryGeneratedColumn()
    order_address_id: number;

    @Column({ type: 'int', nullable: false })
    order_id: number;

    @Column({ type: 'int', nullable: false })
    address_id: number;

    @Column({ type: 'varchar', length: 400, nullable: false })
    address: string;

    @ManyToOne(() => Order, (order) => order.orderAddresses)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
