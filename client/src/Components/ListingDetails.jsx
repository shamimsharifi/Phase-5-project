import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import useUserStore from "../userStore";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const setCurrentChat = useUserStore((state) => state.setCurrentChat);
  const { user } = useUserStore();
  // console.log(user);
  const handleChatButtonClick = () => {
    fetch("/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        user_id_1: user.id,
        user_id_2: listing.user_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentChat({
          id: data.id,
          recipient_id: listing.user_id,
          sender_id: user.id,
        });
        navigate("/chatcomponent");
      });
  };

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then((response) => response.json())
      .then((data) => setListing(data))
      .catch((error) =>
        console.error("Error fetching listing details:", error)
      );
  }, [id]);

  if (!listing) {
    return <div>Listing not found</div>;
  }
  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(rgba(50, 50, 50, 0.8), rgba(255, 255, 255, 0.8)), url(https://t4.ftcdn.net/jpg/03/65/86/37/240_F_365863785_GPd2tXRRDis66W8NTGYmBt7Bhxfcb09h.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "150px",
    backgroundSize: "cover",
  };

  return (
    <Container
      fluid
      className="d-flex flex-column vh-100"
      style={backgroundStyle}
    >
      <Row className="justify-content-center">
        <Col md={6} style={{ border: "3px solid black" }}>
          <img
            src={listing.image_url}
            alt={listing.title}
            className="img-fluid mx-auto d-block"
            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6} className="mx-auto">
          <h1 style={{ fontSize: "50px" }}>{listing.title}</h1>
          <p>Condition: {listing.description}</p>
          <p>Price: ${listing.price}</p>
          <p>Category: {listing.category}</p>
          <p>Location: {listing.location}</p>
          <p>Postes: {listing.created_at}</p>
          <Button onClick={handleChatButtonClick}>Chat with owner</Button>
        </Col>
      </Row>
    </Container>
  );
}
