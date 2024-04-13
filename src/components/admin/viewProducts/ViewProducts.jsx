import { useEffect, useState } from 'react'
import {Loader} from '../../index'
import { toast } from 'react-toastify'
import { query, orderBy, collection, onSnapshot, doc, deleteDoc, } from "firebase/firestore";  
import { db } from '../../../firebase/config';
import styles from './ViewProducts.module.scss'
import { Link } from 'react-router-dom';
import {FaEdit, FaTrashAlt} from "react-icons/fa"
import { getStorage, ref, deleteObject } from "firebase/storage";
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import {STORE_PRODUCTS, selectProducts} from '../../../redux/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection';


const ViewProducts = () => {

  const { data, isLoading } = useFetchCollection("products")
  
  const products = useSelector(selectProducts)

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    )
  },[dispatch, data])

  // useEffect(()=> {
  //   getProducts()
  // },[])

//   const getProducts = () => {
//     setIsLoading(true)
//     try{
//       const productsRef = collection(db, "products");
//       const q = query(productsRef, orderBy("createAt", "desc"));

//       onSnapshot(q, (snapshop) => {
//         const allProducts = snapshop.docs.map((doc)=> ({
//           id: doc.id,
//           ...doc.data()
//         }))
//         console.log(allProducts)
//         setProducts(allProducts)
//         setIsLoading(false)
//         disPatch(
//           STORE_PRODUCTS({
//             products: allProducts
//           })
//         )
//   })
// }catch(error){
//       setIsLoading(false)
//       toast.error(error.messgae)
//     }

//   }

  const deleteProduct = async(id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storage = getStorage();
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
      toast.success("Product deleted successfully")

    }catch(error){
      toast.error(error.message)
    }
  }

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!',
      'You are about to delete this product',
      'Delete',
      'Cacel',
      function okCb() {
        deleteProduct(id,imageURL)
      },
      function cancelCb() {
        console.log("delete cancel")
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: "orangered",
        okButtonBackground: "oranged",
        cssAnimationStyle:"zoom"
      },
    );
  }

  return (
    <>
    {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        {products.length === 0 ? (
          <p>No Product Found.</p>
        ) : (
            <table>
              <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {products.map((product, index)=> {
              const {id, name, price, imageURL, category} = product;
              return (
              <tr key={id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <img src={imageURL} alt={name} style={{width:"100px"}} />
                </td>
                <td>
                  {name}
                </td>
                <td>
                  {category}
                </td>
                <td>
                  {`$${price}`}
                </td>
                <td className={styles.icons}>
                  <Link to={`/admin/add-product/${id}`}>
                    <FaEdit size={20} color="green" />
                  </Link>
                  &nbsp;
                  <FaTrashAlt size={18} color='red'onClick={() =>confirmDelete(id, imageURL)}/>
                </td>
              </tr>
              )
            })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default ViewProducts
