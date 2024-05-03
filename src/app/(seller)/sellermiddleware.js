import { useSelector } from 'react-redux';

const sellermiddleware = (WrappedComponent) => {
  const AuthComponent = (props) => {
    // Check if the user is logged in
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userRole = useSelector((state) => state.auth.users.role);
    // Get user role
  
    console.log(userRole)
    // Redirect if user is not logged in or not a seller/admin
    if (!isAuthenticated || ![1, 2].includes(userRole)) {
      // Redirect to login page or show a message
      return <div>You need to log in as a seller or admin to access this page</div>;
    }

    // Render the wrapped component if user is logged in as a seller or admin
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default sellermiddleware;

