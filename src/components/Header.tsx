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
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl" />
            <h1 className="text-xl font-bold text-gray-900">Path Finder </h1>
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
