import { useSelector } from 'react-redux';

const Usermiddleware = (WrappedComponent) => {
  const AuthComponent = (props) => {
    // Check if the user is logged in
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userRole = useSelector((state) => state.auth.users.role);
    if (!isAuthenticated || ![3].includes(userRole)) {
      return <div>You need to log in as a User to access this page</div>;
    }
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default Usermiddleware;

