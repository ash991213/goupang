import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'host' })
export class HostEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '점주 기본키' })
    host_id: number;

    @Column({ type: 'varchar', comment: '점주 ID', length: 320, nullable: false })
    login_id: string;

    @Column({ type: 'varchar', comment: '점주 PW', length: 60, nullable: false })
    password: string;

    @Column({ type: 'varchar', comment: '점주 이름', length: 100, nullable: false })
    host_name: string;

    @Column({ type: 'varchar', comment: '점주 주소', length: 400, nullable: false })
    host_address: string;

    @Column({ type: 'varchar', comment: '점주 이메일', length: 320, nullable: true })
    host_email: string;

    @Column({ type: 'varchar', comment: '점주 핸드폰 번호', length: 20, nullable: true })
    host_phone: string;

    @Column({ type: 'varchar', comment: '점주 사이트 주소', length: 2083, nullable: true })
    host_website: string;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
