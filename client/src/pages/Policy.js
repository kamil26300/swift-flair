import React from "react";
import TwoCol from "../components/Layout/TwoCol";
import MetaData from "../components/MetaData";

const Policy = () => {
  return (
    <>
      <MetaData title="Privacy Policy" />
      <TwoCol>
        <div className="img flex flex-col gap-4">
          <h1 className="lg:hidden block">Privacy Policy</h1>
          <img src="images/privacypolicy.svg" alt="" />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="hidden lg:block">Privacy Policy</h1>
          <p className="content text-justify text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quam
            optio nihil doloribus, ab vitae ut sit nobis deserunt. Quas
            molestiae sequi veritatis et cupiditate quo earum repellendus ad ut!
          </p>
        </div>
      </TwoCol>
    </>
  );
};

export default Policy;
