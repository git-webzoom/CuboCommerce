
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Adjust as needed

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Logic to show ranges with dots (simplified for now)
            // Always show first, last, and window around current
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                if (totalPages > 5) pages.push(-1); // -1 represents dots
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                if (totalPages > 5) pages.push(-1);
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push(-1);
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push(-1);
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className={styles.pagination}>
            <button
                className={styles.pageBtn}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={16} />
                <span className={styles.hideMobile}>Anterior</span>
            </button>

            {/* Desktop View */}
            <div className={styles.desktopPagination}>
                {pages.map((page, index) => (
                    page === -1 ? (
                        <span key={`dots-${index}`} className={styles.dots}>...</span>
                    ) : (
                        <button
                            key={page}
                            className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}
            </div>

            {/* Mobile View */}
            <div className={styles.mobilePagination}>
                <button className={`${styles.pageBtn} ${styles.active}`}>{currentPage}</button>
                <span className={styles.dots}>/</span>
                <button className={styles.pageBtn} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
            </div>

            <button
                className={styles.pageBtn}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                <span className={styles.hideMobile}>Próximo</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};
