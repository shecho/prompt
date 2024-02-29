'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';

export interface InputProps<TFieldValues extends FieldValues> {
  label?: string;
  id: Path<TFieldValues>;
  type?: string;
  required?: boolean;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}
interface ControlledInputProps<TFieldValues extends FieldValues> extends InputProps<TFieldValues> {
  label?: string;
  id: Path<TFieldValues>;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}
export const ControlledInput = forwardRef<HTMLInputElement, ControlledInputProps<FieldValues>>(({ className, label, id, errors, type = 'text', disabled, placeholder }, ref) => {
  return (
    <div className='flex w-full'>
      {label && (
        <label htmlFor={id} className='block font-sans text-sm font-semibold leading-6 text-gray-900'>
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        ref={ref}
        placeholder={placeholder}
        type={type}
        autoComplete={id}
        disabled={disabled}
        className={clsx(
          className,
          `block w-full appearance-none py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
          disabled ? 'cursor-default border border-wl-red opacity-50' : ''
        )}
      />
      {errors && <span className='text-xs text-wl-red'>{errors[id]?.message?.toString()}</span>}
    </div>
  );
});
ControlledInput.displayName = 'ControlledInput';

const Input = <TFieldValues extends FieldValues>({ className, label, id, register, required, errors, type = 'text', disabled, placeholder }: InputProps<TFieldValues>) => {
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='block font-sans text-xs text-wl-cyan-2'>
          {label}
        </label>
      )}
      <div className='w-full'>
        <input
          id={id}
          placeholder={placeholder}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, required ? { required: 'Campo requerido' } : {})}
          className={clsx(
            className,
            `block w-full appearance-none py-1.5 text-xs text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset disabled:cursor-not-allowed disabled:bg-transparent disabled:text-wl-gray-2 disabled:opacity-50 disabled:hover:bg-wl-gray-2 disabled:hover:text-white sm:text-sm sm:leading-6 md:text-sm`
          )}
          // aria-invalid={errors[id] ? 'true' : 'false'}
        />
        {errors && <span className='text-xs text-wl-red'>{errors[id]?.message?.toString()}</span>}
      </div>
    </div>
  );
};

export default Input;
