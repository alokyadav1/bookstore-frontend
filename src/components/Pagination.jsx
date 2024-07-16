/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Book from './admin/Book'
import { FcNext, FcPrevious } from 'react-icons/fc'
import styles from "./pagination.module.css"

function Pagination({ books, filter=null, handleEdit, handleRemove }) {

    const filteredBooks = books?.filter(book =>
        (filter?.category === '' || book.category.includes(filter?.category)) &&
        book.price >= filter?.priceRange[0] && book.price <= filter?.priceRange[1] &&
        (book.title.toLowerCase().includes(filter?.searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(filter?.searchQuery.toLowerCase()))
      );

      console.log("filterBooks: ", filteredBooks);
    const [currentPage, setCurrentPage] = useState(0)
    const PER_PAGE = 20
    const offset = currentPage * PER_PAGE
    const pageCount = Math.ceil(filteredBooks?.length / PER_PAGE)

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected)
    }

    const currentPageData = filteredBooks?.slice(offset, offset + PER_PAGE)

    return (
        <>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {
            currentPageData?.map((item, index) => {
              return (
                <Book key={item.bookID} book={item} onEdit={handleEdit} onRemove={handleRemove} />
              )
            })
          }
        </div>
        <div className='p-5 overflow-auto mx-5'>
          <ReactPaginate
            previousLabel={<FcPrevious />}
            nextLabel={<FcNext />}
            breakLabel={'...'}
            breakClassName={styles.breakme}
            pageCount={pageCount} // The total number of pages
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            previousClassName={styles.previous}
            nextClassName={styles.next}
            containerClassName={styles.pagination}
            subContainerClassName={`${styles.pages} styles.pagination`}
            activeClassName={styles.active}
          />
        </div>
      </>
    )
}

export default Pagination