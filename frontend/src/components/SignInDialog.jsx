import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const SignInDialog = ({ open, setOpen, openSignUp, setLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      
      const data = await res.json();
      if (data.sccuess) {
        setOpen(false);
        setLogin(true);
      } else {
        alert(data.message || data.error || "Login failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='text-white bg-[#232828] hover:bg-[#394141] border border-gray-700 rounded-md px-3 py-1 transition duration-300'>
        Sign in
      </DialogTrigger>

      <DialogContent className='bg-[#0e121e] sm:max-w-sm p-6 rounded-xl border border-gray-700'>
        <DialogHeader className="flex items-center">
          <DialogTitle className='text-white text-xl'>Sign in</DialogTitle>
          <DialogDescription className='text-gray-400'>
            First time here?{' '}
            <button onClick={openSignUp} className='underline text-[#5b53f5]'>
              Create account
            </button>
          </DialogDescription>
        </DialogHeader>

        <div className='mt-2'>
          <form onSubmit={submitHandler}>
            <input
              type='email'
              placeholder='Your email'
              className='w-full bg-[#1a1a1a] text-white mb-2 placeholder-gray-500 px-2 py-1 rounded-md border border-gray-600 outline-none focus:ring-2 focus:ring-[#5b53f5]'
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {showPassword && (
              <input
                type='password'
                placeholder='Your password'
                className='w-full bg-[#1a1a1a] text-white mb-2 placeholder-gray-500 px-2 py-1 rounded-md border border-gray-600 outline-none focus:ring-2 focus:ring-[#5b53f5]'
                onChange={(e) => setPassword(e.target.value)}
              />
            )}

            <button
              type='submit'
              className='mt-2 w-full text-white rounded-md bg-[#5b53f5] hidden sm:block hover:bg-[#6366f1] px-2 py-1 font-semibold transition duration-300'
            >
              {password ? 'Continue with email and password' : 'Continue with email only'}
            </button>

            <div className='flex items-center my-4'>
              <div className='flex-grow h-px bg-gray-700'></div>
              <span className='text-sm text-gray-500 px-4'>OR</span>
              <div className='flex-grow h-px bg-gray-700'></div>
            </div>

            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='mt-2 w-full text-white rounded-md bg-[#0e121e] hidden sm:block hover:bg-[#1b2031] px-2 py-1 font-semibold border border-gray-700 transition duration-300'
            >
              {showPassword ? 'Sign in with email only' : 'Sign in with email and password'}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
