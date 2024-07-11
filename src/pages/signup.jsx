import React,{useState,useEffect} from 'react' ;
import { useNavigate } from 'react-router-dom'
const Signup = () => {    
    const [name,setname]=useState(""); 
    const [email,setemail]=useState(""); 
    const [password,setpassword]=useState("");  
    const navigate=useNavigate(); 
    
    useEffect(()=>{ 
      const auth=JSON.parse(localStorage.getItem('user'))
        if(auth)
          navigate('/employee') 
    },[])
    
    const pressedButton=()=>{  
      if(name===""||email===""||password==="")
      {
        alert("PLEASE FILL ALL THE DETAILS");
        return;
      }
         const data={name,email,password}  
         localStorage.setItem('user', JSON.stringify(data));
         navigate('/employee',{ state: data }) ;

    };  
    
    
      
  return (    
    <div className='min-h-screen bg-cover bg-transparent bg-center brightness-100 bg-[url("https://wallpapercave.com/wp/wp9209517.jpg")]'> 
    
    <div className='contrast-200'>
    <div className='text-4xl text-center pt-14  font-serif font-extrabold text-emerald-950'>RESOURCE MANAGEMENT SYSTEM</div>
    <div> 
        <h1 className='text-4xl text-center pt-28 font-semibold  text-white'>REGISTER</h1>  
        <div className='text-center pt-4'>
        <div className="pt-6"><input className='text-1xl text-center font-mono text-black border-black  border-2 rounded-lg'type='text' placeholder='ENTER USERNAME' value={name} onChange={(e)=>setname(e.target.value)}/></div>
        <div className="pt-6"><input className='text-1xl text-center font-mono text-black border-black  border-2 rounded-lg' type='text' placeholder='ENTER EMAIL'value={email} onChange={(e)=>setemail(e.target.value)}/></div>
        <div className="pt-6"><input className='text-1xl text-center font-mono text-black border-black border-2 rounded-lg'type='password' placeholder='ENTER PASSWORD'value={password} onChange={(e)=>setpassword(e.target.value)}/></div>
        </div> 

        <div className='text-center pt-8 text-black '> <button className="bg-indigo-600 text-white hover:bg-indigo-800 w-24 border-2 rounded-lg " onClick={pressedButton}>SIGN UP</button></div>
        </div> 
        </div>
    </div>
  )
}

export default Signup