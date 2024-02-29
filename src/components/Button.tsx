import clsx from 'clsx';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode, forwardRef } from 'react';
import { IconType } from 'react-icons/';

const BASE =
  'flex cursor-pointer items-center justify-center space-x-2 rounded-lg border p-2 px-4 shadow-lg disabled:cursor-not-allowed disabled:border-none disabled:text-wl-gray-2 disabled:opacity-50 disabled:hover:bg-gray-300 disabled:hover:text-white';
export const VARIANT = ['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'light', 'dark', 'link', 'disabled', 'loading'] as const;
export const BUTTON_VARIANTS = {
  primary: BASE,
  secondary: `${BASE} bg-gray-50 text-white`,
  danger: `${BASE} bg-red-500 hover:bg-red-700 text-white`,
  success: `${BASE} bg-green-500 hover:bg-green-700 shadow-green-900 text-white`,
  warning: `${BASE} bg-yellow-500 hover:bg-yellow-700 text-white`,
  light: `${BASE} bg-white hover:bg-gray-100 text-gray-800 shadow`,
  dark: `${BASE} bg-wl-blue hover:bg-gray-700 text-white`,
  link: `${BASE} bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`,
  disabled: `${BASE} bg-gray-300 text-gray-500 cursor-not-allowed`,
  loading: `${BASE} bg-gray-300 text-gray-500 cursor-not-allowed`,
} as const;

type Variant = keyof typeof BUTTON_VARIANTS;
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  icon?: IconType;
  iconStyles?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: Variant;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = 'primary', className, text, icon: Icon = undefined, iconStyles, disabled = false, onClick, type = 'button' }, ref) => {
    return (
      <button ref={ref} type={type} onClick={onClick} disabled={disabled} className={clsx(BUTTON_VARIANTS[variant], className ?? '')}>
        {text && <span>{text}</span>}
        {Icon && <Icon className={clsx(iconStyles)} />}
        {children && children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
