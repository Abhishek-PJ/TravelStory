import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";
import ProfileInfo from "../../components/Cards/ProfileInfo";

const ViewTravelStory = ({ storyData, onEdit, onDelete }) => {
  if (!storyData) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Actions */}
      <div className="flex items-center justify-end gap-2">
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
          onClick={() => onEdit(storyData)}
        >
          <MdEdit className="text-lg" />
          Edit
        </button>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          onClick={() => onDelete(storyData)}
        >
          <MdDelete className="text-lg" />
          Delete
        </button>
      </div>

      {/* Story Content */}
      <div className="space-y-6">
        {/* Image */}
        {storyData.imageUrl && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
            <img
              src={storyData.imageUrl}
              alt={storyData.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Date and Location */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{moment(storyData.visitedDate).format("Do MMM YYYY")}</span>
          <div className="flex flex-wrap gap-2">
            {storyData.visitedLocation.map((location, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
              >
                {location}
              </span>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {storyData.story}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
