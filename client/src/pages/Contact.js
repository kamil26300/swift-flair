import TwoCol from "../components/Layout/TwoCol";
import MetaData from "./../components/MetaData";

const Contact = () => {
  return (
    <>
      <MetaData title="Contact Us" />
      <TwoCol>
        <div className="img lg:hidden flex flex-col gap-4">
          <h1 className="block lg:hidden">Contact Us</h1>
          <img src="images/contactus.svg" alt="" />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="lg:block hidden">Contact Us</h1>
          <p className="content text-justify text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quam
            optio nihil doloribus, ab vitae ut sit nobis deserunt. Quas
            molestiae sequi veritatis et cupiditate quo earum repellendus ad ut!
          </p>
        </div>
        <div className="img hidden lg:block">
          <img src="images/contactus.svg" alt="" />
        </div>
      </TwoCol>
    </>
  );
};

export default Contact;
