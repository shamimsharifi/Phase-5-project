import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ListingsCard from "./ListingsCard";

export default function Listings() {
  const [listingobj, setlistingobj] = useState([]);

  useEffect(() => {
    fetch(`/api/listings`)
      .then((response) => response.json())
      .then((data) => {
        setlistingobj(data);
      });
  }, []);

  return (
    <Container fluid>
      <Row className="d-flex flex-wrap">
        {listingobj.map((listing) => (
          <ListingsCard listing={listing} key={listing.id} />
        ))}
      </Row>
    </Container>
  );
}
