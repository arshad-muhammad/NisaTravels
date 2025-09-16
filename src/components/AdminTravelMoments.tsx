import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Upload, Image, MapPin, User, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getTravelMoments, addTravelMoment, updateTravelMoment, deleteTravelMoment } from '@/lib/firebase';
import { uploadImage } from '@/lib/cloudinary';
import type { TravelMoment, TravelMomentData } from '@/lib/firebase';

const AdminTravelMoments = () => {
  const [moments, setMoments] = useState<TravelMoment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMoment, setEditingMoment] = useState<TravelMoment | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<TravelMomentData>({
    image: '',
    alt: '',
    location: '',
    description: '',
    travelerName: '',
    category: ''
  });

  useEffect(() => {
    loadMoments();
  }, []);

  const loadMoments = async () => {
    try {
      setIsLoading(true);
      const data = await getTravelMoments();
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
      setMoments(sortedData);
    } catch (error) {
      console.error('Error loading travel moments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load travel moments. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      console.log('Starting image upload for travel moment...');
      const imageUrl = await uploadImage(file);
      console.log('Upload successful, URL:', imageUrl);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast({
        title: 'Image uploaded',
        description: 'Image uploaded successfully!',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image || !formData.alt || !formData.location) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields (Image, Alt Text, and Location).',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingMoment) {
        await updateTravelMoment(editingMoment.id, formData);
        toast({
          title: 'Travel Moment Updated',
          description: 'Travel moment updated successfully!',
        });
      } else {
        await addTravelMoment(formData);
        toast({
          title: 'Travel Moment Added',
          description: 'New travel moment added successfully!',
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      await loadMoments();
    } catch (error) {
      console.error('Error saving travel moment:', error);
      toast({
        title: 'Error',
        description: 'Failed to save travel moment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (moment: TravelMoment) => {
    setEditingMoment(moment);
    setFormData({
      image: moment.image,
      alt: moment.alt,
      location: moment.location,
      description: moment.description || '',
      travelerName: moment.travelerName || '',
      category: moment.category || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this travel moment?')) {
      try {
        await deleteTravelMoment(id);
        toast({
          title: 'Travel Moment Deleted',
          description: 'Travel moment deleted successfully!',
        });
        await loadMoments();
      } catch (error) {
        console.error('Error deleting travel moment:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete travel moment. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      image: '',
      alt: '',
      location: '',
      description: '',
      travelerName: '',
      category: ''
    });
    setEditingMoment(null);
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
          <h2 className="text-2xl font-bold text-gray-900">Travel Moments</h2>
          <p className="text-gray-600">Manage travel photos and stories shared by travelers</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Travel Moment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMoment ? 'Edit Travel Moment' : 'Add New Travel Moment'}
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Add a new travel moment with image and details
              </p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Image *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {formData.image ? (
                    <div className="space-y-4">
                      <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            console.log('File input changed:', e.target.files);
                            const file = e.target.files?.[0];
                            if (file) {
                              console.log('File selected:', file.name, file.size);
                              handleImageUpload(file);
                            } else {
                              console.log('No file selected');
                            }
                          }}
                          className="hidden"
                          id="image-upload-travel"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          disabled={uploadingImage}
                          className="cursor-pointer"
                          onClick={() => {
                            console.log('Upload button clicked');
                            const fileInput = document.getElementById('image-upload-travel') as HTMLInputElement;
                            if (fileInput) {
                              fileInput.click();
                            } else {
                              console.error('File input not found');
                            }
                          }}
                        >
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alt">Alt Text *</Label>
                  <Input
                    id="alt"
                    value={formData.alt}
                    onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
                    placeholder="Description of the image"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Swiss Alps, Maldives"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="travelerName">Traveler Name</Label>
                  <Input
                    id="travelerName"
                    value={formData.travelerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelerName: e.target.value }))}
                    placeholder="Who took this photo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nature">Nature</SelectItem>
                      <SelectItem value="City">City</SelectItem>
                      <SelectItem value="Beach">Beach</SelectItem>
                      <SelectItem value="Mountain">Mountain</SelectItem>
                      <SelectItem value="Culture">Culture</SelectItem>
                      <SelectItem value="Adventure">Adventure</SelectItem>
                      <SelectItem value="Wildlife">Wildlife</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell the story behind this moment..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingMoment ? 'Update Moment' : 'Add Moment'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Travel Moments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moments.map((moment, index) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={moment.image}
                  alt={moment.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(moment)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(moment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                                  {moment.category && (
                    <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {moment.category}
                    </div>
                  )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{moment.location}</h3>
                {moment.travelerName && (
                  <p className="text-sm text-gray-600 mb-2">By {moment.travelerName}</p>
                )}
                {moment.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">{moment.description}</p>
                )}
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                  <Image className="h-3 w-3" />
                  <span>{moment.alt}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {moments.length === 0 && (
        <div className="text-center py-12">
          <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No travel moments found</p>
          <p className="text-gray-400">Add your first travel moment to get started</p>
        </div>
      )}
    </div>
  );
};

export default AdminTravelMoments;
