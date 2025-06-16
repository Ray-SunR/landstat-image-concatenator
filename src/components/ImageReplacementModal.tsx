'use client';

import { useState, useEffect } from 'react';
import { ImageInfo } from '@/utils/imageUtils';

interface SelectedImageInfo extends ImageInfo {
  selectionId: string;
  selectionOrder: number;
}

interface ImageReplacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetImage: SelectedImageInfo | null;
  availableImages: ImageInfo[];
  onReplace: (targetSelectionId: string, newImage: ImageInfo) => void;
}

export default function ImageReplacementModal({
  isOpen,
  onClose,
  targetImage,
  availableImages,
  onReplace
}: ImageReplacementModalProps) {
  const [selectedReplacement, setSelectedReplacement] = useState<ImageInfo | null>(null);

  // Reset selection when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedReplacement(null);
    }
  }, [isOpen]);

  if (!isOpen || !targetImage) return null;

  // Filter images to show only those with the same letter
  const sameLetterImages = availableImages.filter(img => img.letter === targetImage.letter);

  const handleReplace = () => {
    if (selectedReplacement && targetImage) {
      onReplace(targetImage.selectionId, selectedReplacement);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Replace Image: {targetImage.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Choose a different &quot;{targetImage.letter}&quot; image to replace the current selection
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Current Image Display */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Current Image:</h3>
          <div className="flex items-center gap-4">
            <img
              src={targetImage.src}
              alt={targetImage.description}
              className="w-20 h-20 object-cover rounded-lg border-2 border-emerald-500"
            />
            <div>
              <p className="font-medium text-gray-800">{targetImage.name}</p>
              <p className="text-sm text-gray-600">{targetImage.description}</p>
              <p className="text-xs text-emerald-600 mt-1">Position #{targetImage.selectionOrder}</p>
            </div>
          </div>
        </div>

        {/* Replacement Options */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Choose Replacement (Letter &quot;{targetImage.letter}&quot; - {sameLetterImages.length} available):
          </h3>
          
          {sameLetterImages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No other images available for letter &quot;{targetImage.letter}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sameLetterImages.map((image) => (
                <div
                  key={image.id}
                  className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                    selectedReplacement?.id === image.id
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                      : image.id === targetImage.id
                      ? 'border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-md hover:scale-102'
                  }`}
                  onClick={() => {
                    if (image.id !== targetImage.id) {
                      setSelectedReplacement(image);
                    }
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.description}
                    className="w-full h-24 object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <p className="font-medium text-sm text-gray-800 truncate">
                      {image.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {image.description}
                    </p>
                    {image.id === targetImage.id && (
                      <p className="text-xs text-gray-500 mt-1 italic">Current selection</p>
                    )}
                    {selectedReplacement?.id === image.id && (
                      <p className="text-xs text-emerald-600 mt-1 font-medium">✓ Selected</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={handleReplace}
            disabled={!selectedReplacement}
            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            Replace Image
          </button>
        </div>
      </div>
    </div>
  );
}
