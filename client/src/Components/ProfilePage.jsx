import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import useUserStore from "../userStore";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditProfile from "../Components/EditProfile";
import PostListing from "./PostListing";
import Button from "react-bootstrap/esm/Button";
import EditListing from "./EditListing";

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

  const handleDelete = (id) => {
    fetch(`/api/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setUserProfile((prevUserProfile) => {
          return {
            ...prevUserProfile,
            user_listings: prevUserProfile.user_listings.filter(
              (listing) => listing.id !== id
            ),
          };
        });
      })
      .catch((error) => {
        console.error("Error deleting the listing:", error);
      });
  };
  const handleUpdateListing = (updatedListing) => {
    setUserProfile((prevUserProfile) => {
      const updatedListings = prevUserProfile.user_listings.map((listing) =>
        listing.id === updatedListing.id ? updatedListing : listing
      );
      return { ...prevUserProfile, user_listings: updatedListings };
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-column align-items-center mb-4">
        <Image
          style={{ width: "400px" }}
          src={user.profile_pic}
          alt="Profile Pic"
          roundedCircle
        />
        <h1 style={{ marginTop: "20px", fontSize: "50px" }}>{user.username}</h1>
        <EditProfile />
        <PostListing />
      </div>
      <h3 className="mb-4">User Listings:</h3>
      {userProfile?.user_listings?.length > 0 ? (
        <Row>
          {userProfile.user_listings.map((listing) => (
            <Col md={4} key={listing.id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={listing.image_url}
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                />

                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Text>{listing.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    ${listing.price} - {listing.category}
                  </small>
                  <br />
                  <small className="text-muted">
                    Posted on:{" "}
                    {new Date(listing.created_at).toLocaleDateString()}
                  </small>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(listing.id)}
                  >
                    Delete
                  </Button>
                  <EditListing id={listing.id} onUpdate={handleUpdateListing} />
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No listings available</p>
      )}
    </div>
  );
}

export default ProfilePage;
