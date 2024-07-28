import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '회원 기본키' })
    user_id: number;

    @Column({ type: 'varchar', comment: '회원 ID', length: 320, nullable: false })
    login_id: string;

    @Column({ type: 'varchar', comment: '회원 PW', length: 60, nullable: false })
    password: string;

    @Column({ type: 'varchar', comment: '회원 이름', length: 100, nullable: false })
    user_name: string;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
