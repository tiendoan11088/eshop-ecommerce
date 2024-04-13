import styles from "./ProductList.module.scss"
import { useState, useEffect } from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa'
import { Pagination, Search } from '../../index'
import ProductItem from '../productItem/ProductItem'
import {useDispatch, useSelector} from 'react-redux'
import { SORT_PRODUCT,FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice'


const ProductList = ({products}) => {
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("lastest")
  const filteredProducts = useSelector(selectFilteredProducts)

   //Pagination states
   const [currentPage, setCurrentPage] = useState(1)
   const [productsPerPage, setProductsPerPage] = useState(8)
   
   //Get Current Products
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
   const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)

  const dispatch = useDispatch()

  useEffect(()=> {
      dispatch(SORT_PRODUCT({products, sort}))
  },[dispatch, products, sort])

  useEffect(()=> {
    dispatch(FILTER_BY_SEARCH({products, search}))
},[dispatch, products, search])


  // console.log(Object.keys(filteredProducts).length)
  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={()=>setGrid(true)} />

          <FaListAlt size={24} color="#0066d4" onClick={()=> setGrid(false)}/>
        
          <p>
            <b>{Object.keys(filteredProducts).length}</b> Products found.
          </p>
          {/* search icon  */}
          <div>
            <Search 
              value={search} 
              onChange={(e)=> {setSearch(e.target.value)
            }}/>
          </div>
          {/* Sort Product  */}
          <div className={styles.sort}>
            <label>Sort by:</label>
            <select value={sort} onChange={(e)=> setSort(e.target.value)}>
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>
        </div>
      </div>

      
      <div className={grid ? `${styles.grid}`: `${styles.list}`}>
        {products.lenght === 0 ? (
          <p>No Product Found</p>
        ): (
          <>
          {currentProducts.map((product)=>{
            return (
              <div key={product.id}>
                <ProductItem {...product} grid={grid} product={product} />
              </div>
            )
          })}
          </>
        )}
      </div>
      
      <div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts = {filteredProducts.length} 
        />
      </div>

      
    </div>
  )
}

export default ProductList
