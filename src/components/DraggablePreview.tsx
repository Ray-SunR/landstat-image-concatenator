'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageInfo } from '@/utils/imageUtils';

interface SelectedImageInfo extends ImageInfo {
  selectionId: string;
  selectionOrder: number;
}

interface DraggablePreviewProps {
  selectedImages: SelectedImageInfo[];
  onReorder: (draggedId: string, targetId: string) => void;
  onRemove: (selectionId: string) => void;
  onReplace?: (targetImage: SelectedImageInfo) => void;
  isProcessing?: boolean;
}

export default function DraggablePreview({ selectedImages, onReorder, onRemove, onReplace, isProcessing = false }: DraggablePreviewProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, selectionId: string) => {
    e.dataTransfer.setData('text/plain', selectionId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedId(selectionId);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSelectionId: string) => {
    e.preventDefault();
    const draggedSelectionId = e.dataTransfer.getData('text/plain');
    
    if (draggedSelectionId !== targetSelectionId) {
      onReorder(draggedSelectionId, targetSelectionId);
    }
    setDraggedId(null);
  };

  const handleImageClick = (selectedImage: SelectedImageInfo, e: React.MouseEvent) => {
    // Only trigger replace if onReplace is provided and the click wasn't on a button
    if (onReplace && !(e.target as HTMLElement).closest('button')) {
      onReplace(selectedImage);
    }
  };

  if (selectedImages.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Selected Images Preview (drag to reorder{onReplace ? ', click to replace' : ''})
        {isProcessing && (
          <span className="ml-2 text-sm text-emerald-600 font-normal">
            Updating...
          </span>
        )}
      </h3>
      
      <div className="flex flex-wrap gap-4 mb-4">
        {selectedImages.map((selectedImage) => (
          <div
            key={selectedImage.selectionId}
            draggable
            onDragStart={(e) => handleDragStart(e, selectedImage.selectionId)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, selectedImage.selectionId)}
            onClick={(e) => handleImageClick(selectedImage, e)}
            className={`relative group transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              draggedId === selectedImage.selectionId
                ? 'border-emerald-500 shadow-xl scale-105 opacity-75'
                : 'border-emerald-200 hover:border-emerald-400'
            } ${
              onReplace 
                ? 'cursor-pointer bg-white rounded-lg border-2' 
                : 'cursor-move bg-white rounded-lg border-2'
            }`}
            title={onReplace ? "Drag to reorder or click to replace" : "Drag to reorder"}
          >
            {/* Drag Handle */}
            <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-sm">
              ⋮⋮
            </div>
            
            {/* Replace Indicator - Only show if onReplace is provided */}
            {onReplace && (
              <div className="absolute bottom-2 left-2 z-10 bg-orange-500/90 backdrop-blur-sm text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                ↻
              </div>
            )}
            
            {/* Order Badge */}
            <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
              {selectedImage.selectionOrder}
            </div>
            
            {/* Remove Button */}
            <button
              onClick={() => onRemove(selectedImage.selectionId)}
              className="absolute top-8 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove this image"
            >
              ×
            </button>
            
            {/* Image */}
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.description}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            
            {/* Image Info */}
            <div className="p-2 text-center">
              <p className="text-xs font-medium text-gray-700 truncate">
                {selectedImage.name}
              </p>
            </div>
            
            {/* Drag Overlay */}
            <div className="absolute inset-0 bg-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
          </div>
        ))}
      </div>
      
      <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        <p className="flex items-center gap-2">
          <span className="text-emerald-600">💡</span>
          <strong>Tip:</strong> Drag and drop the image thumbnails above to change their order in the final concatenated image.
          {onReplace && <span> Click on any image to replace it with another image of the same letter.</span>}
        </p>
      </div>
    </div>
  );
}
