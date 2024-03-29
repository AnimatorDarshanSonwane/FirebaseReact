import React, { useState } from 'react'
import {getFirestore, doc, updateDoc} from 'firebase/firestore'
import {app} from '../Firebase'
import { useLocation, useNavigate } from 'react-router-dom'


const UpdateFaculty = () => {

const location = useLocation()
const navigate = useNavigate()

const[name,setName] = useState(location.state.facultyName)
const[phone,setPhone] =useState(location.state.phoneNumber)

  const submitHandler = async (event)=>{
    event.preventDefault();
    //console.log(name,phone)
    const  db = getFirestore(app)
    const docRef = doc(db,'faculty',location.state.id)

    try{
        await updateDoc(docRef,{facultyName:name, phoneNumber:phone} )
        navigate('/facultyList')
    }
    catch(err){
        console.log(err)
    }


}
    return (
    <div>
      <h1>Add Faculty</h1>
      <form onSubmit={submitHandler}>
        <input value={name}  onChange={(e)=>setName(e.target.value)} placeholder='full name'/>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='phone number'/>
        <button type='submit'> Update</button>
      </form>
    </div>
  )
}

export default UpdateFaculty
