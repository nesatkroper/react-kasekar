import React from "react";

const Banner = () => {
  return (
    <div className='relative rounded-xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-700 mb-4'>
      <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg')] bg-center bg-cover"></div>
      <div className='relative z-10 px-6 py-8 md:py-10 md:px-12 text-white'>
        <h1 className='text-lg md:text-2xl font-bold mb-4'>
          Shop Our Premium Fertilizer
        </h1>
        <p className=' md:text-lg max-w-2xl '>
          Discover quality products at competitive prices with our satisfaction
          guarantee.
        </p>
      </div>
    </div>
  );
};

export default Banner;
