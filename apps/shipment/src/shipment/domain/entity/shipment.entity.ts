import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SHIPMENT_STATUS } from '@apps/shipment/src/shipment/domain/enum/shipment.enum';

@Entity('shipment')
export class Shipment {
    @PrimaryGeneratedColumn()
    shipment_id: number;

    @Column({ type: 'varchar', length: 400, nullable: false })
    shipment_address: string;

    @Column({
        type: 'enum',
        enum: SHIPMENT_STATUS,
        default: SHIPMENT_STATUS.PROCESSING,
        nullable: false,
        comment: 'processing: 배송 준비중, shipped: 발송함, delivered: 받음, cancelled: 배송 취소, returned: 반품',
    })
    shipment_status: SHIPMENT_STATUS;

    @Column({ type: 'varchar', length: 300, nullable: true, comment: '실패인 경우 사유 작성' })
    shipment_message: string | null;

    @Column({ type: 'varchar', length: 128, nullable: true, comment: '배송 시스템 처리 번호' })
    shipment_transaction_id: string | null;

    @Column({ type: 'datetime', nullable: true })
    shipped_date: Date | null;

    @Column({ type: 'datetime', nullable: true })
    expected_delivery_date: Date | null;

    @Column({ type: 'datetime', nullable: true })
    actual_delivery_date: Date | null;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;
}
