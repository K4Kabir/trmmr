import MainLoader from "@/components/Loader";
import Error from "@/components/error";
import useFetch from "@/lib/useFetch";
import { getLongUrl, storeClicks } from "@/utils/apiUrls";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { id } = useParams();

  const {
    loading: longLoading,
    data,
    error: longError,
    fn: getoriginal,
  } = useFetch(getLongUrl, id);
  const {
    loading,
    fn,
    error: clickError,
  } = useFetch(storeClicks, {
    id: data?.id,
    original_url: data?.original_url,
  });

  useEffect(() => {
    getoriginal();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fn();
    }
  }, [data]);

  if ((loading || longLoading) && !longError && !clickError) {
    return <MainLoader text={"Redirecting..."} />;
  }

  return (
    <div>
      {longError && <Error>{longError.message}</Error>}
      {clickError && <Error>{clickError.message}</Error>}
    </div>
  );
};

export default Redirect;
