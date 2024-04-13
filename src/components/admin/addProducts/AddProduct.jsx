import  { useState } from 'react'
import { Card, Loader } from "../../index"
import styles from './AddProduct.module.scss'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'
import { toast } from 'react-toastify'
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { useNavigate, useParams } from 'react-router'
import { selectProducts } from '../../../redux/slice/productSlice'
import { useSelector } from 'react-redux'
import { doc, setDoc } from "firebase/firestore";

const initialState = {
  name:"",
  imageURL:null,
  price:0,
  category:"",
  brand:"",
  desc:""
}

const Addproduct = () => {
  const {id} = useParams()
  const products = useSelector(selectProducts)
  const productEdit = products.find((item) => item.id === id) 
  console.log(productEdit)


  const navigate = useNavigate()
  const [uploadProgress, setUploadProgress ] = useState(0)
  const [isLoading, setisLoading] = useState(false)

  const [product, setProduct] = useState(()=> {
    const newState = detectForm(id,
      {...initialState},
      productEdit
      )
    return newState
  })
 

const categories = [
  {id: 1, name: "Laptop"},
  {id: 2, name: "Electronics"},
  {id: 3, name: "Fashion"},
  {id: 4, name: "Phone"},
]

  function detectForm(id, f1, f2){
    if(id === "ADD"){
      return f1;
    }
    return f2
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setProduct({...product, [name]: value})
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress)
  }, 
  (error) => {
    toast.error(error.message)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL) => {
        setProduct({...product, imageURL: downloadURL})
        toast.success("Image uploaded successfully,")
    });
  }
);

  }

  const addProduct = (e) => {
    e.preventDefault()
    setisLoading(true)
    // console.log(product)

    try { 
      const docRef = addDoc(collection(db, "products"), 
      {
        name: product.name,
        imageURL:product.imageURL,
        price: product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createAt: Timestamp.now().toDate()
      });
      setisLoading(false)
      setUploadProgress(0)
      setProduct({...initialState})

      toast.success("Upload Product successfully")
      navigate("/admin/all-product")

    } catch(error) {
      toast.error(error.message)
    }
  }

  const editProduct = (e) => {
    e.preventDefault()
    setisLoading(true)

    if(product.imageURL !== productEdit.imageURL){
      const storageRef = ref(storage,productEdit.imageURL);
      deleteObject(storageRef)
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL:product.imageURL,
        price: product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createAt: productEdit.createAt,
        editAt: Timestamp.now().toDate()

      });
      setisLoading(false)
      toast.success("Product Edited Successfully")
      navigate("/admin/add-products")

    }catch(error){ 
      setisLoading(false);
      toast.error(error.massage)
    }
  }

  return (
    <>
    {isLoading && <Loader />}
    <div className={styles.product}>
      <h2>{detectForm(id,"Add New Product","Edit Product")}</h2>
      <Card cardClass={styles.card}>
        <form onSubmit={detectForm(id, addProduct, editProduct)}>
        <label>Product name:</label>
          <input
            type='text'
            placeholder='Product Name'
            // required
            name='name'
            value={product.name == null ? '' : product.name}
            onChange={(e)=> handleInputChange(e)}
          />

          <label>Product image</label>
          <Card cardClass={styles.group}>
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{width:`${uploadProgress}%`}}>
                {uploadProgress < 100 ? `Uploading ${uploadProgress}` : `Upload Complete ${uploadProgress}%` }
              </div>
            </div>
              )}

            <input 
              type="file" 
              accept='image/*' 
              placeholder='Product Image' 
              name="image"  
              onChange={(e)=> handleImageChange(e)}/>
            {product.imageURL === "" ? null : (
              <input 
              type="text" 
              placeholder='Image URL' 
              // required
              name="imageURL" 
              value={product.imageURL}
              disabled/>
              )}
          </Card>

          <label>Product Price:</label>
          <input type="number" name="price" placeholder='Product price' value={product.price == null ? '' : product.price} onChange={(e)=> handleInputChange(e)} required/>

          <label>Product Category:</label>
          <select required name="category" value={product.category == null ? '' : product.category} onChange={(e)=> handleInputChange(e)}>
            <option value="" disabled>-- choose product category --</option>
            {categories.map((cat)=> {
              return (
                <option key={cat.id} value={cat.name == null ? '' : cat.name}>
                  {cat.name}
                </option>
              )
            })}
          </select>

          <label>Product Brand/Company</label>
          <input type="text" name="brand" placeholder='Product brand' value={product.brand == null ? '' : product.brand} onChange={(e)=> handleInputChange(e)} required/>

          <label>Product Description</label>
          <textarea name="desc"  cols="30" rows="10" required value={product.desc} onChange={(e)=> handleInputChange(e)}></textarea>
        
          <button className='--btn --btn-primary'>
            {detectForm(id,"Save Product" , "Edit Product")}
          </button>
        </form>
      </Card>
    </div>
    </>
  )
}

export default Addproduct
