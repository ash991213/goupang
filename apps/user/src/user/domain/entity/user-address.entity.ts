import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user_address' })
export class UserAddressEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '회원 주소 기본키' })
    address_id: number;

    @Column({ type: 'int', comment: '회원 기본키', nullable: false })
    user_id: number;

    @Column({ type: 'varchar', comment: '회원 주소', length: 400, nullable: false })
    address: string;

    @Column({ type: 'bool', comment: '기본값 설정 여부', default: false, nullable: false })
    is_default: boolean;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
