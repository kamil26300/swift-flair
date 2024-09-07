const FullStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#E74C3C"
    viewBox="0 0 24 24"
  >
    <path d="M12 .587l3.668 7.429 8.332 1.21-6.035 5.884 1.425 8.31-7.39-3.886-7.39 3.886 1.425-8.31-6.035-5.884 8.332-1.21z" />
  </svg>
);

const PartialStar = (per) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <defs>
      <linearGradient
        id={`star-gradient-${per}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#E74C3C" />
        <stop offset={`${per}%`} stopColor="#E74C3C" />
        <stop offset={`${per}%`} stopColor="white" />
        <stop offset="100%" stopColor="white" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#star-gradient-${per})`}
      d="M12 .587l3.668 7.429 8.332 1.21-6.035 5.884 1.425 8.31-7.39-3.886-7.39 3.886 1.425-8.31-6.035-5.884 8.332-1.21z"
    />
  </svg>
);

const Rating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((num, id) => (
          <div key={id}>
            {rating < num
              ? PartialStar((rating - (num - 1)) * 100)
              : FullStar()}
          </div>
        ))}
      </div>
      <span className="mt-1">{rating}</span>
    </div>
  );
};

export default Rating;
