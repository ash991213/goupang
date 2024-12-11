import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '@apps/order/src/order/domain/entity';

@Entity('order_payment')
export class OrderPayment {
    @PrimaryGeneratedColumn()
    order_payment_id: number;

    @Column({ type: 'int', nullable: false })
    order_id: number;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'int', nullable: false })
    host_id: number;

    @Column({ type: 'datetime', default: () => 'NOW()', nullable: false })
    payment_date: Date;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
    payment_price: number;

    @Column({ type: 'varchar', length: 300, nullable: true, comment: '실패인 경우 사유 작성' })
    payment_message: string | null;

    @Column({ type: 'varchar', length: 128, nullable: true, comment: '결제 시스템 처리 번호' })
    payment_transaction_id: string | null;

    @ManyToOne(() => Order, (order) => order.orderPayments)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
