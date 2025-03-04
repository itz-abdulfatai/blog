import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UseFetchPost = (url) => {
  const [data, setData] = useState(null);
  const [randomisedPosts, setRandomisedPosts] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [finished, setFinished] = useState(false);
  const location = useLocation(); // Get the current location
  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error("unable to fetch data");
        }

        return response.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setRandomisedPosts(data.slice().sort(() => Math.random() - 0.5));
        setFinished(true);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
      });

    return () => {
      abortCont.abort();
    };
  }, [url, location]);

  return { data, error, isPending, randomisedPosts, finished };
};

export default UseFetchPost;
