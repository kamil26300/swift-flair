const Skeleton = ({ count, image }) => {
  const divs = Array(count || 1)
    .fill()
    .map((_, i) => (
      <div key={i}>
        {image ? <div className="aspect-h-5 aspect-w-4 loading"></div> : ""}
        <div className="mt-4 h-12 loading"></div>
        <style jsx="true">{`
          .loading {
            background: linear-gradient(90deg, #999999, #333333, #999999);
            background-size: 200% 100%;
            animation: loading 2s linear infinite;
          }

          @keyframes loading {
            0% {
              background-position: 100% 0;
            }
            100% {
              background-position: -100% 0;
            }
          }
        `}</style>
      </div>
    ));
  return <>{divs}</>;
};

export default Skeleton;
