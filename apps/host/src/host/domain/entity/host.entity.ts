import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity('host')
@Unique(['login_id'])
export class Host {
    @PrimaryGeneratedColumn()
    host_id: number;

    @Column({ type: 'varchar', length: 320, nullable: false })
    login_id: string;

    @Column({ type: 'varchar', length: 60, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    host_name: string;

    @Column({ type: 'varchar', length: 400, nullable: false })
    host_address: string;

    @Column({ type: 'varchar', length: 320, nullable: true })
    host_email: string | null;

    @Column({ type: 'varchar', length: 20, nullable: true })
    host_phone: string | null;

    @Column({ type: 'varchar', length: 2083, nullable: true })
    host_website: string | null;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;
}
