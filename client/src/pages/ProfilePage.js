import React from "react";
import MetaData from "./../components/MetaData";
import UserProfile from "../features/user/components/UserProfile";

const ProfilePage = () => {
  return (
    <>
      <MetaData title="Your Profile" />
      <UserProfile />
    </>
  );
};

export default ProfilePage;
