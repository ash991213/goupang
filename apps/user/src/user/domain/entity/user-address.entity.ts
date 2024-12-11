import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@apps/user/src/user/domain/entity/user.entity';

@Entity('user_address')
export class UserAddress {
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'varchar', length: 400, nullable: false })
    address: string;

    @Column({ type: 'boolean', default: false, nullable: false })
    is_default: boolean;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.addresses, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
