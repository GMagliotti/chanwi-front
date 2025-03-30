import React from 'react';
import styles from './CustomLayout.module.css';

const CustomLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles['custom-layout']} >
      {/* <Navbar /> */}
      <div className={styles['content']}>
        {children}
      </div>
    </div>
  );
};

export default CustomLayout;
