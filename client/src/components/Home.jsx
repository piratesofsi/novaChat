import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import logo from "../../public/logonovo.svg"

const Home = () => {
    const navigate=useNavigate(); 
     const [username,setUsername] = useState("");
     const location = useLocation();

     const sharedRoomId  = location.state?.roomId;


    function createRoom(){
        if(sharedRoomId){
         
            navigate(`/room/${sharedRoomId}`,
                {
                    state:{username}
                }
            )
        }

        else{
            const roomId=uuidv4().slice(0,6);
        navigate(`/room/${roomId}`,{
            state:{username}
        })
        }
        
    }

  
    
  return (

   <section className=' bg-black w-full h-screen relative flex justify-center items-center'> 
    <div className='min-w-[50%] mx-auto border border-white/40 rounded-2xl h-[50%]'>
        <div className='flex flex-col justify-center items-center p-2'>
            <div className='flex '>
                <img src={logo}  alt="NovaChat Logo" width="37px"  />
                <h2 className='text-blue-600 text-4xl text-center p-2 font-bold'>NovaChat</h2>
            
             </div>
             
            <div className='text-white'>
                Instant anonymous rooms for private conversations.
             </div>
           {/* inputs  */}
             <div className='w-full px-6 flex flex-col justify-center items-center gap-4 mt-20'>
                <input type="text" 
     className='w-full py-3 border rounded border-gray-100
     placeholder-white text-white text-left px-3 '
     placeholder='Enter Nickname'
     onChange={(e)=>setUsername(e.target.value)}
     value={username}
     />
     <button className='text-black bg-blue-500 w-full py-3 rounded
     text-[18px]  font-bold hover:cursor-pointer  hover:bg-blue-600 transition-all duration-200 ' onClick={createRoom} >
        {sharedRoomId? "join room" : "create room"}
     </button>
        </div>

        <div>
          <a href=""><p className='text-gray-400 text-[15px] mt-6'>Already have a code?</p></a> 
        </div>
        </div>

        
     
    
    </div>
    </section>
   
  )
}

export default Home
