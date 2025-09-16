// Cloudinary configuration for browser
const CLOUDINARY_CLOUD_NAME = 'dimxynois';
const CLOUDINARY_UPLOAD_PRESET = 'nisatravels'; // You'll need to create this preset in Cloudinary

export const uploadImage = async (file: File): Promise<string> => {
  try {
    console.log('Starting image upload to Cloudinary...');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    console.log('Uploading to:', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
    console.log('Upload preset:', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload response error:', errorText);
      throw new Error(`Upload failed: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Upload response data:', data);
    
    if (data.secure_url) {
      console.log('Upload successful, URL:', data.secure_url);
      return data.secure_url;
    } else {
      console.error('No secure URL in response:', data);
      throw new Error('Upload failed: No secure URL returned');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    // For browser-side deletion, you would need to implement a server endpoint
    // or use signed uploads with deletion tokens
    console.warn('Image deletion not implemented for browser. Use server-side deletion.');
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Export cloudinary config for reference
export const cloudinaryConfig = {
  cloud_name: CLOUDINARY_CLOUD_NAME,
  upload_preset: CLOUDINARY_UPLOAD_PRESET
}; 