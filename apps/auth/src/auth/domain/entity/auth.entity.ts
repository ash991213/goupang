import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AUTH_ROLE } from '@apps/auth/src/auth/domain/enum/auth.enum';

@Entity('auth')
export class Auth {
    @PrimaryGeneratedColumn()
    auth_id: number;

    @Column({ type: 'enum', enum: AUTH_ROLE, nullable: false })
    auth_role: AUTH_ROLE;

    @Column({ type: 'int', nullable: true })
    user_id: number;

    @Column({ type: 'int', nullable: true })
    host_id: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    refresh_token: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;
}
