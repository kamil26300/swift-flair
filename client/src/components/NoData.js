import { BsDatabaseFillSlash } from "react-icons/bs";

const NoData = ({ children, color }) => {
  return (
    <div className={`flex justify-center text-[${color || "#1A1A1A"}]`}>
      <div className="flex gap-3 flex-col">
        <BsDatabaseFillSlash className="h-12 w-12 mx-auto" />
        <div className="flex text-3xl font-bold">
          {children || "No Data found."}
        </div>
      </div>
    </div>
  );
};

export default NoData;
