import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

const useFetchDocument = (collectionName, documentID) => {
    const [document, setDocument] = useState('')

    const getDocument = async () => {
        const docRef = doc(db, collectionName, documentID);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const obj  = {
            id: documentID,
            ...docSnap.data()
          }
          setDocument(obj)
        } else {
          toast.error('Document not found')
        }
      }

      useEffect(()=> {
        getDocument()
      },[])

      return { document}
}

export default useFetchDocument