import React, { useEffect, useState } from "react";
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
    <div>
      {listingobj.map((listing) => (
        <ListingsCard listing={listing} key={listing.id} />
      ))}
    </div>
  );
}
