import React from 'react';
import reactDom from 'react-dom';

import './Portal.scss';

const Portal: React.FC<any> = ({ children }) => {
  const el = document.getElementById('modal');
  return reactDom.createPortal(children, el as HTMLElement);
};

export default Portal;
