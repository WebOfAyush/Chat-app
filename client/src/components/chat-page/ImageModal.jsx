import React, { useEffect, useState } from 'react';

function ImageModal({ image, setModalImage }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (image) {
      setIsVisible(true); 
    }
  }, [image]);

  return (
    <>
      <div
        className={`absolute inset-0 bg-black opacity-50 z-20 transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={() => setModalImage(null)}
      ></div>

      <div
        className={`absolute inset-0 z-30 flex justify-center items-center transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={() => setModalImage(null)}
      >
        <div
          className="shadow-2xl rounded-md text-white bg-background flex flex-col justify-center items-center gap-2"
          onClick={(e) => e.stopPropagation()} 
        >
          <img
            src={image}
            alt="Modal"
            className="m-4 max-w-[80vw] max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </>
  );
}

export default ImageModal;
