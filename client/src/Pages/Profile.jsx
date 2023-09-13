import React from "react";
import ProfilePage from "../Components/ProfilePage";
import PostListing from "../Components/PostListing";
import EditProfile from "../Components/EditProfile";

function MainPage() {
  return (
    <div>
      <ProfilePage />
      <EditProfile />
      <PostListing />
    </div>
  );
}

export default MainPage;
