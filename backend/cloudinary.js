const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'travel-stories',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

// Function to delete image from Cloudinary
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};

// Extract public ID from Cloudinary URL
const getPublicIdFromUrl = (imageUrl) => {
    try {
        // Cloudinary URLs typically look like:
        // https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{format}
        const urlParts = imageUrl.split('/');
        const uploadIndex = urlParts.indexOf('upload');
        if (uploadIndex !== -1) {
            // Get everything after 'upload/v{version}/' and remove file extension
            const pathParts = urlParts.slice(uploadIndex + 2).join('/');
            const publicId = pathParts.replace(/\.[^/.]+$/, ''); // Remove file extension
            return publicId;
        }
        return null;
    } catch (error) {
        console.error('Error extracting public ID:', error);
        return null;
    }
};

module.exports = { upload, deleteImage, getPublicIdFromUrl, cloudinary };
