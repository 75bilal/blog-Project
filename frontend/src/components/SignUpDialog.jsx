import React ,{useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'


const SignUpDialog = ( {open ,setOpen ,setlogin}) => {
      const [name  ,setName] =useState("");
      const [email  ,setEmail] =useState("");
      const [password  ,setPassword] =useState("");
      const bio = "i am bilal";
       const OnSubmitHandler =async (e) =>{
         e.preventDefault();
          try {
            const res = await fetch('http://localhost:3000/api/signup' ,{
                method :"POST",
                headers :{ 
                "Content-Type":"application/json"
                },
                body :JSON.stringify({name , email , password ,bio})
            });
            if(res.ok){
              setOpen(false);
              setlogin(true);
            }else{

            }
          } catch (error) {
            console.log("error : " ,error.message);
            
          }
       }
    
  return (
    <>
        <Dialog  open={open} onOpenChange={setOpen}>
            <DialogTrigger className='text-white hidden sm:block rounded-md bg-[#5b53f5] hover:bg-[#6366f1] px-3 py-1 font-semibold transition duration-300'>
              create account
            </DialogTrigger>

            <DialogContent className='bg-[#0e121e] sm:max-w-sm p-6 rounded-xl border border-gray-700'>
              <DialogHeader className="fiex items-center">
                <DialogTitle className='text-white text-xl '>
                  Sign up
                </DialogTitle>
              </DialogHeader>

              <div className='mt-2'>
                <form onSubmit={OnSubmitHandler}>

                  <input
                  type='text'
                  placeholder='Enter name'
                  className='w-full bg-[#1a1a1a] text-white mb-2  placeholder-gray-500 px-2 py-1 rounded-md border border-gray-600 outline-none focus:ring-2 focus:ring-[#5b53f5]'
                  onChange={(e) => setName(e.target.value)}
                  />
                <input
                  type='email'
                  placeholder='Enter email'
                  className='w-full bg-[#1a1a1a] text-white mb-2 placeholder-gray-500 px-2 py-1 rounded-md border border-gray-600 outline-none focus:ring-2 focus:ring-[#5b53f5]'
                  onChange={(e) => setEmail(e.target.value)}
                  
                  />
             
                  <input
                  type='password'
                  placeholder='Enter password'
                  className='w-full bg-[#1a1a1a] text-white placeholder-gray-500 px-2 py-1 rounded-md border border-gray-600 outline-none focus:ring-2 focus:ring-[#5b53f5]'
                  onChange={(e) => setPassword(e.target.value)}
                  
                  />
                
                <button className='mt-2 w-full text-white rounded-md bg-[#5b53f5] hidden sm:block hover:bg-[#6366f1] px-2 py-1 font-semibold transition duration-300'>
                  create account
                </button>  
                  </form>
              </div>
            </DialogContent>
          </Dialog>
    </>
  )
}

export default SignUpDialog
