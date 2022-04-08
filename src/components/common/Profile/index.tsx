import React from 'react';
import './Profile.scss';

interface Props {
  //
  src: string;
}
const Profile: React.FC<Props> = ({ src }) => {
  return (
    <div className="Profile">
      <img src={src} alt="profile_image" />
    </div>
  );
};

export default Profile;
