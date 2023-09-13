import React from "react";
import { Card } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ListingsCard({ listing }) {
  const { id, image_url } = listing;

  return (
    <div
      className="col-md-4 d-flex align-items-stretch mb-4"
      style={{ padding: "15px" }}
    >
      <Card
        className="w-100"
        style={{
          maxWidth: "600px",
          marginLeft: "100px",
          border: "5px solid #fafad2",
        }}
      >
        <Link to={{ pathname: `/listing/${id}`, state: { listing } }}>
          <Card.Img
            variant="top"
            src={image_url}
            style={{
              height: "550px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Link>
      </Card>
    </div>
  );
}
