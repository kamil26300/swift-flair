import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  function IsCurrentPath(href) {
    const location = useLocation();
    return location.pathname === href;
  }

  const footerLinks = [
    { to: "about", label: "About", current: IsCurrentPath("/about") },
    { to: "contact", label: "Contact", current: IsCurrentPath("/contact") },
    { to: "policy", label: "Policy", current: IsCurrentPath("/policy") },
  ];

  return (
    <div className=" bg-[#1C1C1C] text-[#999999] p-7">
      <h4 className="text-center">Created by Kamil</h4>
      <div className="text-center mt-3 flex justify-center">
        {footerLinks.map((obj, index) => {
          return (
            <div key={obj.to} className="w-min">
              <Link
                to={`/${obj.to}`}
                className={`p-2 hover:border-b-2 border-[#999999] ${
                  obj.current ? "border-b-2" : ""
                }`}
              >
                {obj.label}
              </Link>
              {index !== footerLinks.length - 1 ? "|" : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
