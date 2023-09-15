import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

function UploadWidget({ setImage }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drrdugbux",
        uploadPreset: "h7y3pr6y",
      },
      function (error, result) {
        if (result.event == "success") {
          setImage(result.info.secure_url);
        } else {
          console.log(result);
        }
      }
    );
  }, []);

  return (
    <div>
      <Button className="" onClick={() => widgetRef.current.open()}>
        Upload Image
      </Button>
    </div>
  );
}

export default UploadWidget;
