import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams} from "react-router-dom";


function Home() {
  const{id}=useParams()
 const[inputs, setInputs]=useState({});

 const[users, setUsers]=useState([]);
 const navigate= useNavigate()

function handleSubmit(e){

e.preventDefault();
// console.log('current State',inputs)
axios.post("http://localhost:3002/create",inputs)
.then(result => console.log(result))

.catch(err=>console.log(err))
document.getElementById("resetform").reset();
window.location.reload();


}


function handleSubmitUpdate(e){
  
e.preventDefault();
// console.log('current State',inputs)
axios.put('http://localhost:3002/update/'+id,inputs)
.then(result => console.log(result))

.catch(err=>console.log(err))
document.getElementById("resetform").reset();
window.location.reload();


}

function updateChange(e) {
  const name=e.target.name
  const  value=e.target.value
  const Name=document.getElementById('name').value;
  const Email=document.getElementById('email').value;
  const Phone=document.getElementById('phone').value;
  const Age=document.getElementById('age').value;



  // console.log(Name)
  
  

  setInputs((previousState)=>{return {...previousState,[name]:value }})
 
}




 
    function handleChange(e) {
        const name=e.target.name
        const  value=e.target.value
        const Name=document.getElementById('name').value;
        const Email=document.getElementById('email').value;
        const Phone=document.getElementById('phone').value;
        const Age=document.getElementById('age').value;

      

        // console.log(Name)
        
          if(Name==""|| Email==""|| Phone==""|| Age=="")
            {
              document.getElementById('savebutton').disabled = true;

          }
          else { 
            document.getElementById('savebutton').disabled = false;
        }

        setInputs((previousState)=>{return {...previousState,[name]:value }})
       
    }

   useEffect(()=>{

    axios.get("http://localhost:3002")
    .then(result => setUsers(result.data))
    
    .catch(err=>console.log(err))

 

   },[])

   const handleEdit=(id)=>{
    axios.get('http://localhost:3002/editUser/'+id)
    .then(result => setInputs(result.data))
 
   


     .catch(err=>console.log(err))
 
 
 
   }

  const handleDelete=(id)=>{
   axios.delete('http://localhost:3002/deleteUser/'+id)
   .then(result => console.log(result))
    
    .catch(err=>console.log(err))
    window.location.reload();


  }
  return (
    <>

{/* <!-- Button trigger modal --> */}


<div className="container-sm">

<div className="row align-items-start">
    <div className="col">
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#insertmodel">
  Add User
</button>
    </div>
    <div className="col">
      
    </div>
    <div className="col">
    
    </div>
  </div>

  <div className="row align-items-start">
    
    <div className="col">
    <table className="table">
  <thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Age</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {
                
                users.map((user,i) => (





                  
                   

<tr key={user._id}>
<td>  {i+1}</td>

      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.age}</td>
      
      <td><button type="button" onClick={(e)=> handleEdit(user._id)} data-bs-toggle="modal" data-bs-target="#Updatemodel" className="btn btn-success">Update</button>
      &nbsp;&nbsp;&nbsp;&nbsp; <button type="button" onClick={(e)=> handleDelete(user._id)} className="btn btn-danger">Delete</button></td>
     
      
      
      </tr>




                      
                    
                ))
            }
  




    
  </tbody>
</table>
    </div>
   
  </div>
</div>









{/* <!-- Modal --> */}
<div className="modal fade" id="insertmodel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form id="resetform"  onSubmit={handleSubmit}>
      <div className="mb-3">
    <input  className='form-control'type='text' id="name"   name="name"  onChange={handleChange}   placeholder='Enter Name'/>
  
    </div>
    <div className="mb-3">
    <input className='form-control' type='email' id="email"  name="email"  onChange={handleChange}    placeholder='Enter Email'/>
    </div>
    <div className="mb-3">
    <input  className='form-control'type='phone' id="phone" name="phone" onChange={handleChange}  placeholder='Enter Phone'/>
  
    </div>
    <div className="mb-3">
    <input  className='form-control'type='number'  id="age"  name="age" onChange={handleChange}  placeholder='Enter Age'/>
  
    </div>
    
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <input type="submit" value="save" id="savebutton" disabled className="btn btn-primary"/>
      </div></form>
      </div>
    </div>
  </div>
</div>


<div className="modal fade" id="Updatemodel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form id="resetform"  onSubmit={handleSubmitUpdate}>
      <div className="mb-3">
    <input  className='form-control'type='text' id="name"  value={inputs.name} name="name"  onChange={updateChange}   placeholder='Enter Name'/>
  
    </div>
    <div className="mb-3">
    <input className='form-control' type='email' id="email" value={inputs.email} name="email"  onChange={updateChange}    placeholder='Enter Email'/>
    </div>
    <div className="mb-3">
    <input  className='form-control'type='phone' id="phone" value={inputs.phone} name="phone" onChange={updateChange}  placeholder='Enter Phone'/>
  
    </div>
    <div className="mb-3">
    <input  className='form-control'type='number'  id="age" value={inputs.age} name="age" onChange={updateChange}  placeholder='Enter Age'/>
  
    </div> <input  type='hidden'  value={inputs._id} />
    
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <input type="submit" value="Update" id="updatebutton"  className="btn btn-primary"/>
      </div></form>
      </div>
    </div>
  </div>
</div>



    </>
  )
}

export default Home