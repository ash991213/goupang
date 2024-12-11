import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductReview } from '@apps/product/src/product/domain/entity/product-review.entity';
import { PRODUCT_STATUS } from '@apps/product/src/product/domain/enum/product.enum';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column({ type: 'int', nullable: false })
    host_id: number;

    @Column({
        type: 'varchar',
        length: 9,
        nullable: false,
        comment: 'H${host_id}-P${product_id}, id는 각 3자리, ex: H001-P001',
    })
    product_sku: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    product_name: string;

    @Column({ type: 'text', nullable: false })
    product_content: string;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0, nullable: false })
    product_price: number;

    @Column({ type: 'int', default: 0, nullable: false })
    product_stock: number;

    @Column({
        type: 'enum',
        enum: PRODUCT_STATUS,
        default: PRODUCT_STATUS.ACTIVE,
        nullable: false,
    })
    product_status: PRODUCT_STATUS;

    @Column({ type: 'int', default: 0, nullable: false })
    review_count: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;

    @OneToMany(() => ProductReview, (review) => review.product)
    reviews: ProductReview[];
}
