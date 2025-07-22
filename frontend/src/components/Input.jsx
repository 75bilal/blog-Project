import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { IoVideocamOutline } from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { assets } from '@/assets/assets';

const Input = () => {
 const [text ,setText] =useState('');
 const [media , setMedia] = useState(null);
 const [mediaPreview , setMediaPreview] = useState(null);


 const handleFileChange =(e) =>{
 
   const file = e.target.files[0];
   if(file){
    setMedia(file);
    setMediaPreview(URL.createObjectURL(file));
   }
 }

const [open, setOpen] = useState(false);



  const  submitHandler = async() =>{
    try {
      const formData = new FormData();
      formData.append("text" ,text);
      if(media) formData.append("media" , media);
      console.log("Sending Text:", text);
console.log("Sending Media:", media);
console.log("Media type:", media?.type);

      const res = await fetch("http://localhost:3000/api/userpost" ,{
      method :"POST",
      credentials: "include", 
      body: formData,
      });

      const result  =await res.json();
      if(res.ok){
        alert('post created successfully');
        setText('');
        setMedia(null);
        setMediaPreview(null);

      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger: Wrap user input as clickable trigger */}
      <DialogTrigger asChild>
        <div className="w-full max-w-xl bg-[#1f1f1f] p-4 rounded-lg hover:bg-[#2a2a2a] border border-gray-600 shadow-lg cursor-pointer">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="bg-transparent text-white placeholder-gray-400 outline-none w-full"
            readOnly
          />
        </div>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-[#0e121e] border border-gray-700 rounded-xl p-6">
        <div className='flex items-start gap-3'>
          <img src={assets.userAvatar} alt="" className='w-8 h-8 rounded-full' />
          <div>
            <h3 className='text-white font-semibold'>baba gee </h3>
          </div>
        </div>

        <input
          placeholder="What's on your mind?"
          className="w-full h-28 bg-[#0e121e] text-white placeholder-gray-500 px-2 rounded-md outline-none"
          onChange={(e) => setText(e.target.value)}
        />
        {mediaPreview && (  
          <div className='mt-4'>
            {media?.type?.startsWith('image') ? (
              <img src={mediaPreview} alt="" className='w-full max-h-64 object-cover rounded-md' />
            ) : (
              <video src={mediaPreview} className='w-full max-h-64 rounded-md'/>
            )}
          </div>
        )}
        <div className='flex justify-between items-center mt-4'>
          <div className='flex gap-4 text-white text-xl'>
            <label>
              <CiImageOn className="cursor-pointer"  />
              <input type="file" accept='image/*' onChange={handleFileChange} hidden/>
            </label>
            <label>
              <IoVideocamOutline className="cursor-pointer" />
              <input type="file" accept='video/*' onChange={handleFileChange} hidden/>
            </label>
          </div>
          <div className='flex items-center gap-3'>
            <button
              className='rounded-md px-2 py-2 bg-[#1a1a1a] text-white border border-gray-600 hover:bg-[#2a2a2a] transition'
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className='rounded-md py-2  px-4 bg-[#5b53f5] text-white hover:bg-[#6366f1] transition'
              onClick={submitHandler}
            >
              Post
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Input;
