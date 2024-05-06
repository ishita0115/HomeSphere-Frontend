// authMiddleware.js

import { useSelector } from 'react-redux';

const authMiddleware = (WrappedComponent) => {
  
  const AuthComponent = (props) => {
    // Check if the user is logged in
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Redirect if user is not logged in
    if (!isAuthenticated) {
      // Redirect to login page or show a message
      return <div>You need to log in to access this page</div>;
    }

    // Render the wrapped component if user is logged in
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default authMiddleware;
