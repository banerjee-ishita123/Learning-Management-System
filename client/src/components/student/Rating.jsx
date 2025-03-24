import React, { useEffect, useState } from "react";

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleRating = (value) => {
    console.log("⭐ Star clicked:", value); // Debugging
    setRating(value);
    if (onRate) {
      console.log("📩 Calling onRate with:", value);
      onRate(value);
    } else {
      console.warn("⚠️ onRate is undefined! Check where Rating is used.");
    }
  };

  useEffect(() => {
    if (initialRating !== undefined) {
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleRating(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
