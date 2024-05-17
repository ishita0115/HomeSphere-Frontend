import { useSelector } from 'react-redux';

const AdminMiddleware = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userRole = useSelector((state) => state.auth.users.role);
    // Redirect if user is not logged in or not a seller/admin
    if (!isAuthenticated || ![1].includes(userRole)) {
      return <div>You need to log in as admin to access this page</div>;
    }

    // Render the wrapped component if user is logged in as a admin
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default AdminMiddleware;

