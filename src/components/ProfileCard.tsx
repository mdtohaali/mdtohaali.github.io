import React from "react";

interface ProfileCardProps {
  name: string;
  bio: string;
  profileUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, bio, profileUrl }) => {
  return (
    <div className="profile-card">
      <img src={profileUrl} alt="profile" className="profile-img" />
      <div className="profile-info">
        <h1>{name}</h1>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
