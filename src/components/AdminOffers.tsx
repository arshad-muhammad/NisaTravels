import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Upload, Tag, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getOffers, addOffer, updateOffer, deleteOffer } from '@/lib/firebase';
import { uploadImage } from '@/lib/cloudinary';
import type { Offer, OfferData } from '@/lib/firebase';

const AdminOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<OfferData>({
    title: '',
    image: '',
    description: '',
    originalPrice: 0,
    discountedPrice: 0,
    discount: 0,
    duration: '',
    groupSize: '',
    validUntil: '',
    highlights: []
  });

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setIsLoading(true);
      const data = await getOffers();
      // Sort by creation date, newest first
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
      setOffers(sortedData);
    } catch (error) {
      console.error('Error loading offers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load offers. Please try again.',
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
    
    if (!formData.title || !formData.image || !formData.description || !formData.validUntil) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Calculate discount percentage
    const discount = Math.round(((formData.originalPrice - formData.discountedPrice) / formData.originalPrice) * 100);
    const finalFormData = { ...formData, discount };

    try {
      if (editingOffer) {
        await updateOffer(editingOffer.id, finalFormData);
        toast({
          title: 'Offer Updated',
          description: 'Offer updated successfully!',
        });
      } else {
        await addOffer(finalFormData);
        toast({
          title: 'Offer Added',
          description: 'New offer added successfully!',
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      await loadOffers();
    } catch (error) {
      console.error('Error saving offer:', error);
      toast({
        title: 'Error',
        description: 'Failed to save offer. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      image: offer.image,
      description: offer.description,
      originalPrice: offer.originalPrice,
      discountedPrice: offer.discountedPrice,
      discount: offer.discount,
      duration: offer.duration,
      groupSize: offer.groupSize,
      validUntil: offer.validUntil,
      highlights: offer.highlights
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        await deleteOffer(id);
        toast({
          title: 'Offer Deleted',
          description: 'Offer deleted successfully!',
        });
        await loadOffers();
      } catch (error) {
        console.error('Error deleting offer:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete offer. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      description: '',
      originalPrice: 0,
      discountedPrice: 0,
      discount: 0,
      duration: '',
      groupSize: '',
      validUntil: '',
      highlights: []
    });
    setEditingOffer(null);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
          <h2 className="text-2xl font-bold text-gray-900">Special Offers</h2>
          <p className="text-gray-600">Manage special travel deals and promotions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingOffer ? 'Edit Offer' : 'Add New Offer'}
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Fill in the details below to {editingOffer ? 'update' : 'create'} a special offer.
              </p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Offer title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Offer description"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price *</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    min="0"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                    placeholder="1999"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountedPrice">Discounted Price *</Label>
                  <Input
                    id="discountedPrice"
                    type="number"
                    min="0"
                    value={formData.discountedPrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, discountedPrice: parseFloat(e.target.value) || 0 }))}
                    placeholder="1499"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="5 Days"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupSize">Group Size</Label>
                  <Input
                    id="groupSize"
                    value={formData.groupSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, groupSize: e.target.value }))}
                    placeholder="2-4 People"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until *</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                    required
                  />
                </div>
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
                          id="image-upload"
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
                            const fileInput = document.getElementById('image-upload') as HTMLInputElement;
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
                  {editingOffer ? 'Update Offer' : 'Add Offer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {offer.discount}% OFF
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(offer)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(offer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{offer.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-primary">${offer.discountedPrice}</span>
                  <span className="text-sm text-gray-400 line-through">${offer.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{offer.duration}</span>
                  <span>Valid until {formatDate(offer.validUntil)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {offers.length === 0 && (
        <div className="text-center py-12">
          <Tag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No offers found</p>
          <p className="text-gray-400">Add your first special offer to get started</p>
        </div>
      )}
    </div>
  );
};

export default AdminOffers; 