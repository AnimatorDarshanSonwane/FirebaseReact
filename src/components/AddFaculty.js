import React, { useState } from 'react'
import {collection,addDoc,getFirestore} from 'firebase/firestore'
import {getStorage,ref as storageRef,uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'

const AddFaculty = () => {
 const [name,setName] = useState('')
 const [phone,setPhone] = useState(null)
 const [image, setImage] = useState(null);


  const submitHandler = async (event)=>{
    event.preventDefault();
    console.log(name,phone)
    

    // Upload image to Firebase Storage
    const storage = getStorage(app);
    const imageRef = storageRef(storage, `faculty_images/${name}`);

    try {
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Store faculty data along with image URL in Firestore
      const db = getFirestore(app);
      await addDoc(collection(db, 'faculty'), {
        facultyName: name,
        phoneNumber: phone,
        imageUrl: imageUrl, // Add this field to store the image URL
      });

      // // Reset form after submission
      // setName('');
      // setPhone('');
      // setImage(null);

    } catch (error) {
       console.error('Error uploading image:', error);
    }

    // await uploadBytes(myRef,selectedFile)

    // const imageUrl = await getDownloadURL(myRef)

    // const docRef = await addDoc(collection(db,'faculty'),{
    //     facultyName:name,
    //     phoneNumber:phone,
    //     imageUrl:imageUrl
    // })
    // console.log(docRef,docRef.id)

  }

  const handleFileChange = (event)=>{
    const file = event.target.files[0]
    setImage(file)
  }

  return (
    <div>
      <h1>Add Faculty</h1>
      <form onSubmit={submitHandler}>
        <input onChange={(e)=>setName(e.target.value)} placeholder='full name'/>
        <input onChange={(e)=>setPhone(e.target.value)} placeholder='phone number' />
        <input onChange={handleFileChange} type='file'/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default AddFaculty