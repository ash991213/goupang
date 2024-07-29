import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_product' })
export class OrderProductEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '주문 상품 기본키' })
    order_product_id: number;

    @Column({ type: 'int', comment: '주문 기본키', nullable: false })
    order_id: number;

    @Column({ type: 'int', comment: '점주 기본키', nullable: false })
    host_id: number;

    @Column({ type: 'int', comment: '상품 기본키', nullable: false })
    product_id: number;

    @Column({ type: 'varchar', comment: '상품 식별 코드', length: 9, nullable: false })
    product_sku: string;

    @Column({ type: 'varchar', comment: '상품 이름', length: 100, nullable: false })
    product_name: string;

    @Column({ type: 'decimal', comment: '상품 가격', nullable: false })
    product_price: number;

    @Column({ type: 'int', comment: '상품 수량', nullable: false })
    product_quantity: number;
}
