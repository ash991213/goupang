import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { NOTIFICATION_CHANNEL, NOTIFICATION_STATUS, NOTIFICATION_TYPE, RECIPIENT_TYPE } from '@apps/noti/src/noti/domain/enum/noti.enum';

@Entity('notification')
export class Notification {
    @PrimaryGeneratedColumn()
    notification_id: number;

    @Column({ type: 'enum', enum: RECIPIENT_TYPE, nullable: true })
    recipient_type: RECIPIENT_TYPE | null;

    @Column({ type: 'boolean', default: false, nullable: false })
    recipient_is_all: boolean;

    @Column({ type: 'int', nullable: true })
    recipient_id: number | null;

    @Column({ type: 'enum', enum: NOTIFICATION_CHANNEL, nullable: false })
    notification_channel: NOTIFICATION_CHANNEL;

    @Column({ type: 'enum', enum: NOTIFICATION_TYPE, default: NOTIFICATION_TYPE.ETC, nullable: false })
    notification_type: NOTIFICATION_TYPE;

    @Column({ type: 'text', nullable: false })
    notification_content: string;

    @Column({ type: 'enum', enum: NOTIFICATION_STATUS, default: NOTIFICATION_STATUS.PENDING, nullable: false })
    notification_status: NOTIFICATION_STATUS;

    @Column({ type: 'varchar', length: 300, nullable: true })
    notification_message: string | null;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updatedAt: Date;
}
