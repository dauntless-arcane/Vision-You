interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({ children, onClick, className = '' }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
