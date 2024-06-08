import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useFetchImage = (id) => {
  const location = useLocation();
  const [imgPending, setImgPending] = useState(true);
  const [imgFinished, setImgFinished] = useState(false);
  const [stringImg, setStringImg] = useState(null);
  const [imgError, setImgError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost:7000/images/${id}`, { signal: abortCont.signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(
            "unable to fetch image maybe image is non existent please try again"
          );
        }
      })
      .then((data) => {
        setStringImg(data.imgString);
        setImgPending(false);
        setImgFinished(true);
        setImgError(null);
      })
      .catch((err) => {
        setImgError(err.message);
        setImgPending(false);
      });

    return () => {
      abortCont.abort();
    };
  }, [location, id]);

  return { imgPending, imgFinished, imgError, stringImg };
};

export default useFetchImage;
