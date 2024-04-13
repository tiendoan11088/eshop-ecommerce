import React, { useState } from 'react'
import styles from './Pagination.module.scss'

const Pagination = ({currentPage, setCurrentPage, productsPerPage, totalProducts}) => {
  
  const pageNumber = []
  const totalPages = totalProducts/productsPerPage;
  //list number page
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit ] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit ] = useState(0);
  
  for(let i = 1; i<= Math.ceil(totalProducts/ productsPerPage); i++){
    pageNumber.push(i)
  }
  
  //Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const paginationNext = () => {
      setCurrentPage(currentPage + 1)
      if(currentPage + 1 > maxPageNumberLimit){
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
      }
  

  }

  const paginationPrev = () => {
    setCurrentPage(currentPage - 1)
    //show prev set of pageNumber
    if((currentPage - 1) % pageNumberLimit == 0){
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }

}
  
  
  return (
    <ul className={styles.pagination}>
      <li onClick={paginationPrev} className={currentPage === pageNumber[0]? `${styles.hidden}`: null}>Prev</li>

      {pageNumber.map((number)=> {
        if(number < maxPageNumberLimit + 1 && number>minPageNumberLimit){
          return(
            <li key={number} onClick={()=> paginate(number)}
            className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          )  
        }
      })}

      <li onClick={paginationNext} className={currentPage == pageNumber[pageNumber.length - 1] ? `${styles.hidden}` : null}>Next</li>

      <p>
        <b className={styles.page}>
          {`page ${currentPage}`}
        </b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  )
}

export default Pagination
