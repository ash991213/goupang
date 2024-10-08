import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { NOTIFICATION_CHANNEL, NOTIFICATION_STATUS, NOTIFICATION_TYPE, RECIPIENT_TYPE } from '@apps/noti/src/noti/domain/enum/noti.enum';

@Entity({ name: 'notification' })
export class NotiEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '알림 기본키' })
    noti_id: number;

    @Column({ type: 'varchar', comment: '받는 회원 타입', default: null, nullable: true })
    recipient_type: RECIPIENT_TYPE;

    @Column({ type: 'bool', comment: '전체 전송 여부', default: null, nullable: true })
    recipient_is_all: boolean;

    @Column({ type: 'int', comment: '받는 ID', default: null, nullable: true })
    recipient_id: number;

    @Column({ type: 'enum', comment: '알림 채널', nullable: false })
    notification_channel: NOTIFICATION_CHANNEL;

    @Column({ type: 'enum', comment: '알림 타입', nullable: false })
    notification_type: NOTIFICATION_TYPE;

    @Column({ type: 'text', comment: '알림 내용', nullable: false })
    notification_content: string;

    @Column({ type: 'enum', comment: '알림 상태', nullable: false })
    notification_status: NOTIFICATION_STATUS;

    @Column({ type: 'varchar', comment: '알림 실패 시 사유', length: 300, default: null, nullable: true })
    notification_message: string;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
