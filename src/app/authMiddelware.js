
import { useSelector } from 'react-redux';

const authMiddleware = (WrappedComponent) => {
  
  const AuthComponent = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
      return <div>You need to log in to access this page</div>;
    }
    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default authMiddleware;
