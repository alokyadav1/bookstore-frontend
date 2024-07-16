// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { useRef } from 'react';
// import { useIdleTimer } from 'react-idle-timer';
// import { useNavigate } from 'react-router-dom';

// const IdleTimerContainer = ({ children }) => {
//     const navigate = useNavigate();
//   const idleTimerRef = useRef(null);

//   const handleOnIdle = () => {
//     console.log('User is idle');
//     // Clear user session and redirect to login page
//     localStorage.removeItem('currentUser');  // or your method of clearing session
//     localStorage.removeItem('admin');  // or your method of clearing session
//     navigate('/user/login');
//   };

//   const handleOnActive = (event) => {
//     console.log('User is active', event);
//     console.log('time remaining', idleTimerRef.current.getRemainingTime());
//   };

//   useIdleTimer({
//     ref: idleTimerRef,
//     timeout: 1000 * 60 * 30, // 30 minutes
//     onIdle: handleOnIdle,
//     onActive: handleOnActive,
//     debounce: 500
//   });

//   return (
//     <div>
//       {children}
//     </div>
//   );
// };

// export default IdleTimerContainer;
