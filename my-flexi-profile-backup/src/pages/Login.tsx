import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { LogIn, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      const from = location.state?.from?.pathname || (user.role === 'role:HR' ? '/hr_dashboard' : '/dashboard');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setErrors({});
      const result = await login(email, password);
      if (result.isAuthenticated) {
        toast({
          title: 'Login successful',
          description: 'Welcome back to ProfileBuilder!',
        });
        // Clear form
        setEmail('');
        setPassword('');
        // Get user data and print it
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        console.log('User data after login:', user);
        // Immediate navigation based on user role
        const redirectPath = user.role === 'role:HR' ? '/hr_dashboard' : '/dashboard';
        navigate(redirectPath, { replace: true });
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid email or password';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      // Show error toast
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
      
      // Set field-specific errors if available
      if (errorMessage.toLowerCase().includes('email')) {
        setErrors({ email: errorMessage });
      } else if (errorMessage.toLowerCase().includes('password')) {
        setErrors({ password: errorMessage });
      } else {
        setErrors({ 
          email: errorMessage,
          password: errorMessage 
        });
      }
      
      // Clear password field for security
      setPassword('');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-t-4 border-t-blue-500 animate-fade-in">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <User size={30} className="text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
              <p className="text-gray-500 text-sm">Sign in to continue to ProfileBuilder</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLoginForm} className="space-y-5">
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  error={errors.email}
                  disabled={isLoading}
                  className="transition-all duration-200"
                />

                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  error={errors.password}
                  disabled={isLoading}
                  className="transition-all duration-200"
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full transition-all duration-300 hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Logging in...
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        <LogIn size={16} />
                        Sign In
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <p className="text-sm text-gray-600 text-center w-full">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  Create Account
                </Link>
              </p>
              <div className="w-full border-t pt-4">
                <Link to="/" className="text-gray-500 text-xs hover:text-gray-700 text-center block">
                  ← Back to Home
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
