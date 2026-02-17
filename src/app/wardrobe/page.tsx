import { WardrobeUploader } from "@/components/wardrobe-uploader";

export default function WardrobePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Your Digital Wardrobe
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Upload photos of your clothing and let AI categorize them. 
            Build your virtual wardrobe for smarter outfit recommendations.
          </p>
        </div>

        <WardrobeUploader />
      </div>
    </div>
  );
}
