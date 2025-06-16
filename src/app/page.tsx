'use client';

import ImageConcatenator from '@/components/ImageConcatenator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Landsat Image Concatenator
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Select landsat images by clicking on them. You can select the same image multiple times to repeat it in the sequence. 
          Use the alphabet filter to narrow your choices, then drag and drop to reorder your selection. 
          Watch the live preview update automatically as you make changes.
        </p>
        <ImageConcatenator />
      </div>
    </div>
  );
}
