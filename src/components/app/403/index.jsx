import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  const navigate = useNavigate();
  const [lockAnimation, setLockAnimation] = useState(false);
  const [textAnimation, setTextAnimation] = useState(false);

  useEffect(() => {
    setLockAnimation(true);

    const textTimer = setTimeout(() => {
      setTextAnimation(true);
    }, 600);

    return () => clearTimeout(textTimer);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/80 p-4'>
      <div className='w-full max-w-md mx-auto flex flex-col items-center text-center'>
        <div
          className={`relative mb-8 transition-all duration-1000 ease-out ${
            lockAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}>
          <div className='absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse' />
          <div className='relative bg-red-100 dark:bg-red-900/30 p-6 rounded-full'>
            <ShieldAlert className='h-20 w-20 text-red-500 animate-bounce' />
          </div>
          <div className='absolute -top-3 -right-3'>
            <div className='bg-red-500 text-white p-2 rounded-full'>
              <LockKeyhole className='h-5 w-5' />
            </div>
          </div>
        </div>

        <div
          className={`space-y-4 transition-all duration-700 delay-300 ${
            textAnimation
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}>
          <h1 className='text-5xl font-bold text-red-500'>403</h1>
          <h2 className='text-xl font-semibold'>Access Forbidden</h2>
          <p className='text-muted-foreground'>
            {`Sorry, you don't have permission to access this page.`}
          </p>

          <div className='pt-6 flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              onClick={() => navigate(-1)}
              className='inline-flex items-center justify-center rounded-md  px-4 py-2 text-sm font-medium border border-input shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Go Back
            </Button>
            <Button
              onClick={() => navigate("/")}
              className='inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium  hover:bg-red-600 transition-colors'>
              Return to Home
            </Button>
          </div>
        </div>
      </div>

      <div className='absolute inset-0 overflow-hidden -z-10 opacity-30'>
        <div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-500/10 rounded-full blur-3xl animate-blob' />
        <div className='absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-red-500/10 rounded-full blur-3xl animate-blob animation-delay-2000' />
        <div className='absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-red-500/10 rounded-full blur-3xl animate-blob animation-delay-4000' />
      </div>
    </div>
  );
}

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Home } from "lucide-react";

// export default function ForbiddenPage() {
//   const navigate = useNavigate();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [bounce, setBounce] = useState(false);
//   const guardRef = useRef(null);

//   useEffect(() => {
//     // Start animations after component mounts
//     setIsLoaded(true);

//     // Set up bouncing animation interval
//     const bounceInterval = setInterval(() => {
//       setBounce(true);
//       setTimeout(() => setBounce(false), 1000);
//     }, 3000);

//     return () => clearInterval(bounceInterval);
//   }, []);

//   // Handle guard interaction
//   const handleGuardClick = () => {
//     if (guardRef.current) {
//       guardRef.current.classList.add("animate-wave");
//       setTimeout(() => {
//         if (guardRef.current) {
//           guardRef.current.classList.remove("animate-wave");
//         }
//       }, 1000);
//     }
//   };

//   return (
//     <div className='min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4 overflow-hidden'>
//       {/* Decorative background elements */}
//       <div className='absolute inset-0 overflow-hidden'>
//         {/* Decorative circles */}
//         <div className='absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-yellow-200 opacity-20 blur-3xl' />
//         <div className='absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full bg-purple-200 opacity-20 blur-3xl' />

//         {/* Decorative path */}
//         <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-100 to-transparent' />
//       </div>

//       {/* Main content */}
//       <div className='relative z-10 max-w-lg w-full flex flex-col items-center'>
//         {/* Guard character */}
//         <div
//           ref={guardRef}
//           onClick={handleGuardClick}
//           className={`relative cursor-pointer transition-all duration-700 ease-out-back
//             ${
//               isLoaded
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-20 opacity-0"
//             }
//             ${bounce ? "animate-bounce" : ""}`}>
//           {/* Guard illustration */}
//           <div className='relative w-64 h-64'>
//             {/* Body */}
//             <div className='absolute inset-x-0 bottom-0 w-48 h-48 mx-auto bg-blue-500 rounded-3xl shadow-lg transform-gpu transition-transform duration-300 hover:scale-105' />

//             {/* Head */}
//             <div className='absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-400 rounded-full shadow-lg border-8 border-blue-500'>
//               {/* Eyes */}
//               <div className='absolute top-[40%] left-[25%] w-6 h-6 bg-white rounded-full'>
//                 <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full' />
//               </div>
//               <div className='absolute top-[40%] right-[25%] w-6 h-6 bg-white rounded-full'>
//                 <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full' />
//               </div>

//               {/* Mouth */}
//               <div className='absolute bottom-[30%] left-1/2 -translate-x-1/2 w-16 h-4 bg-white rounded-full overflow-hidden'>
//                 <div className='absolute top-0 left-0 right-0 h-1/2 bg-red-400 rounded-full' />
//               </div>
//             </div>

//             {/* Arms */}
//             <div className='absolute top-[40%] left-0 w-12 h-24 bg-blue-500 rounded-full origin-top-right rotate-[-30deg] shadow-md' />
//             <div className='absolute top-[40%] right-0 w-12 h-24 bg-blue-500 rounded-full origin-top-left rotate-[30deg] shadow-md' />

//             {/* Shield */}
//             <div className='absolute top-[60%] left-1/2 -translate-x-1/2 w-32 h-40 bg-yellow-400 rounded-t-full shadow-lg border-4 border-yellow-500 flex items-center justify-center'>
//               <div className='text-4xl font-bold text-yellow-700'>403</div>
//             </div>
//           </div>

//           {/* Speech bubble */}
//           <div className='absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow-md'>
//             <div className='absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45' />
//             <p className='text-gray-700 font-medium whitespace-nowrap'>
//               Sorry, no entry!
//             </p>
//           </div>
//         </div>

//         {/* Text content */}
//         <div
//           className={`mt-8 text-center transition-all duration-1000 delay-300
//           ${
//             isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//           }`}>
//           <h1 className='text-4xl font-bold text-purple-800 mb-2'>
//             Access Forbidden
//           </h1>
//           <p className='text-gray-600 max-w-md mx-auto mb-8'>
//             Oops! It looks like you don't have permission to access this area.
//             Our friendly guard is keeping this content secure.
//           </p>

//           {/* Animated fence */}
//           <div className='relative h-12 my-8 flex justify-center'>
//             {[...Array(12)].map((_, i) => (
//               <div
//                 key={i}
//                 className='w-4 bg-yellow-600 mx-1 rounded-t-lg animate-grow'
//                 style={{
//                   height: "100%",
//                   animationDelay: `${i * 0.1}s`,
//                   animationDuration: "0.5s",
//                 }}
//               />
//             ))}
//           </div>

//           {/* Buttons */}
//           <div
//             className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500
//             ${
//               isLoaded
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-10 opacity-0"
//             }`}>
//             <button
//               onClick={() => navigate(-1)}
//               className='px-6 py-3 bg-white text-purple-700 rounded-full font-medium border-2 border-purple-200 shadow-md hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex items-center justify-center'>
//               <ArrowLeft className='mr-2 h-5 w-5' />
//               Go Back
//             </button>
//             <button
//               onClick={() => navigate("/")}
//               className='px-6 py-3 bg-purple-600 text-white rounded-full font-medium shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center'>
//               <Home className='mr-2 h-5 w-5' />
//               Return Home
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Decorative bottom elements */}
//       <div className='absolute bottom-0 left-0 right-0 h-24 flex justify-around items-end overflow-hidden'>
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className='w-16 bg-green-500 rounded-t-full'
//             style={{
//               height: `${Math.random() * 60 + 40}px`,
//               backgroundColor: i % 2 === 0 ? "#10B981" : "#059669",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
