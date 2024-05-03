// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// import { app } from '@/app/firebase';
// import { useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// import { login } from '@/app/redux/slice/authslice';
// import apiService from '@/app/apiService';

// const OAuth = () => {
//   const dispatch = useDispatch();
// //   const navigate = useNavigate();
//   const handleGoogleClick = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const auth = getAuth(app);

//       const result = await signInWithPopup(auth, provider);
//       const formData = {
//         first_name: result.user.displayName,
//         email: result.user.email,
//         photo: result.user.photoURL,
//     };
//       const response = await apiService.post('/api/login/google/',JSON.stringify(formData));
//       const data = await response.json();
//       dispatch(login([data.user,data.token]));
//     //   navigate('/');
//     } catch (error) {
//       console.log('could not sign in with google', error);
//     }
//   };
//   return (
//     <button
//       onClick={handleGoogleClick}
//       type='button'
//       className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
//     >
//       Continue with google
//     </button>
//   );
// }

// export default OAuth;

// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// import { app } from '@/app/firebase';
// import { useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// import { login } from '@/app/redux/slice/authslice';
// import apiService from '@/app/apiService';

// const OAuth = () => {
//   const dispatch = useDispatch();
//   //   const navigate = useNavigate();
//   const handleGoogleClick = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const auth = getAuth(app);

//       const result = await signInWithPopup(auth, provider);

//       // Splitting display name into first name and last name
//       const displayName = result.user.displayName;
//       let firstName = '';
//       let lastName = '';
//       if (displayName) {
//         const nameParts = displayName.split(' ');
//         firstName = nameParts[0];
//         lastName = nameParts.slice(1).join(' '); // Join remaining parts as last name
//       }

//       const formData = {
//         first_name: firstName,
//         last_name: lastName,
//         email: result.user.email,
//         photo: result.user.photoURL,
//       };

//       const response = await apiService.post('/api/login/google/', JSON.stringify(formData));
//       const data = await response.json();
//       dispatch(login([data.user, data.token]));
//       //   navigate('/');
//     } catch (error) {
//       console.log('could not sign in with google', error);
//     }
//   };
//   return (
//     <button
//       onClick={handleGoogleClick}
//       type='button'
//       className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
//     >
//       Continue with google
//     </button>
//   );
// };

// export default OAuth;
