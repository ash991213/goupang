import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '@apps/order/src/order/domain/entity';

@Entity('order_shipment')
export class OrderShipment {
    @PrimaryGeneratedColumn()
    order_shipment_id: number;

    @Column({ type: 'int', nullable: false })
    order_id: number;

    @Column({ type: 'int', nullable: false })
    shipment_id: number;

    @Column({ type: 'varchar', length: 400, nullable: false })
    shipment_address: string;

    @Column({ type: 'varchar', length: 300, nullable: true, comment: '실패인 경우 사유 작성' })
    shipment_message: string | null;

    @Column({ type: 'varchar', length: 128, nullable: true, comment: '배송 시스템 처리 번호' })
    shipment_transaction_id: string | null;

    @ManyToOne(() => Order, (order) => order.orderShipments)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
