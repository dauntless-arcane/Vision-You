import { Home } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
}

export default function Header({ onHomeClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className=" rounded-xl" >
              <img
                src="/CAPS_logo.png"
                alt="CAPS LOGO"
                className="h-12 w-auto object-contain rounded-xl"
              />

            </div>
            <h1 className="text-3xl font-bold text-gray-900">PathFinder </h1>
          </div>
          <button
            onClick={onHomeClick}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Home className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Home</span>
          </button>
        </div>
      </div>
    </header>
  );
}
