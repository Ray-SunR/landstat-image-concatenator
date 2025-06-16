'use client';

interface ConcatenationPreviewProps {
  imageUrl: string;
  isProcessing?: boolean;
  selectedCount?: number;
}

export default function ConcatenationPreview({ imageUrl, isProcessing = false, selectedCount = 0 }: ConcatenationPreviewProps) {
  if (!imageUrl && !isProcessing) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Live Preview {selectedCount > 0 && `(${selectedCount} images)`}
        {isProcessing && (
          <span className="ml-2 text-sm text-emerald-600 font-normal">
            Updating...
          </span>
        )}
      </h2>
      
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 relative">
        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
              <span className="text-gray-600 text-sm">Updating preview...</span>
            </div>
          </div>
        )}
        
        {imageUrl ? (
          <div className={`relative w-full transition-opacity duration-200 ${isProcessing ? 'opacity-50' : 'opacity-100'}`}>
            <img
              src={imageUrl}
              alt="Live preview of concatenated landsat images"
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-48">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Generating preview...</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>✓ Preview updates automatically as you select images</p>
        <p>✓ Click &quot;Download High-Res&quot; to save a higher quality version</p>
      </div>
    </div>
  );
}
