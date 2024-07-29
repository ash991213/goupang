import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from '@apps/order/src/order/domain/entity';

@Entity({ name: 'order_shipment' })
export class OrderShipmentEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '주문 배송 기본키' })
    order_shipment_id: number;

    @Column({ type: 'int', comment: '주문 기본키', nullable: false })
    order_id: number;

    @Column({ type: 'int', comment: '배송 기본키', nullable: false })
    shipment_id: number;

    @Column({ type: 'varchar', comment: '배송지 주소', length: 400, nullable: false })
    shipment_address: string;

    @Column({ type: 'varchar', comment: '배송지 실패 시 사유', length: 300, default: null, nullable: true })
    shipment_message: string;

    @Column({ type: 'varchar', comment: '배송 ID', length: 128, default: null, nullable: true })
    shipment_transaction_id: string;

    @ManyToOne(() => OrderEntity, (order) => order.order_shipment_entity)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' })
    order_entity: OrderEntity;
}
