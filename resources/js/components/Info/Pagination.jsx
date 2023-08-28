import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisiblePages = 3; // 最大表示ページ数

    const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <ul className="pagination">
            <li onClick={() => handlePageClick(currentPage - 1)}>前へ</li>
            {[...Array(endPage - startPage + 1)].map((_, index) => (
                <li
                    key={startPage + index}
                    onClick={() => handlePageClick(startPage + index)}
                    className={currentPage === startPage + index ? 'active' : ''}
                >
                    {startPage + index}
                </li>
            ))}
            <li onClick={() => handlePageClick(currentPage + 1)}>次へ</li>
        </ul>
    );
};

export default Pagination;
