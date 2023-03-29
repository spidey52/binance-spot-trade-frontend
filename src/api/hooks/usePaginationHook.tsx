import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
 page?: number;
 limit?: number;
};

const usePaginationHook = (props: Props) => {
 const [page, setPage] = useState(props.page || 0);
 const [limit, setLimit] = useState(props.limit || 10);
 const [search, setSearch] = useState("");
 const [debouncedSearch, setDebouncedSearch] = useState("");

 useEffect(() => {
  const timerId = setTimeout(() => {
   setDebouncedSearch(search);
  }, 500);

  return () => {
   clearTimeout(timerId);
  };
 }, [search]);

 return { page, setPage, limit, setLimit, search, setSearch, debouncedSearch };
};

export default usePaginationHook;
