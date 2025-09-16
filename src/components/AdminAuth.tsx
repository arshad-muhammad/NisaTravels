import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (code === 'nisa@4') {
      // Store authentication in session storage
      sessionStorage.setItem('adminAuthenticated', 'true');
      toast({
        title: 'Access granted',
        description: 'Welcome to the admin panel!',
      });
      onAuthenticated();
    } else {
      toast({
        title: 'Access denied',
        description: 'Invalid admin code. Please try again.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Access
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Enter the admin code to access the dashboard
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium text-gray-700">
                  Admin Code
                </label>
                <div className="relative">
                  <Input
                    id="code"
                    type={showPassword ? 'text' : 'password'}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter admin code"
                    className="pr-10 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gradient-bg hover:from-primary-600 hover:to-primary-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Access Dashboard'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-sm text-primary-800 text-center">
                <strong>Note:</strong> This is a secure admin area. Only authorized personnel should access this panel.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminAuth; 