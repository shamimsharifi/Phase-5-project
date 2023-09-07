import React from "react";
import { Card, Button } from "react-bootstrap";

export default function ListingsCard({ listing }) {
  const {
    id,
    title,
    description,
    price,
    category,
    location,
    image_url,
    created_at,
  } = listing;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{price}</Card.Text>
        <Card.Text>{category}</Card.Text>
        <Card.Text>{location}</Card.Text>
        <Card.Text>{image_url}</Card.Text>
        <Card.Text>{created_at}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
