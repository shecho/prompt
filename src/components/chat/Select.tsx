'use client';

import React from 'react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { ChatModel } from '../../utils/types/chat';
import { ChatRequestKey } from '../../utils/const';
import { useChat } from '../../utils/context/chatContext';

const LABEL = '';
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  options: ChatModel[];
  disabled?: boolean;
  label?: string;
  register?: any;
  id: ChatRequestKey;
  className?: string;
  labelClassName?: string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const ControlledSelect = forwardRef<HTMLSelectElement, SelectProps>(({ className, labelClassName, id, options, disabled = false, label = LABEL }, ref) => {
  const { methods } = useChat();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className='w-full bg-wl-blue-2 font-light'>
      <label className={clsx(labelClassName ?? '', 'mb-1 block text-xs text-wl-cyan-2')}>{label}</label>
      <div>
        <select
          {...register(id)}
          disabled={disabled}
          className={clsx(
            className ?? '',
            'w-full border border-x-wl-blue-2 border-b-wl-cyan-2 border-t-wl-blue-2 bg-wl-blue-2 py-2 text-xs text-wl-cyan-2 shadow-lg shadow-wl-blue'
          )}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors && <span className='text-xs font-bold text-wl-red'>{errors[id]?.message?.toString()}</span>}
      </div>
    </div>
  );
});
ControlledSelect.displayName = 'ControlledSelect';

export const Select = ({ onChange, className, labelClassName, id, options, disabled = false, label = LABEL }: SelectProps) => {
  const { methods } = useChat();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className='w-full bg-wl-blue-2 font-light'>
      <label className={clsx(labelClassName ?? '', 'mb-1 block text-xs text-wl-cyan-2')}>{label}</label>
      <div>
        <select
          {...register(id)}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            className ?? '',
            'w-full border border-x-wl-blue-2 border-b-wl-cyan-2 border-t-wl-blue-2 bg-wl-blue-2 py-2 text-xs text-wl-cyan-2 shadow-lg shadow-wl-blue'
          )}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors && <span className='text-xs font-bold text-wl-red'>{errors[id]?.message?.toString()}</span>}
      </div>
    </div>
  );
};

export default Select;
