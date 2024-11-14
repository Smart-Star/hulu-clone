import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  variant: 'outline' | 'fill';
};

export const Button = ({ children, variant }: Props) => {
  return (
    <button
      className={`flex items-center gap-1 px-5 py-2 rounded-[3px] uppercase font-medium ${variant === 'outline' ? 'outline outline-2 outline-white -outline-offset-2 hover:scale-110' : 'bg-white text-black hover:scale-110'} duration-300`}
    >
      {children}
    </button>
  );
};
