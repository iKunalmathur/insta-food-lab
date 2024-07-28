import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar
          key={index}
          className="text-yellow-500"
        />
      ))}
      {halfStars && <FaStarHalfAlt className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaStar
          key={index}
          className="text-zinc-300"
        />
      ))}
    </div>
  );
};

export default StarRating;
