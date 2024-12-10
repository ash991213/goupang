import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { UserAddress } from '@apps/user/src/user/domain/entity/user-address.entity';

@Entity('user')
@Unique(['login_id'])
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 320, nullable: false })
    login_id: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    user_name: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => UserAddress, (address) => address.user)
    addresses: UserAddress[];
}
