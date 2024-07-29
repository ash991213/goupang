import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from '@apps/order/src/order/domain/entity';

@Entity({ name: 'order_payment' })
export class OrderPaymentEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '주문 결제 기본키' })
    order_payment_id: number;

    @Column({ type: 'int', comment: '주문 기본키', nullable: false })
    order_id: number;

    @Column({ type: 'int', comment: '회원 기본키', nullable: false })
    user_id: number;

    @Column({ type: 'int', comment: '점주 기본키', nullable: false })
    host_id: number;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    payment_date: Date;

    @Column({ type: 'decimal', comment: '결제 가격', nullable: false })
    payment_price: number;

    @Column({ type: 'varchar', comment: '결제 실패 시 사유', length: 300, default: null, nullable: true })
    payment_message: string;

    @Column({ type: 'varchar', comment: '결제 ID', length: 128, default: null, nullable: true })
    payment_transaction_id: string;

    @ManyToOne(() => OrderEntity, (order) => order.order_payment_entity)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'order_id' })
    order_entity: OrderEntity;
}
