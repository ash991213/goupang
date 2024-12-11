import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderAddress, OrderProduct, OrderPayment, OrderShipment } from '@apps/order/src/order/domain/entity';
import { ORDER_STATUS } from '@apps/order/src/order/domain/enum/order.enum';

@Entity('order')
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'int', nullable: false })
    payment_id: number;

    @Column({ type: 'int', nullable: false })
    shipment_id: number;

    @Column({ type: 'datetime', default: () => 'NOW()', nullable: false })
    order_date: Date;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
    order_price: number;

    @Column({
        type: 'enum',
        enum: ORDER_STATUS,
        default: ORDER_STATUS.PENDING,
        nullable: false,
    })
    order_status: ORDER_STATUS;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;

    @OneToMany(() => OrderAddress, (orderAddress) => orderAddress.order)
    orderAddresses: OrderAddress[];

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[];

    @OneToMany(() => OrderPayment, (orderPayment) => orderPayment.order)
    orderPayments: OrderPayment[];

    @OneToMany(() => OrderShipment, (orderShipment) => orderShipment.order)
    orderShipments: OrderShipment[];
}
