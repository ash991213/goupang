import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PAYMENT_STATUS } from '@apps/payment/src/payment/domain/enum/payment.enum';

@Entity({ name: 'payment' })
export class PaymentEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '결제 기본키' })
    payment_id: number;

    @Column({ type: 'int', comment: '회원 기본키', nullable: false })
    user_id: number;

    @Column({ type: 'int', comment: '점주 기본키', nullable: false })
    host_id: number;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    payment_date: Date;

    @Column({ type: 'decimal', comment: '결제 가격', nullable: false })
    payment_price: number;

    @Column({ type: 'enum', comment: '결제 상태', nullable: false })
    payment_status: PAYMENT_STATUS;

    @Column({ type: 'varchar', comment: '결제 메시지', length: 300, default: null, nullable: true })
    payment_message: string;

    @Column({ type: 'varchar', comment: '결제 ID', length: 128, default: null, nullable: true })
    payment_transaction_id: string;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
