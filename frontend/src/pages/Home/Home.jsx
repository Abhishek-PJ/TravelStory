import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StoryCard from "../../components/Cards/StoryCard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAdd } from "react-icons/md";
import AddEdit from "./AddEdit";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/Cards/EmptyCard";
import EmptyImg from '../../assests/images/add.svg';
import { DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "../../components/Cards/FilterInfoTitle";
import { getEmptyCardImg, getEmptyCardMessage } from "../../utils/helper";
import Modal from "../../components/Modal";

const Home = () => {
  const navigate = useNavigate();
const [searchQuery,setSearchQuery]=useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [filterType,setFilterType]=useState('');
  const [dateRange,setDateRange]=useState({
    form:null,to:null
  });
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  // Fetch user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Fetch all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-travel-stories");
      if (Array.isArray(response.data?.stories)) {
        setAllStories(response.data.stories);
      } else {
        console.log("No travel stories found.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Edit story handler
  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data });
  };

  // View story handler
  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  // Delete travel story handler
  const deleteTravelStory = async (data) => {
    const storyId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-story/${storyId}`);
      if (!response.data?.error) {
        toast.error("Story Deleted Successfully");
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllTravelStories();
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  // Update favorite status handler
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put(`/update-is-favourite/${storyId}`, {
        isFavourite: !storyData.isFavourite,
      });
      if (response.data && response.data?.story) {
        toast.success(
          `Story ${!storyData.isFavourite ? 'added to' : 'removed from'} favorites`
        );

        if(filterType === "search" && searchQuery){
          onSearchStory(searchQuery);
        }else if(filterType === "date"){
          filterStoriesByDate(dateRange);
        }else{
          getAllTravelStories();
        }   
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchStory=async(query)=>{
try{
  const response=await axiosInstance.get("/search",{
    params:{
      query,
    }
  });
  if(response.data && response.data.stories){
    setFilterType("search");
    setAllStories(response.data.stories);
  }
}catch{
  console.log("An expected error occured.Please try again.")
}
  }
  const handleClearSearch=()=>{
    setFilterType("");
    getAllTravelStories();
  }


const filterStoriesByDate=async(day)=>{
try{
  const startDate=day.from ? moment(day.from).valueOf() : null;
  const endDate=day.to ? moment(day.to).valueOf() : null;

  if(startDate && endDate){
    const response=await axiosInstance.get("/travel-stories/filter",{
      params:{startDate,endDate}
    });
    if(response.data && response.data.stories){
      setFilterType("date");
      setAllStories(response.data.stories);
    }
  }
}catch{
  console.log("An unexpected error occurred.Please try again.")
}
}

  const handleDayClick=(day)=>{
setDateRange(day);
filterStoriesByDate(day);
  }

  const resetFilter=()=>{
    setDateRange({from:null,to:null});
    setFilterType("");
    getAllTravelStories();
  }

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

  return (
    <>
      <Navbar 
        userInfo={userInfo} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onSearchNote={onSearchStory} 
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <FilterInfoTitle 
          filterType={filterType} 
          filterDates={dateRange} 
          onClear={resetFilter} 
        />

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {allStories.map((item) => (
                  <StoryCard
                    key={item._id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onClick={() => handleViewStory(item)}
                    onFavouriteClick={() => updateIsFavourite(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard 
                imgSrc={getEmptyCardImg(filterType)} 
                message={getEmptyCardMessage(filterType)} 
              />
            )}
          </div>

          <div className="lg:w-80">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={handleDayClick}
                className="!w-full day-picker"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-3xl" />
      </button>

      {/* Add/Edit Story Modal */}
      <AddEdit
        isOpen={openAddEditModal.isShown}
        type={openAddEditModal.type}
        storyInfo={openAddEditModal.data}
        onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        getAllTravelStories={getAllTravelStories}
      />

      {/* View Story Modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onClose={() => setOpenViewModal({ isShown: false, data: null })}
        title={openViewModal.data?.title || "View Story"}
      >
        <ViewTravelStory
          storyData={openViewModal.data}
          onEdit={() => {
            setOpenViewModal({ isShown: false, data: null });
            handleEdit(openViewModal.data);
          }}
          onDelete={deleteTravelStory}
        />
      </Modal>
    </>
  );
};

export default Home;
