import moment from "moment";
import { MdClose, MdOutlineDateRange } from "react-icons/md";
import { DayPicker } from 'react-day-picker';
import { useState } from "react";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium text-sky-600 dark:text-sky-400 bg-sky-200/40 dark:bg-sky-900/40 hover:bg-sky-200/70 dark:hover:bg-sky-900/70
        px-2 py-1 cursor-pointer"
        onClick={() => {
          setOpenDatePicker(true);
        }}
      >
        <MdOutlineDateRange className="text-lg" />
        {date
          ? moment(date).format("Do MMM YYYY")
          : moment().format("Do MMM YYYY")}
      </button>

      {openDatePicker && (
        <>
          {/* Mobile View - Full Screen Modal */}
          <div className="md:hidden fixed inset-0 bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-900 h-full w-full overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Select Date</h3>
                <button
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  onClick={() => setOpenDatePicker(false)}
                >
                  <MdClose className="text-2xl text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div className="p-4">
                <DayPicker
                  className="!w-full day-picker"
                  captionLayout="dropdown-buttons"
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setOpenDatePicker(false);
                  }}
                  pagedNavigation
                />
              </div>
            </div>
          </div>

          {/* Desktop View - Popup */}
          <div className="hidden md:block overflow-y-scroll p-5 bg-sky-50/80 dark:bg-gray-800/90 rounded-lg relative pt-9">
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center bg-sky-100 dark:bg-gray-700 hover:bg-sky-200 dark:hover:bg-gray-600 absolute top-2 right-2"
              onClick={() => setOpenDatePicker(false)}
            >
              <MdClose className="text-xl text-sky-600 dark:text-sky-400" />
            </button>

            <DayPicker
              className="day-picker"
              captionLayout="dropdown-buttons"
              mode="single"
              selected={date}
              onSelect={setDate}
              pagedNavigation
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DateSelector;
