import { useSelector } from 'react-redux';

const sellermiddleware = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userRole = useSelector((state) => state.auth.users.role);
    console.log(userRole)
    if (!isAuthenticated || ![2].includes(userRole)) {
      return <div>You need to log in as a seller to access this page</div>;
    }
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default sellermiddleware;

