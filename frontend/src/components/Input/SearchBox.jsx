import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBox = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-full md:w-96 lg:w-[500px] flex items-center px-4 bg-slate-100 rounded-md hover:bg-slate-50 transition-colors duration-200">
      <input
        type="text"
        className="w-full text-sm bg-transparent py-3 outline-none placeholder:text-slate-400"
        placeholder="Search your travel stories..."
        value={value}
        onChange={onChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3 transition-colors duration-200"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black transition-colors duration-200"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBox;