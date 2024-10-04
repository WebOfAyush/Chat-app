import React from 'react';

function Input({ placeholder, type = "text", username = false }) {
  return (
    <div>
      <input type={type} placeholder={placeholder} className='outline-none text-white px-6 py-2 bg-foreground rounded-xl' />
      {username && <p className='text-white text-xs ml-2'>It can't be changed after creating</p>}
    </div>
  );
}

export default Input;
