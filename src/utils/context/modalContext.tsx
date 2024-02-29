import { useBoolean } from 'ahooks';
import React, { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

interface ModalContextValue {
  drawerModal: boolean;
  openDrawerModal: () => void;
  closeDrawerModal: () => void;
  confirmModal: boolean;
  openConfirmModal: () => void;
  closeConfirmModal: () => void;
  rateModal: boolean;
  openRateModal: () => void;
  closeRateModal: () => void;
  resetModal: boolean;
  openResetModal: () => void;
  closeResetModal: () => void;
}
const Noop = () => {};
export const ModalContext = createContext<ModalContextValue>({
  drawerModal: false,
  openDrawerModal: Noop,
  closeDrawerModal: Noop,
  confirmModal: false,
  openConfirmModal: Noop,
  closeConfirmModal: Noop,
  rateModal: false,
  openRateModal: Noop,
  closeRateModal: Noop,
  resetModal: false,
  openResetModal: Noop,
  closeResetModal: Noop,
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [drawer, { setTrue: openDrawer, setFalse: closeDrawer }] = useBoolean(false);
  const [confirm, { setTrue: openConfirm, setFalse: closeConfirm }] = useBoolean(false);
  const [rate, { setTrue: openRate, setFalse: closeRate }] = useBoolean(false);
  const [reset, { setTrue: openReset, setFalse: closeReset }] = useBoolean(false);

  const drawerModal = useMemo(() => drawer, [drawer]);
  const confirmModal = useMemo(() => confirm, [confirm]);
  const rateModal = useMemo(() => rate, [rate]);
  const resetModal = useMemo(() => reset, [reset]);

  const openDrawerModal = useCallback(() => openDrawer(), [openDrawer]);
  const closeDrawerModal = useCallback(() => closeDrawer(), [closeDrawer]);
  const openConfirmModal = useCallback(() => openConfirm(), [openConfirm]);
  const closeConfirmModal = useCallback(() => closeConfirm(), [closeConfirm]);
  const openRateModal = useCallback(() => openRate(), [openRate]);
  const closeRateModal = useCallback(() => closeRate(), [closeRate]);
  const openResetModal = useCallback(() => openReset(), [openReset]);
  const closeResetModal = useCallback(() => closeReset(), [closeReset]);

  return (
    <ModalContext.Provider
      value={{
        drawerModal,
        openDrawerModal,
        closeDrawerModal,
        confirmModal,
        openConfirmModal,
        closeConfirmModal,
        rateModal,
        openRateModal,
        closeRateModal,
        resetModal,
        openResetModal,
        closeResetModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal context must be used within a LoginContextProvider');
  }
  return context;
};

export default useModal;
