import React, { useEffect } from "react";
import Layout from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/contexts/reducer";
import { CameraCapture } from "@/components/app/camera";

const Home = () => {
  const dispatch = useDispatch();
  const { data: meData } = useSelector((state) => state.me);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  console.log(meData);

  return (
    <Layout>
      AuthID: {meData[0]?.authId} <CameraCapture />
    </Layout>
  );
};

export default Home;
