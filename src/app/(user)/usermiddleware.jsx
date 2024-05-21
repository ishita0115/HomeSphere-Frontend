import { useSelector } from 'react-redux';

const Usermiddleware = (WrappedComponent) => {
  const AuthComponent = (props) => {
    // Check if the user is logged in
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userRole = useSelector((state) => state.auth.users.role);
    if (!isAuthenticated || ![3].includes(userRole)) {
      return (
        <>
        <div className='text-center text-xl p-5'>You need to log in as a User to access this page</div>
        <div className='flex justify-center'>
      <img src='/icons/notallouderrorpage.png' style={{ height: '400px', width: 'auto' }}  className='rounded-lg'/>
      </div>
        </>)
    }
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default Usermiddleware;

