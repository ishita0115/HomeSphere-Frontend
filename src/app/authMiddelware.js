
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const authMiddleware = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-surface-secondary flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-card p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
              </svg>
            </div>
            <h2 className="font-heading font-bold text-xl text-primary mb-2">Sign In Required</h2>
            <p className="text-navy-400 text-sm mb-6">
              You need to be signed in to access this page. Redirecting you to the home page&hellip;
            </p>
            <div className="w-8 h-1 bg-accent rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default authMiddleware;
