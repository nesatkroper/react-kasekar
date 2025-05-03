import React, { useEffect } from "react";
import Layout from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/contexts/reducer";

const Home = () => {
  const dispatch = useDispatch();
  const { data: meData } = useSelector((state) => state.me);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  console.log(meData);

  return <Layout>AuthID: {meData[0]?.authId}</Layout>;
};

export default Home;
