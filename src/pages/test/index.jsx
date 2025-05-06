import React from "react";
import Layout from "@/layout";

import Map from "@/components/app/map";
import ClickableMap from "@/components/app/map/getmap";


const Test = () => {
  const handleGet = (location) => alert(location.lat)

  return (
    <Layout>
      <Map
        lat={13.3632533}
        lng={103.856403}
        location='11.91215142287882, 105.98684885006485'
      />
      <ClickableMap onGetLocation={handleGet}/>
    </Layout>
  );
};

export default Test;
