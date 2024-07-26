import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'product_review' })
export class ProductReviewEntity {
    @PrimaryGeneratedColumn({ type: 'int', comment: '상품 리뷰 기본키' })
    review_id: number;

    @Column({ type: 'int', comment: '상품 기본키', nullable: false })
    product_id: number;

    @Column({ type: 'int', comment: '회원 기본키', nullable: false })
    user_id: number;

    @Column({ type: 'varchar', comment: '리뷰 제목', length: 30, nullable: false })
    review_title: string;

    @Column({ type: 'varchar', comment: '리뷰 내용', length: 100, nullable: true })
    review_content: string;

    @Column({ type: 'int', comment: '리뷰 점수', nullable: false })
    review_score: number;

    @Column({ type: 'enum', comment: '리뷰 상태', nullable: false })
    review_status;

    @CreateDateColumn({ type: 'datetime', comment: '생성 시간', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', comment: '변경 시간', nullable: false })
    updated_at: Date;
}
