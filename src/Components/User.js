import React, { useEffect, useState } from 'react'
import axios from "axios";

const url = "https://randomuser.me/api"

export const User = () => {

const[users,setUser] = useState([])
const[loading,setLoading]=useState(false)

 const DataFetching = async ()=>{
  setLoading(true)
  try{
    const res = await axios.get(url)
    const result = res.data.results;
       setUser(result)
       localStorage.setItem("user", JSON.stringify(result));
  }catch(err){
    console.log("Data not fetching",err)
  }finally{
    setLoading(false)
  }
    
}
    useEffect(()=>{
      DataFetching()
    },[])

    const RefreshHandler=()=>{
      DataFetching()
    }

  return (
    <div className='container'>

      {loading ? <p >Please wait....</p>:
              users.map((user)=>{
                   return(
                    <>
                    <div className='text' key={user.login.uuid}>
                    <h2>Name: <span>{user.name.first}{user.name.last}</span></h2>
                    <h2>Email: <span>{user.email}</span></h2>
                    </div>
                     <div className='btn'>
                     <button disabled={loading} onClick={RefreshHandler}>Refresh</button>
                     </div>
                     </>
                   )
                })
  
      }
        
       
        
    </div>
  )
}
