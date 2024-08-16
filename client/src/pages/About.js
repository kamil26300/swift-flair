import TwoCol from "../components/Layout/TwoCol";
import MetaData from "../components/MetaData";

const About = () => {
  return (
    <>
      <MetaData title="About Us" />
      <TwoCol>
        <div className="img flex flex-col gap-4">
          <h1 className="lg:hidden block">About Us</h1>
          <img src="images/aboutus.svg" alt="" />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="hidden lg:block">About Us</h1>
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

export default About;
