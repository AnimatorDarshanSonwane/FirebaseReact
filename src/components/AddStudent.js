import React, { useState } from 'react'
import {getDatabase,ref,set} from 'firebase/database'
import {getStorage,ref as storageRef,uploadBytes,getDownloadURL} from 'firebase/storage'
import {app} from '../Firebase'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
  const [name,setName] = useState('')
  const [admNo,setAdmNo] = useState(null)
  const [phone,setPhone] = useState(null)
  const [selectedFile,setSelectedFile] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (event)=>{
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    const db = getDatabase(app)
    const storage = getStorage(app)

    const myRef = storageRef(storage,`images/${admNo}`)
    await uploadBytes(myRef,selectedFile)

    const imageUrl = await getDownloadURL(myRef)

    set(ref(db,'student/'+admNo),{
        studentName:name,
        phoneNumber:phone,
        imageUrl:imageUrl
    })
    .then(res=>{
        navigate('/dashboard/studentList')
    })
    .catch(err=>{
        console.log(err)
    })
  }
  return (
    <div>
     <form onSubmit={submitHandler}>
        <input onChange={(e)=>setAdmNo(e.target.value)} type='text' placeholder='Adm No'/>
        <input onChange={(e)=>setName(e.target.value)} type='text' placeholder='student name'/>
        <input onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='phone number'/>
        <input onChange={handleFileChange} type='file'/>
        <button type='submit'>submit</button>
     </form>
    </div>
  )
}

export default AddStudent