import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ORDER_STATUS } from '@apps/order/src/order/domain/enum/order.enum';

import { OrderAddressEntity, OrderProductEntity, OrderPaymentEntity, OrderShipmentEntity } from '@apps/order/src/order/domain/entity';

@Entity({ name: 'order' })
export class OrderEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '주문 기본키' })
    order_id: number;

    @Column({ type: 'int', comment: '회원 기본키', nullable: false })
    user_id: number;

    @Column({ type: 'int', comment: '결제 기본키', nullable: false })
    payment_id: number;

    @Column({ type: 'int', comment: '배송 기본키', nullable: false })
    shipment_id: number;

    @CreateDateColumn({ type: 'datetime', comment: '주문 날짜', nullable: false })
    order_date: Date;

    @Column({ type: 'decimal', comment: '총 주문 금액', nullable: false })
    order_price: number;

    @Column({ type: 'enum', comment: '주문 상태', nullable: false })
    order_status: ORDER_STATUS;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;

    @OneToMany(() => OrderAddressEntity, (orderAddress) => orderAddress.order_entity)
    order_address_entity: OrderAddressEntity[];

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order_entity)
    order_product_entity: OrderProductEntity[];

    @OneToMany(() => OrderPaymentEntity, (orderPayment) => orderPayment.order_entity)
    order_payment_entity: OrderPaymentEntity[];

    @OneToMany(() => OrderShipmentEntity, (orderShipment) => orderShipment.order_entity)
    order_shipment_entity: OrderShipmentEntity[];
}
