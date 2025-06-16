'use client';

import { useState, useEffect } from 'react';
import { getLandsatImages, concatenateImages, downloadImage, ImageInfo, getAvailableLetters } from '@/utils/imageUtils';
import ImageGallery from './ImageGallery';
import ConcatenationPreview from './ConcatenationPreview';
import DraggablePreview from './DraggablePreview';
import TextToImageGenerator from './TextToImageGenerator';
import ImageReplacementModal from './ImageReplacementModal';

interface SelectedImageInfo extends ImageInfo {
  selectionId: string;
  selectionOrder: number;
}

export default function ImageConcatenator() {
  const [allImages, setAllImages] = useState<ImageInfo[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageInfo[]>([]);
  const [selectedImages, setSelectedImages] = useState<SelectedImageInfo[]>([]);
  const [concatenatedImageUrl, setConcatenatedImageUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [draggedChipId, setDraggedChipId] = useState<string | null>(null);
  const [isGeneratingFromText, setIsGeneratingFromText] = useState(false);
  const [replacementModal, setReplacementModal] = useState<{
    isOpen: boolean;
    targetImage: SelectedImageInfo | null;
  }>({ isOpen: false, targetImage: null });

  useEffect(() => {
    const images = getLandsatImages();
    const letters = getAvailableLetters();
    setAllImages(images);
    setFilteredImages(images);
    setAvailableLetters(letters);
  }, []);

  // Filter images when filter changes
  useEffect(() => {
    if (selectedFilter === 'ALL') {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(allImages.filter(img => img.letter === selectedFilter));
    }
  }, [selectedFilter, allImages]);

  const handleImageSelect = (image: ImageInfo) => {
    // Check if this image is already selected
    const existingSelection = selectedImages.find(selected => selected.id === image.id);
    
    if (existingSelection) {
      // If image is already selected, open replacement modal
      setReplacementModal({
        isOpen: true,
        targetImage: existingSelection
      });
    } else {
      // Add new selection
      const newSelection: SelectedImageInfo = {
        ...image,
        selectionId: `${image.id}-${Date.now()}-${Math.random()}`,
        selectionOrder: selectedImages.length + 1
      };
      setSelectedImages(prev => [...prev, newSelection]);
    }
  };

  const handleGenerateFromText = async (text: string) => {
    setIsGeneratingFromText(true);
    try {
      // Clear current selection
      setSelectedImages([]);
      setConcatenatedImageUrl('');
      
      // Process each letter in the text
      const letters = text.replace(/\s/g, '').split('');
      const newSelections: SelectedImageInfo[] = [];
      
      letters.forEach((letter, index) => {
        // Find all images for this letter
        const letterImages = allImages.filter(img => img.letter === letter);
        
        if (letterImages.length > 0) {
          // Randomly select one image for this letter
          const randomImage = letterImages[Math.floor(Math.random() * letterImages.length)];
          
          const newSelection: SelectedImageInfo = {
            ...randomImage,
            selectionId: `${randomImage.id}-${Date.now()}-${Math.random()}-${index}`,
            selectionOrder: index + 1
          };
          
          newSelections.push(newSelection);
        }
      });
      
      setSelectedImages(newSelections);
    } catch (error) {
      console.error('Error generating from text:', error);
      alert('Error generating images from text. Please try again.');
    } finally {
      setIsGeneratingFromText(false);
    }
  };

  const handleReplaceImage = (targetSelectionId: string, newImage: ImageInfo) => {
    setSelectedImages(prev => 
      prev.map(selected => {
        if (selected.selectionId === targetSelectionId) {
          return {
            ...newImage,
            selectionId: selected.selectionId,
            selectionOrder: selected.selectionOrder
          };
        }
        return selected;
      })
    );
  };

  const handleReplaceFromPreview = (targetImage: SelectedImageInfo) => {
    setReplacementModal({
      isOpen: true,
      targetImage: targetImage
    });
  };

  const handleCloseReplacementModal = () => {
    setReplacementModal({ isOpen: false, targetImage: null });
  };

  const handleRemoveSelection = (selectionId: string) => {
    setSelectedImages(prev => {
      const filtered = prev.filter(selected => selected.selectionId !== selectionId);
      // Reorder the remaining selections
      return filtered.map((item, index) => ({
        ...item,
        selectionOrder: index + 1
      }));
    });
  };

  const handleReorderImages = (draggedSelectionId: string, targetSelectionId: string) => {
    if (draggedSelectionId === targetSelectionId) return;

    setSelectedImages(prev => {
      const draggedIndex = prev.findIndex(item => item.selectionId === draggedSelectionId);
      const targetIndex = prev.findIndex(item => item.selectionId === targetSelectionId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const newOrder = [...prev];
      const [draggedItem] = newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedItem);

      // Reorder all items
      return newOrder.map((item, index) => ({
        ...item,
        selectionOrder: index + 1
      }));
    });
  };

  const handleDragStart = (e: React.DragEvent, selectionId: string) => {
    e.dataTransfer.setData('text/plain', selectionId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedChipId(selectionId);
  };

  const handleDragEnd = () => {
    setDraggedChipId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSelectionId: string) => {
    e.preventDefault();
    const draggedSelectionId = e.dataTransfer.getData('text/plain');
    handleReorderImages(draggedSelectionId, targetSelectionId);
    setDraggedChipId(null);
  };

  const handleClearSelection = () => {
    setSelectedImages([]);
    setConcatenatedImageUrl('');
  };

  // Auto-generate preview when selection changes
  useEffect(() => {
    const generatePreview = async () => {
      if (selectedImages.length === 0) {
        setConcatenatedImageUrl('');
        setIsGeneratingPreview(false);
        return;
      }

      // Don't clear the existing image immediately - keep it while processing
      setIsGeneratingPreview(true);
      try {
        const imageSrcs = selectedImages.map(img => img.src);
        const concatenatedUrl = await concatenateImages(imageSrcs, 300); // Smaller height for preview
        setConcatenatedImageUrl(concatenatedUrl);
      } catch (error) {
        console.error('Error generating preview:', error);
        // Only clear on error, don't clear the previous image
      } finally {
        setIsGeneratingPreview(false);
      }
    };

    // Debounce the preview generation to avoid too many calls
    const timeoutId = setTimeout(generatePreview, 150); // Further reduced debounce time
    return () => clearTimeout(timeoutId);
  }, [selectedImages]);

  const handleDownloadHighRes = async () => {
    if (selectedImages.length === 0) return;

    setIsProcessing(true);
    try {
      const imageSrcs = selectedImages.map(img => img.src);
      const highResUrl = await concatenateImages(imageSrcs, 600); // Higher resolution for download
      const filename = `landsat-concatenated-${Date.now()}.png`;
      downloadImage(highResUrl, filename);
    } catch (error) {
      console.error('Error creating high-res image:', error);
      alert('Error creating high-res image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Text to Image Generator */}
      <TextToImageGenerator
        allImages={allImages}
        onGenerateFromText={handleGenerateFromText}
        isProcessing={isGeneratingFromText}
      />

      {/* Alphabet Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter by Letter</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedFilter === 'ALL'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            ALL
          </button>
          {availableLetters.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedFilter(letter)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedFilter === letter
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Showing {selectedFilter === 'ALL' ? 'all' : `letter ${selectedFilter}`} images 
          ({filteredImages.length} total)
        </p>
      </div>

      {/* Draggable Preview Section */}
      {selectedImages.length > 0 && (
        <DraggablePreview
          selectedImages={selectedImages}
          onReorder={handleReorderImages}
          onRemove={handleRemoveSelection}
          onReplace={handleReplaceFromPreview}
          isProcessing={isGeneratingPreview}
        />
      )}

      {/* Live Preview Section - Moved Up */}
      {(concatenatedImageUrl || isGeneratingPreview) && (
        <ConcatenationPreview 
          imageUrl={concatenatedImageUrl} 
          isProcessing={isGeneratingPreview}
          selectedCount={selectedImages.length}
        />
      )}
      {/* Control Panel */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              Selected: {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''}
            </span>
            {selectedImages.length > 0 && (
              <button
                onClick={handleClearSelection}
                className="px-4 py-2 text-sm bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            {selectedImages.length > 0 && (
              <button
                onClick={handleDownloadHighRes}
                disabled={isProcessing}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                {isProcessing ? 'Generating...' : 'Download High-Res'}
              </button>
            )}
          </div>
        </div>

        {/* Selection Order Display */}
        {selectedImages.length > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
            <p className="text-sm font-medium text-emerald-800 mb-3">
              Selection Order (drag to reorder, click to replace):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedImages.map((selectedImage) => (
                <span
                  key={selectedImage.selectionId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, selectedImage.selectionId)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, selectedImage.selectionId)}
                  onClick={() => setReplacementModal({ isOpen: true, targetImage: selectedImage })}
                  className={`px-3 py-2 bg-white text-emerald-800 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm border border-emerald-200 transition-all duration-200 cursor-pointer ${
                    draggedChipId === selectedImage.selectionId
                      ? 'shadow-xl scale-105 opacity-75 border-emerald-500'
                      : 'hover:shadow-md hover:scale-105 hover:bg-emerald-50'
                  }`}
                  title="Drag to reorder or click to replace"
                >
                  <span className="text-gray-400 text-xs">⋮⋮</span>
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {selectedImage.selectionOrder}
                  </span>
                  {selectedImage.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSelection(selectedImage.selectionId);
                    }}
                    className="ml-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm transition-colors"
                    title="Remove this selection"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <p className="text-xs text-emerald-600 mt-2">
              💡 Drag and drop to reorder • Click chips to replace images • Click × to remove
            </p>
          </div>
        )}
      </div>

      {/* Image Gallery */}
      <ImageGallery
        images={filteredImages}
        selectedImages={selectedImages}
        onImageSelect={handleImageSelect}
      />

      {/* Image Replacement Modal */}
      <ImageReplacementModal
        isOpen={replacementModal.isOpen}
        onClose={handleCloseReplacementModal}
        targetImage={replacementModal.targetImage}
        availableImages={allImages}
        onReplace={handleReplaceImage}
      />
    </div>
  );
}
