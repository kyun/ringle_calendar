import React from 'react';
import { MdClose } from 'react-icons/md';
import IconButton from '../common/IconButton';
import Input from '../common/Input';
import SimpleButton from '../common/SimpleButton';

import './TodoInputModal.scss';

interface Props {
  onClose?: () => void;
}
const TodoInputModal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <>
      <div className="Overlay" onClick={onClose} />
      <div className="TodoInputModal">
        <div className="head">
          <IconButton onClick={onClose} size={28}>
            <MdClose />
          </IconButton>
        </div>
        <div className="content">
          <Input />
          <div className="row">
            <input type="date" />
            <input type="text" placeholder="startAt" />
            <input type="text" placeholder="endAt" />
          </div>
          <div className="row">
            <select>
              <option>반복 안함</option>
              <option>매일</option>
              <option>매주 n요일</option>
            </select>
          </div>
          <div className="row">
            <p style={{ fontSize: 12, color: '#4b4b4b' }}>기본컴포넌트...</p>
          </div>
        </div>
        <div className="footer">
          <SimpleButton theme="primary">Submit</SimpleButton>
        </div>
      </div>
    </>
  );
};

export default TodoInputModal;
