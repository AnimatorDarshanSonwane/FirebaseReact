import React, { useCallback, useEffect, useState } from 'react'
import {app} from '../Firebase'
import {collection,deleteDoc,doc,getDocs,getFirestore} from 'firebase/firestore'
import {getStorage,ref as storageRef,getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const FacultyList = () => {
 const [facultyData,setFacultydata] = useState([])
 const [imageUrls, setImageUrls] = useState({});
 const navigate = useNavigate()
 
 
  const getData = useCallback (async ()=>{
    const db = getFirestore(app)
    const docRef = collection(db,'faculty')
    const docSnap = await getDocs(docRef)
    const data = docSnap.docs.map(async (doc) => {
      const facultyData = {
      id: doc.id,
        ...doc.data(),
      };

    // Fetch image URL from Firebase Storage
    const imageUrl = await getImageUrl(doc.id);
    setImageUrls((prevUrls) => ({
      ...prevUrls,
      [doc.id]: imageUrl,
    }));

    return facultyData;
  });

  // Resolve all promises and set facultyData
  Promise.all(data).then((resolvedData) => setFacultydata(resolvedData));

},[])

useEffect(()=>{
  getData()
},[getData])


  const getImageUrl = async (facultyId) => {
    const storage = getStorage(app);
    const imageRef = storageRef(storage, `faculty_images/${facultyId}.jpg`);
    console.log(facultyId)
    try {
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      // Handle error or return a placeholder image URL
      console.error('Error fetching image URL:', error);
      return ''; // You can replace this with a placeholder image URL
    }
  };

  const deleteData = async (id) => {
    const db = getFirestore(app);
    const dataRef = doc(db, 'faculty', id);
    try {
      await deleteDoc(dataRef);
      getData();
    } catch (err) {
      console.log(err);
    }
  };
  // const deleteData = async(id)=>{
  //   const db = getFirestore(app)
  //   const dataRef = doc(db,'faculty',id)
  // //   const storage = getStorage(app)
    
  // // const myRef = storageRef(storage,'images/'+imageName) 
    
  //   await deleteObject(myRef)
  //   .then(res=>{

  //     console.log(res)

  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
   
  //   try{
        
  //       await deleteDoc(dataRef)
  //       getData()
  //   }
  //   catch(err)
  //   {
  //       console.log(err)
  //   }
  // }

  return (
    <div>
      <h1>faculty list</h1>
      {facultyData.map((faculty) => (
        <div key={faculty.id}>
          <p>
            {faculty.facultyName} {faculty.phoneNumber}
          </p>
          {imageUrls[faculty.id] && (
            <image
              src={imageUrls[faculty.facultyName]}
              alt={`Image of ${faculty.facultyName}`}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          )}
          <button onClick={() => deleteData(faculty.id)}>Delete</button>
          <button
            onClick={() => navigate('/updateFaculty', { state: faculty })}
          >
            Update
          </button>
        </div>
      ))}
    </div>
    )
  }
export default FacultyList