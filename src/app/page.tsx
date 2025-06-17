'use client';

import ImageConcatenator from '@/components/ImageConcatenator';
import MadeWithLove from '@/components/MadeWithLove';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Landsat Image Concatenator
        </h1>
        <p className="text-center text-emerald-600 mb-6 text-lg font-medium italic">
          The World Spells For You
        </p>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Create stunning word art using real NASA Landsat satellite images! Enter any text to automatically generate concatenated images where each letter is formed by breathtaking Earth imagery captured from space. You can also manually select specific satellite images by clicking on them, replace any selection with alternative images of the same letter, and drag to reorder your sequence. Watch the live preview update automatically as you craft your personalized message from our planet&apos;s most beautiful landscapes.
        </p>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Made with love by Renchen ❤️
        </p>
        <ImageConcatenator />
      </div>
      
      {/* Floating "Made with Love" component */}
      <MadeWithLove />
    </div>
  );
}
