import React from "react";
import { useSelector } from "react-redux";

import { Loading, LoadItem } from "../counter/styled";
import { sliceName } from "../weather/weatherSlice";

export default function LoadingContainer() {
  const { loading } = useSelector((state) => state[sliceName]);
  if (loading) {
    return (
      <Loading>
        <LoadItem />
      </Loading>
    );
  }
  return null;
}
