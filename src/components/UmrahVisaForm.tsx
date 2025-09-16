import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, User, Phone, MapPin, Calendar, FileText, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { submitUmrahApplication } from '@/lib/firebase';

interface UmrahVisaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UmrahApplicationData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  passportNumber: string;
  passportExpiry: string;
  travelDate: string;
  numberOfTravelers: string;
  purpose: string;
  additionalNotes: string;
}

const UmrahVisaForm = ({ isOpen, onClose }: UmrahVisaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<UmrahApplicationData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    passportNumber: '',
    passportExpiry: '',
    travelDate: '',
    numberOfTravelers: '',
    purpose: '',
    additionalNotes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.passportNumber) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await submitUmrahApplication(formData);
      
      toast({
        title: 'Application Submitted',
        description: 'Your Umrah visa application has been submitted successfully! We will contact you soon.',
      });
      
      // Reset form and close
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        passportNumber: '',
        passportExpiry: '',
        travelDate: '',
        numberOfTravelers: '',
        purpose: '',
        additionalNotes: ''
      });
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Submission Failed',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof UmrahApplicationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Umrah Visa Application
              </DialogTitle>
              <p className="text-sm text-gray-600 text-center">
                Please fill in all required information for your Umrah visa application
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UAE">UAE</SelectItem>
                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="Egypt">Egypt</SelectItem>
                        <SelectItem value="Turkey">Turkey</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
              </div>

              {/* Passport Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Passport Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passportNumber">Passport Number *</Label>
                    <Input
                      id="passportNumber"
                      value={formData.passportNumber}
                      onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                      placeholder="Enter passport number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passportExpiry">Passport Expiry Date</Label>
                    <Input
                      id="passportExpiry"
                      type="date"
                      value={formData.passportExpiry}
                      onChange={(e) => handleInputChange('passportExpiry', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Travel Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelDate">Preferred Travel Date</Label>
                    <Input
                      id="travelDate"
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => handleInputChange('travelDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
                    <Select value={formData.numberOfTravelers} onValueChange={(value) => handleInputChange('numberOfTravelers', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4 People</SelectItem>
                        <SelectItem value="5">5+ People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Visit</Label>
                  <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose of visit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Umrah">Umrah</SelectItem>
                      <SelectItem value="Hajj">Hajj</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Tourism">Tourism</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="Any additional information or special requirements"
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default UmrahVisaForm; 