import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Upload, Star, Package as PackageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getPackages, addPackage, updatePackage, deletePackage } from '@/lib/firebase';
import { uploadImage } from '@/lib/cloudinary';
import type { Package, PackageData } from '@/lib/firebase';

const AdminPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<PackageData>({
    title: '',
    image: '',
    duration: '',
    highlights: [],
    rating: 0,
    price: '',
    location: '',
    description: '',
    groupSize: ''
  });

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setIsLoading(true);
      const data = await getPackages();
      // Sort by creation date, newest first
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
      setPackages(sortedData);
    } catch (error) {
      console.error('Error loading packages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load packages. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      console.log('handleImageUpload called with file:', file.name, file.size);
      setUploadingImage(true);
      console.log('Starting upload process...');
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
    
    if (!formData.title || !formData.image || !formData.duration || !formData.price || !formData.location) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingPackage) {
        await updatePackage(editingPackage.id, formData);
        toast({
          title: 'Package Updated',
          description: 'Package updated successfully!',
        });
      } else {
        await addPackage(formData);
        toast({
          title: 'Package Added',
          description: 'New package added successfully!',
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      await loadPackages();
    } catch (error) {
      console.error('Error saving package:', error);
      toast({
        title: 'Error',
        description: 'Failed to save package. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      image: pkg.image,
      duration: pkg.duration,
      highlights: pkg.highlights,
      rating: pkg.rating,
      price: pkg.price,
      location: pkg.location,
      description: pkg.description || '',
      groupSize: pkg.groupSize || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
        toast({
          title: 'Package Deleted',
          description: 'Package deleted successfully!',
        });
        await loadPackages();
      } catch (error) {
        console.error('Error deleting package:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete package. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      duration: '',
      highlights: [],
      rating: 0,
      price: '',
      location: '',
      description: '',
      groupSize: ''
    });
    setEditingPackage(null);
  };

  const addHighlight = () => {
    const highlight = prompt('Enter highlight:');
    if (highlight) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlight]
      }));
    }
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
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
          <h2 className="text-2xl font-bold text-gray-900">Travel Packages</h2>
          <p className="text-gray-600">Manage travel packages and destinations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPackage ? 'Edit Package' : 'Add New Package'}
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Fill in the details below to {editingPackage ? 'update' : 'create'} a travel package.
              </p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Package title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Destination location"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 7 Days"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g., $1,299"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <Input
                  id="groupSize"
                  value={formData.groupSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, groupSize: e.target.value }))}
                  placeholder="e.g., 2-4 People"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Package description"
                  rows={3}
                />
              </div>

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
                          id="image-upload-packages"
                          ref={(input) => {
                            if (input) {
                              input.onclick = () => console.log('File input clicked');
                            }
                          }}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          disabled={uploadingImage} 
                          className="cursor-pointer"
                          onClick={() => {
                            console.log('Upload button clicked');
                            const fileInput = document.getElementById('image-upload-packages') as HTMLInputElement;
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

              <div className="space-y-2">
                <Label>Highlights</Label>
                <div className="space-y-2">
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={highlight}
                        onChange={(e) => {
                          const newHighlights = [...formData.highlights];
                          newHighlights[index] = e.target.value;
                          setFormData(prev => ({ ...prev, highlights: newHighlights }));
                        }}
                        placeholder="Highlight"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeHighlight(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addHighlight}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Highlight
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPackage ? 'Update Package' : 'Add Package'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(pkg)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(pkg.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-bold">{pkg.rating}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{pkg.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{pkg.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{pkg.price}</span>
                  <span className="text-sm text-gray-500">{pkg.duration}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {packages.length === 0 && (
        <div className="text-center py-12">
          <PackageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No packages found</p>
          <p className="text-gray-400">Add your first travel package to get started</p>
        </div>
      )}
    </div>
  );
};

export default AdminPackages; 