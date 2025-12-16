import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById('modal-root') || document.body;
  return createPortal(children, modalRoot);
}