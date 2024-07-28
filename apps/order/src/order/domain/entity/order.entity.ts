import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
    order_status;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
