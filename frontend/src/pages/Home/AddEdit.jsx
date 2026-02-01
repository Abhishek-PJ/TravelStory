import { MdAdd, MdUpdate } from "react-icons/md"
import DateSelector from "../../components/Input/DateSelector"
import { useState, useEffect } from "react"
import ImageSelector from "../../components/Input/ImageSelector";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import { toast } from "react-toastify";
import uploadImage from "../../utils/uploadImage";
import Modal from "../../components/Modal";

const AddEdit = ({
    storyInfo,
    type,
    onClose,
    getAllTravelStories,
    isOpen
}) => {
    const [error,setError]=useState("");
    const [visitedLocation,setVisitedLocation]=useState([]);
    const [storyImg,setStoryImg]=useState(null);
    const [title,setTitle]=useState("");    
    const [visitedDate,setVisitedDate]=useState(null);
    const [story,setStory]=useState("");

    // Reset form when modal is opened
    useEffect(() => {
        if (isOpen) {
            if (type === "edit" && storyInfo) {
                setVisitedLocation(storyInfo.visitedLocation || []);
                setStoryImg(storyInfo.imageUrl || null);
                setTitle(storyInfo.title || "");
                setVisitedDate(storyInfo.visitedDate || null);
                setStory(storyInfo.story || "");
            } else {
                // Reset form for new story
                setVisitedLocation([]);
                setStoryImg(null);
                setTitle("");
                setVisitedDate(null);
                setStory("");
            }
            setError("");
        }
    }, [isOpen, type, storyInfo]);

    const addNewTravelStory = async() =>{
        try{
            let imageUrl="";
            if(storyImg){
                const imgUploadRes=await uploadImage(storyImg);
                imageUrl=imgUploadRes.imageUrl || "";
            }

            const response=await axiosInstance.post("/add-travel-story",{
                title,
                story,
                imageUrl:imageUrl || "",
                visitedLocation,
                visitedDate:visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
            });
            if(response.data && response.data.story){
                toast.info("Story Added Successfully");
                getAllTravelStories();
                onClose();
            }
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                toast.error(error.response.data.message);
                setError(error.response.data.message);
            }else{
                toast.error("An unexpected error occurred. Please try again.");
                setError("An unexpected error occurred. Please try again.");
            }
        }
    }

    const updateTravelStory = async () => {
        if (!storyInfo || !storyInfo._id) {
            toast.error("Story data is missing. Please try again.");
            setError("Story data is missing. Please try again.");
            return;
        }
    
        const storyId = storyInfo._id;
        try {
            let imageUrl = "";
    
            let postData = {
                title,
                story,
                imageUrl: storyInfo?.imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
            };
    
            if (typeof storyImg === "object") {
                const imgUploadRes = await uploadImage(storyImg);
                imageUrl = imgUploadRes.imageUrl || "";
    
                postData = {
                    ...postData,
                    imageUrl: imageUrl,
                };
            }
    
            const response = await axiosInstance.put(`/edit-story/${storyId}`, postData);
    
            if (response.data && response.data.story) {
                toast.info("Story Updated Successfully");
                getAllTravelStories();
                onClose();
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
                setError(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };
  
    const handleAddOrUpdateClick=()=>{
        if(!title){
            toast.error("Please enter the title");
            setError("Please enter the title");
            return;
        }
        if(!story){
            toast.error("Please enter the story");
            setError("Please enter the story");
            return;
        }
        setError("");
        if(type === "add"){
            addNewTravelStory();
        }else{
            updateTravelStory();
        }
    }

    const handleDeleteStoryImg=async()=>{
        const deleteImgRes=await axiosInstance.delete("/delete-image",{
            params:{
                imageUrl:storyInfo._id,
            }
        });
        if(deleteImgRes.data){
            const storyId=storyInfo._id;

            let postData={
                title,
                story,
                visitedLocation,
                visitedDate:moment().valueOf(),
                imageUrl:"",
            };
            const response=await axiosInstance.put(`/edit-story/${storyId}`,postData);
            setStoryImg(null);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={type === "add" ? "Add Story" : "Update Story"}
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-end">
                    <div className="flex items-center gap-3">
                        {type === "add" ? (
                            <button 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                                onClick={handleAddOrUpdateClick}
                            >
                                <MdAdd className="text-lg" />
                                ADD STORY
                            </button>
                        ) : (
                            <button 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                                onClick={handleAddOrUpdateClick}
                            >
                                <MdUpdate className="text-lg"/>
                                UPDATE STORY
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            TITLE
                        </label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-600 outline-none" 
                            placeholder="A Day at ......" 
                            value={title}
                            onChange={({target})=> setTitle(target.value)} 
                        />
                    </div>

                    <div>
                        <DateSelector date={visitedDate} setDate={setVisitedDate} />
                    </div>

                    <ImageSelector image={storyImg} setImage={setStoryImg} handleDeleteImg={handleDeleteStoryImg}/>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            STORY
                        </label>
                        <textarea 
                            className="w-full px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-600 outline-none" 
                            placeholder="Your Story"
                            rows={10} 
                            value={story} 
                            onChange={({target})=>setStory(target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            VISITED LOCATIONS
                        </label>
                        <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AddEdit;
