import { Helmet } from "react-helmet";

import React from "react";

const MetaData = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="keywords" content={props.keywords} />
      <meta name="description" content={props.description} />
      <meta name="author" content={props.author} />
      <title>{props.title}</title>
    </Helmet>
  );
};

MetaData.defaultProps = {
  title: "Swift Flair",
  description: "E-Commerce Project using MERN stack.",
  keywords: "mern, react, mongodb, express, node, tailwindCSS",
  author: "Kamil Dehliwala",
};

export default MetaData;
