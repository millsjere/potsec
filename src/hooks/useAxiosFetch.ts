import { useEffect, useState } from "react";
import { base } from "../config/appConfig";

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { response, error, isLoading, fetchData };
};

export default useAxiosFetch;
