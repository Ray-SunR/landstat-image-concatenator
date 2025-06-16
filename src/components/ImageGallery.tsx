'use client';

import Image from 'next/image';
import { ImageInfo } from '@/utils/imageUtils';

interface SelectedImageInfo extends ImageInfo {
  selectionId: string;
  selectionOrder: number;
}

interface ImageGalleryProps {
  images: ImageInfo[];
  selectedImages: SelectedImageInfo[];
  onImageSelect: (image: ImageInfo) => void;
}

export default function ImageGallery({ images, selectedImages, onImageSelect }: ImageGalleryProps) {
  const getSelectionCount = (imageId: string): number => {
    return selectedImages.filter(img => img.id === imageId).length;
  };

  const isSelected = (imageId: string): boolean => {
    return selectedImages.some(img => img.id === imageId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Landsat Images</h2>
      <p className="text-sm text-gray-600 mb-4">
        Click on any image to add it to your selection. You can select the same image multiple times.
        Use the alphabet filter above to narrow down your choices.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image) => {
          const selected = isSelected(image.id);
          const count = getSelectionCount(image.id);
          
          return (
            <div
              key={image.id}
              className={`group relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                selected 
                  ? 'ring-3 ring-emerald-400 shadow-xl shadow-emerald-100' 
                  : 'hover:shadow-lg border border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onImageSelect(image)}
            >
              {/* Selection Count Badge - Elegant Design */}
              {selected && (
                <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full min-w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg px-2 border-2 border-white">
                  {count}
                </div>
              )}
              
              {/* Add Button Indicator - More Subtle */}
              <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 border border-emerald-200">
                +
              </div>
              
              {/* Image Container with Elegant Selection Effect */}
              <div className={`relative aspect-square overflow-hidden transition-all duration-300 ${
                selected ? 'brightness-110' : 'group-hover:brightness-105'
              }`}>
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                />
                
                {/* Elegant Selection Overlay */}
                {selected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-transparent to-teal-400/20 pointer-events-none" />
                )}
                
                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              {/* Image Name with Better Typography */}
              <div className={`p-3 transition-colors duration-300 ${
                selected ? 'bg-gradient-to-r from-emerald-50 to-teal-50' : 'bg-white'
              }`}>
                <p className={`text-sm font-medium text-center truncate transition-colors duration-300 ${
                  selected ? 'text-emerald-800' : 'text-gray-700'
                }`}>
                  {image.name}
                </p>
                <p className={`text-xs text-center truncate mt-1 transition-colors duration-300 ${
                  selected ? 'text-emerald-600' : 'text-gray-500'
                }`}>
                  {image.description}
                </p>
              </div>
              
              {/* Selection Glow Effect */}
              {selected && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-20 pointer-events-none animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
      
      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No images found. Make sure the landsat images are in the public/landsat_images folder.</p>
        </div>
      )}
    </div>
  );
}
