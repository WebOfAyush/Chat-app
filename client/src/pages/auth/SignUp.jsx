import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';

function SignUp() {
  return (
    <main className='bg-background h-screen w-screen overflow-hidden flex '>
      <div className='w-1/2 h-screen flex justify-center items-center'>
        <img src="/vectors/signup-page.png" alt="signup" className='w-3/4'/>
      </div>
      <div className='w-1/2 h-screen flex justify-center flex-col'>
        <div className='text-white font-poppins'>
          <h1 className='text-5xl font-bold'>Create an account</h1>
          <h4>Already have an account? <Link to={"/login"}>Login</Link></h4>
        </div>
        <div className='flex flex-col gap-4 '>
          <div className='flex gap-3'>
            <Input placeholder={'First Name'}/>
            <Input placeholder={'Last Name'} />
          </div>
          

            <Input placeholder={'Username'}  username className='w-full'/>
            <Input placeholder={'Email'}  type='email'/>
            <Input placeholder={'Password'} type='password'/>
            <Input placeholder={'Confirm Password' } type='password' />

        </div>
      </div>
    </main>
  );
}

export default SignUp;
