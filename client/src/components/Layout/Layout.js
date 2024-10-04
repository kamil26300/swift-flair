import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <>
      <Header />
      <main
        style={{ minHeight: "calc(100vh - 8rem)", paddingTop: "calc(4rem + 35px)" }}
        className="bg-[#1A1A1A] w-full text-[#CCCCCC] flex pb-[60px] px-[20px] justify-center items-center"
      >
        {props.children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
