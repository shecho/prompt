import React, { ReactNode } from 'react';
import Header from '../../components/layout/Header';
import RatingModal from '../../components/modal/RatingModal';
import ResetModal from '../../components/modal/ResetModal';
import ProfileDrawer from '../../components/modal/ProfileDrawer';

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <RatingModal />
      <ResetModal />
      <ProfileDrawer />
      {children}
    </div>
  );
};

export default ChatLayout;
