import React from 'react';
import Select from './Select';
import Input from '../Input';
import { useChat } from '../../utils/context/chatContext';
import { MODEL_OPTIONS } from '../../utils/const';

const ToolPicker = () => {
  const { methods, handleSelect } = useChat();

  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  const [temperature, modelName] = watch(['temperature', 'model_name']);
  const isInternal = modelName?.includes('wize');

  return (
    <div className='z-50 w-full bg-wl-blue-2'>
      <div className='flex w-full max-w-5xl flex-col justify-center bg-wl-blue-2 p-4 md:px-8 lg:mx-auto '>
        <p className='mb-8 font-bold text-wl-cyan-2 md:text-xl'>Which tool would you like to use?</p>
        <div className='grid grid-cols-2 justify-items-center gap-x-8 gap-y-4 md:grid-cols-3'>
          <Select onChange={handleSelect} register={register} label='Select a model' options={MODEL_OPTIONS} id='model_name' />
          <Input
            disabled={isInternal}
            label='Customize Chatbot Rules'
            id='model_type'
            className='mt-3 w-full border-b border-x-wl-blue border-t-wl-blue bg-wl-blue-2 px-2 capitalize text-wl-cyan-2 shadow-lg shadow-wl-blue focus:outline-none active:outline-none md:mt-2'
            placeholder='model_type'
            register={register}
            errors={errors}
          />
          <div className='col-span-2 flex w-full flex-col md:col-span-1'>
            <label htmlFor='temperature' className='mb-4 block text-xs text-wl-cyan-2 '>
              AI creativity (%)
            </label>
            <Input
              disabled={isInternal}
              id='temperature'
              type='range'
              className='h-1 w-full rounded-xl bg-wl-blue-3 text-white accent-wl-cyan-2 active:bg-wl-cyan-2'
              placeholder='Creativity'
              register={register}
              errors={errors}
            />
            {temperature && <span className='mx-auto mt-2 text-xs font-bold text-wl-cyan-2'>{temperature}%</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPicker;
