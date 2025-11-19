interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
    outline: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
}
