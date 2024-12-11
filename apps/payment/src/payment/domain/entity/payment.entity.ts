import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PAYMENT_STATUS } from '@apps/payment/src/payment/domain/enum/payment.enum';

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn()
    payment_id: number;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'int', nullable: false })
    host_id: number;

    @Column({ type: 'datetime', default: () => 'NOW()', nullable: false })
    payment_date: Date;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
    payment_price: number;

    @Column({
        type: 'enum',
        enum: PAYMENT_STATUS,
        default: PAYMENT_STATUS.PENDING,
        nullable: false,
    })
    payment_status: PAYMENT_STATUS;

    @Column({ type: 'varchar', length: 300, nullable: true, comment: '실패인 경우 사유 작성' })
    payment_message: string | null;

    @Column({ type: 'varchar', length: 128, nullable: true, comment: '결제 시스템 처리 번호' })
    payment_transaction_id: string | null;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;
}
