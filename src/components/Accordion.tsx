import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}
