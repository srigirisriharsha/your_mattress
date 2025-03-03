import React from 'react';

const ImagesUploader = (props) => {
  const { images, setImages } = props;
  // Handle image upload
  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  // Handle image delete
  const handleImageDelete = (index) => {
    setImages(images.filter((_, imgIndex) => imgIndex !== index));
  };

  return (
    <div className="p-5 w-full bg-gray-50 mt-6">
      {/* Upload Button */}
      <div className="text-xl font-semibold">
        Add Images <span className="text-red-400">*</span>
      </div>
      <div className="flex justify-center">
        <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded">
          Upload Images
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
      <p className="text-center text-gray-600">
        Note : The First Uploaded Image is considered as the Product Thumbail
      </p>
      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => handleImageDelete(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-3xl"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesUploader;
