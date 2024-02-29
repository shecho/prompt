'use client';

import Image from 'next/image';
import Modal from './Modal';

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='h-80 w-80'>
        <Image className='object-cover' fill alt='Image' src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
