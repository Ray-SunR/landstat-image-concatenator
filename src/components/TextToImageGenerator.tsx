'use client';

import { useState } from 'react';
import { ImageInfo } from '@/utils/imageUtils';

interface TextToImageGeneratorProps {
  allImages: ImageInfo[];
  onGenerateFromText: (text: string) => void;
  isProcessing?: boolean;
}

export default function TextToImageGenerator({ 
  allImages, 
  onGenerateFromText, 
  isProcessing = false 
}: TextToImageGeneratorProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onGenerateFromText(inputText.trim().toUpperCase());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setInputText(value);
  };

  // Get available letters from images
  const availableLetters = new Set(allImages.map(img => img.letter));
  
  // Check which letters in the input text have available images
  const getLetterStatus = (text: string) => {
    const letters = text.toUpperCase().replace(/\s/g, '').split('');
    const unavailableLetters = letters.filter(letter => !availableLetters.has(letter));
    return {
      totalLetters: letters.length,
      availableCount: letters.length - unavailableLetters.length,
      unavailableLetters: [...new Set(unavailableLetters)]
    };
  };

  const letterStatus = getLetterStatus(inputText);
  const canGenerate = inputText.trim().length > 0 && letterStatus.unavailableLetters.length === 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Generate from Text</h3>
      <p className="text-sm text-gray-600 mb-4">
        Enter text to automatically generate a concatenated image. Each letter will be randomly selected from available Landsat images.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text (letters only)..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg text-gray-900 placeholder-gray-500"
            disabled={isProcessing}
            maxLength={20} // Reasonable limit to prevent performance issues
          />
          
          {/* Input Status */}
          {inputText && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Letters: {letterStatus.totalLetters} | Available: {letterStatus.availableCount}
                </span>
                <span className="text-gray-500">
                  {inputText.length}/20
                </span>
              </div>
              
              {letterStatus.unavailableLetters.length > 0 && (
                <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                  <strong>Unavailable letters:</strong> {letterStatus.unavailableLetters.join(', ')}
                  <br />
                  <span className="text-xs">These letters don&apos;t have available Landsat images.</span>
                </div>
              )}
              
              {canGenerate && (
                <div className="text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                  ✓ Ready to generate! All letters have available images.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!canGenerate || isProcessing}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Generating...' : 'Generate Images'}
          </button>
          
          {inputText && (
            <button
              type="button"
              onClick={() => setInputText('')}
              className="px-4 py-3 text-sm bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Available Letters Display */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Available Letters:</h4>
        <div className="flex flex-wrap gap-1">
          {Array.from(availableLetters).sort().map(letter => (
            <span
              key={letter}
              className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-medium"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
