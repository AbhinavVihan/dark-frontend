import { useEffect } from "react";

const useForm = (data: any) => {
  useEffect(() => console.log(data), []);
};

export default useForm;
