import { useEffect, useState } from "react";
import { base } from "../config/appConfig";
import swal from "sweetalert";

const useAxiosFetch = (url: string) => {
  const [response, setResponse] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data: res } = await base.get(url);
      setResponse(res?.data);
    } catch (error: any) {
      setError(error?.response);
      swal({
        title: "Error",
        text: "Sorry, could not fetch data. Please reload",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, error, isLoading, fetchData, setResponse, setIsLoading };
};

export default useAxiosFetch;
