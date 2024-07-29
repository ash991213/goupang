import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from '@apps/order/src/order/domain/entity';

@Entity({ name: 'order_address' })
export class OrderAddressEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '주문 주소 기본키' })
    order_address_id: number;

    @Column({ type: 'int', comment: '주문 기본키', nullable: false })
    order_id: number;

    @Column({ type: 'int', comment: '주소 기본키', nullable: false })
    address_id: number;

    @Column({ type: 'varchar', comment: '주문 주소', length: 400, nullable: false })
    address: string;

    @ManyToOne(() => OrderEntity, (order) => order.order_address_entity)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' })
    order_entity: OrderEntity;
}
