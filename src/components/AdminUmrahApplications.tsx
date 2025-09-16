import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, Phone, Mail, MapPin, Calendar, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getUmrahApplications, updateUmrahApplication } from '@/lib/firebase';
import type { UmrahApplication } from '@/lib/firebase';

const AdminUmrahApplications = () => {
  const [applications, setApplications] = useState<UmrahApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<UmrahApplication | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      const data = await getUmrahApplications();
      const sortedData = data.sort((a, b) => b.timestamp - a.timestamp);
      setApplications(sortedData);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load applications. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: 'approved' | 'rejected') => {
    try {
      await updateUmrahApplication(applicationId, { status });
      toast({
        title: 'Status Updated',
        description: `Application ${status} successfully.`,
      });
      await loadApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update application status.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const viewApplicationDetails = (application: UmrahApplication) => {
    setSelectedApplication(application);
    setIsDetailOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Umrah Visa Applications</h2>
          <p className="text-gray-600">Manage and track Umrah visa applications</p>
        </div>
        <Button onClick={loadApplications} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                </div>
                                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {applications.filter(a => a.status === 'pending').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {applications.filter(a => a.status === 'approved').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">
                    {applications.filter(a => a.status === 'rejected').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Passport</TableHead>
                    <TableHead>Travel Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application, index) => (
                    <motion.tr
                      key={application.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{application.name}</p>
                          <p className="text-sm text-gray-500">{application.country}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900">{application.email}</p>
                          <p className="text-sm text-gray-500">{application.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900">{application.passportNumber}</p>
                          {application.passportExpiry && (
                            <p className="text-xs text-gray-500">Exp: {application.passportExpiry}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {application.travelDate ? (
                          <span className="text-sm text-gray-600">
                            {new Date(application.travelDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">Not specified</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>{formatDate(application.timestamp)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewApplicationDetails(application)}
                          >
                            View
                          </Button>
                          {application.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateApplicationStatus(application.id, 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateApplicationStatus(application.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Name</p>
                    <p className="text-gray-600">{selectedApplication.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-gray-600">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <p className="text-gray-600">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Country</p>
                    <p className="text-gray-600">{selectedApplication.country}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium text-gray-700">Address</p>
                    <p className="text-gray-600">{selectedApplication.address}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">City</p>
                    <p className="text-gray-600">{selectedApplication.city}</p>
                  </div>
                </div>
              </div>

              {/* Passport Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Passport Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Passport Number</p>
                    <p className="text-gray-600">{selectedApplication.passportNumber}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Expiry Date</p>
                    <p className="text-gray-600">{selectedApplication.passportExpiry || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Travel Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Travel Date</p>
                    <p className="text-gray-600">
                      {selectedApplication.travelDate 
                        ? new Date(selectedApplication.travelDate).toLocaleDateString()
                        : 'Not specified'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Number of Travelers</p>
                    <p className="text-gray-600">{selectedApplication.numberOfTravelers || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Purpose</p>
                    <p className="text-gray-600">{selectedApplication.purpose || 'Not specified'}</p>
                  </div>
                </div>
                {selectedApplication.additionalNotes && (
                  <div>
                    <p className="font-medium text-gray-700">Additional Notes</p>
                    <p className="text-gray-600">{selectedApplication.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Application Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Application Status</h3>
                <div className="flex items-center gap-4">
                  {getStatusBadge(selectedApplication.status)}
                  <p className="text-sm text-gray-600">
                    Submitted on {formatDate(selectedApplication.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUmrahApplications; 