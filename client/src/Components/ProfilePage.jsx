import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import useUserStore from "../userStore";

function ProfilePage() {
  const { user } = useUserStore();
  const [userData, setUserData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetch("/api/check_session")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching session data:", error));
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetch(`/api/user-profile/${user.id}`)
        .then((response) => response.json())
        .then((data) => setUserProfile(data))
        .catch((error) => console.error("Error fetching user profile:", error));
    }
  }, [user]);

  if (!user || !userProfile || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Image
        style={{ width: "400px", marginLeft: "60px" }}
        src={user.profile_pic}
        alt="Profile Pic"
        roundedCircle
      />
      <h1 style={{ marginLeft: "160px", marginTop: "20px", fontSize: "50px" }}>
        {user.username}
      </h1>
    </div>
  );
}

export default ProfilePage;
