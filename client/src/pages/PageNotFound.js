import { Link } from "react-router-dom";
import MetaData from "../components/MetaData";

const PageNotFound = () => {
  return (
    <>
      <MetaData title="Error 404" />
      <div className="flex items-center flex-col">
        <p className=" text-3xl sm:text-4xl">404</p>
        <p className="text-center text-3xl sm:text-4xl">
          Oops! Page not found.
        </p>
        <Link
          className="border mt-6 border-[#CCCCCC] p-3 hover:underline"
          to={"/"}
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
