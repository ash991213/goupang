import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'shipment' })
export class ShipmentEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '배송 기본키' })
    shipment_id: number;

    @Column({ type: 'varchar', comment: '배송지 주소', length: 400, nullable: false })
    shipment_address: string;

    @Column({ type: 'enum', comment: '배송 상태', nullable: false })
    shipment_status;

    @Column({ type: 'varchar', comment: '배송지 실패 시 사유', length: 300, default: null, nullable: true })
    shipment_message: string;

    @Column({ type: 'varchar', comment: '배송 ID', length: 128, default: null, nullable: true })
    shipment_transaction_id: string;

    @CreateDateColumn({ type: 'datetime', comment: '배송 완료 날짜', default: null, nullable: true })
    shipped_date: Date;

    @CreateDateColumn({ type: 'datetime', comment: '예상 배송 날짜', default: null, nullable: true })
    expected_delivery_date: Date;

    @CreateDateColumn({ type: 'datetime', comment: '실제 배송 날짜', default: null, nullable: true })
    actual_delivery_date: Date;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
