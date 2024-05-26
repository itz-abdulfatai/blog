import { useEffect, useState } from "react";

const UseFetchPost = (url) => {
  const [data, setData] = useState(null);
  const [idPending, setIspending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch data");
        }

        return res.json();
      })
      .then((data) => {
        setData(data);
        setIspending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch abort");
        } else {
          setIspending(false);
          setError(err.message);
        }
      });
  }, [url]);

  return { data, setIspending, error };
};

export default UseFetchPost;
