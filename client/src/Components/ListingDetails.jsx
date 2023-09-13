import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <Container
      fluid
      className="d-flex flex-column vh-100"
      style={{ width: "100%" }}
    >
      <Row className="justify-content-center">
        <Col md={6}>
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
          <h1 className="text-center">{listing.title}</h1>
          <p>{listing.description}</p>
          <p>${listing.price}</p>
          <p>{listing.category}</p>
          <p>{listing.location}</p>
          <p>{listing.created_at}</p>
          <Button onClick={() => navigate("/chatcomponent")}>
            Chat with owner
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
