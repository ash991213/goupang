import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '@apps/product/src/product/domain/entity/product.entity';
import { REVIEW_STATUS } from '@apps/product/src/product/domain/enum/product.enum';

@Entity('product_review')
export class ProductReview {
    @PrimaryGeneratedColumn()
    review_id: number;

    @Column({ type: 'int', nullable: false })
    product_id: number;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'varchar', length: 30, nullable: false })
    review_title: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    review_content: string | null;

    @Column({
        type: 'int',
        default: 0,
        nullable: false,
        comment: '1 ~ 5 까지 정수',
    })
    review_score: number;

    @Column({
        type: 'enum',
        enum: REVIEW_STATUS,
        default: REVIEW_STATUS.ACTIVE,
        nullable: false,
    })
    review_status: REVIEW_STATUS;

    @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'NOW()', onUpdate: 'NOW()' })
    updated_at: Date;

    @ManyToOne(() => Product, (product) => product.reviews)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    constructor(product_id: number, user_id: number, review_title: string, review_content: string, review_score: number) {
        this.product_id = product_id;
        this.user_id = user_id;
        this.review_title = review_title;
        this.review_content = review_content;
        this.review_score = review_score;
    }
}
