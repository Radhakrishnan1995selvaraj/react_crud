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

    axios.get("http://localhost:3002"+id)
    .then(result => setUsers(result))
    
    .catch(err=>console.log(err))

   },[])

  
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
      
      <td><Link to={`/${user._id}?update`} className="btn btn-success">Update</Link> 
      &nbsp;&nbsp;&nbsp;&nbsp; <button type="button" className="btn btn-danger">Delete</button></td>
     
      
      
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
    <input  className='form-control'type='text' id="name"  name="name"  onChange={handleChange}   placeholder='Enter Name'/>
  
    </div>
    <div className="mb-3">
    <input className='form-control' type='email' id="email" name="email"  onChange={handleChange}    placeholder='Enter Email'/>
    </div>
    <div className="mb-3">
    <input  className='form-control'type='phone' id="phone" name="phone" onChange={handleChange}  placeholder='Enter Phone'/>
  
    </div>
    <div className="mb-3">
    <input  className='form-control'type='number'  id="age" name="age" onChange={handleChange}  placeholder='Enter Age'/>
  
    </div>
    
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <input type="submit" value="Save" id="savebutton" disabled className="btn btn-primary"/>
      </div></form>
      </div>
    </div>
  </div>
</div>



    </>
  )
}

export default Home