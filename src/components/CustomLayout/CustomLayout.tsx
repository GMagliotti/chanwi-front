import React from 'react';
import Navbar from '../Navbar/Navbar';

const CustomLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      {/* Footer */}
        {/* <Divider style={{ margin: 0 }} />
        <div style={{ textAlign: 'center', padding: 10, paddingInline: 20 }}>
            <Flex justify='space-between'>
                <div>
                    <span>© {new Date().getFullYear()} Volantis</span>
                </div>
                <div>
                    <Link to='/support'>Support</Link>
                    <span> | </span>
                    <Link to='/updates' target='_blank'>Changelog</Link>
                </div>
            </Flex>
        </div> */}
    </div>
  );
};

export default CustomLayout;
