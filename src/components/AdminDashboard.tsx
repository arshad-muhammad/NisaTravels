import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Users, Package, Tag, Plus, Database, FileText, Camera } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AdminBookings from './AdminBookings';
import AdminPackages from './AdminPackages';
import AdminOffers from './AdminOffers';
import AdminUmrahApplications from './AdminUmrahApplications';
import AdminTravelMoments from './AdminTravelMoments';
import { addSampleData } from '@/lib/sampleData';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('bookings');
  const { toast } = useToast();

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    onLogout();
  };

  const handleAddSampleData = async () => {
    try {
      await addSampleData();
      toast({
        title: 'Sample data added',
        description: 'Sample packages and offers have been added to Firebase.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add sample data.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
                          <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Nisa Travels Admin</h1>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
                             <Button
                 onClick={handleAddSampleData}
                 variant="outline"
                 className="flex items-center space-x-2 text-primary hover:text-primary-600 hover:border-primary"
               >
                <Database className="h-4 w-4" />
                <span>Add Sample Data</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:border-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                         <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm border border-gray-200">
               <TabsTrigger 
                 value="bookings" 
                 className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                <Users className="h-4 w-4" />
                <span>Bookings</span>
              </TabsTrigger>
                             <TabsTrigger 
                 value="packages" 
                 className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                 <Package className="h-4 w-4" />
                 <span>Packages</span>
               </TabsTrigger>
               <TabsTrigger 
                 value="offers" 
                 className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                 <Tag className="h-4 w-4" />
                 <span>Offers</span>
               </TabsTrigger>
               <TabsTrigger 
                 value="umrah" 
                 className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                 <FileText className="h-4 w-4" />
                 <span>Umrah</span>
               </TabsTrigger>
               <TabsTrigger 
                 value="moments" 
                 className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-white"
               >
                 <Camera className="h-4 w-4" />
                 <span>Moments</span>
               </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <AdminBookings />
            </TabsContent>

            <TabsContent value="packages" className="space-y-6">
              <AdminPackages />
            </TabsContent>

            <TabsContent value="offers" className="space-y-6">
              <AdminOffers />
            </TabsContent>
            <TabsContent value="umrah" className="space-y-6">
              <AdminUmrahApplications />
            </TabsContent>
            <TabsContent value="moments" className="space-y-6">
              <AdminTravelMoments />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard; 