import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PRODUCT_STATUS } from '@apps/product/src/product/domain/enum/product.enum';

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '상품 기본키' })
    product_id: number;

    @Column({ type: 'int', comment: '호스트 기본키', nullable: false })
    host_id: number;

    @Column({ type: 'varchar', comment: '상품 식별 코드', length: 9, nullable: false })
    product_sku: string;

    @Column({ type: 'varchar', comment: '상품 이름', length: 100, nullable: false })
    product_name: string;

    @Column({ type: 'text', comment: '상품 정보', nullable: true })
    product_content: string;

    @Column({ type: 'decimal', comment: '상품 가격', nullable: false })
    product_price: number;

    @Column({ type: 'int', comment: '상품 재고', nullable: false })
    product_stock: string;

    @Column({ type: 'enum', comment: '상품 상태', nullable: false })
    product_status: PRODUCT_STATUS;

    @Column({ type: 'int', comment: '상품 리뷰 수', nullable: false })
    review_count: number;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
