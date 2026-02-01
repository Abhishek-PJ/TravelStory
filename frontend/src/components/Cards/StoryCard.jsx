import moment from 'moment';
import { GrMapLocation } from "react-icons/gr";
import { FaHeart } from "react-icons/fa6";

const StoryCard = ({ 
  imageUrl,
  title,
  story,
  date,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out relative group">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
          onClick={onClick} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-t-lg"></div>
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-200 text-sm mb-2 line-clamp-2">{story}</p>
          <div className="flex items-center gap-2 text-gray-200 text-sm">
            <span>{moment(date).format("Do MMM YYYY")}</span>
          </div>
        </div>

        <button 
          className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-full border border-white/30 transform transition-all duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            onFavouriteClick();
          }}
        >
          <FaHeart className={`text-xl transition-colors duration-300 ${isFavourite ? "text-red-500" : "text-white hover:text-red-500"}`} />
        </button>
      </div>

      <div className="p-4 sm:p-5" onClick={onClick}>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h6 className="text-base sm:text-lg font-medium line-clamp-1 text-gray-900 dark:text-white group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300">
              {title}
            </h6>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
          {story}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {visitedLocation.map((location, index) => (
            <span 
              key={index}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary-light dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10 rounded-full px-3 py-1 transition-all duration-300 hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
            >
              <GrMapLocation className="text-sm" />
              {location}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
