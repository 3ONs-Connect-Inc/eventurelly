import { useEventBooking } from "../../hooks/forms/useEventBooking";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import SuccessModal from "../ui/modal/SuccessModal";
import { useIconColor } from "../../hooks/ui/useIconColor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface BookingFormProps {
  eventId?: string;
slug?: string
eventDetail: any
}

const BookingForm: React.FC<BookingFormProps> = ({  eventDetail, eventId, slug }) => {
  const navigate = useNavigate();
  const { textColor, pColor, bgColor2 } = useIconColor();
  const optionalServices = eventDetail?.optionalServices ?? [];
  const {
    formData,
    errors,
    isSuccess,
    isLoading,
    handleDateChange,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    setIsSuccess,
  } = useEventBooking(eventId, slug, eventDetail);

  // const eventTitle = 
  // collectionName === "bookings"
  //   ? eventDetail?.eventNamePrefix ?? eventDetail?.eventName  
  //   : eventDetail?.eventName;

  const renderServices = (services: string[]) =>
    services.length > 0 ? (
      services.map((item)=> (
        <span key={item}
        className={`bg-gray-200 ${pColor} px-3 py-1 rounded-full text-sm
        dark:bg-gray-600 focus:border-border-gray cursor-not-allowed`}
        >
          {item}
        </span>
      ))
    ) : (
      <span 
        className={`bg-gray-200 ${pColor} px-3 py-1 rounded-full text-sm
        dark:bg-gray-600 focus:border-border-gray cursor-not-allowed`}
        >
         No Services listed
        </span>
    )

  return (
    <div className={`flex flex-col items-center max-w-3xl mx-auto py-10 px-6`}>
      <div
        className={`${bgColor2} ${textColor} w-full  rounded-lg shadow-md max-xs:p-6  max-[320px]:p-2  border-border-gray  mx-auto py-10 px-6  flex flex-col  items-center `}
      >
        <div className="text-center mb-6 max-xs:mt-10">
          <h2 className="mt-4 max-sm:-mt-2 text-3xl max-md:text-lg  font-bold">
          {eventDetail.isBooked ? "Edit Your Booking" : "Let’s Get Started – Book This Event"}
          </h2>
          <p
            className={`${pColor} mt-1 font-normal text-base  md:text-sm max-sm:text-xs `}
          >
            {eventDetail.isBooked ? "Update your event details below." : "Fill out the form below, and we’ll be in touch soon to schedule your personalized event!"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Event Name"  
              type="text"
              name="eventNamePrefix"
              value={formData.eventNamePrefix}
              onChange={handleChange}
              errors={errors}
              placeholder="Prefix (optional) "
            />
            <span className="flex flex-wrap h-11 max-xs:h-auto mt-6 max-md:mt-0 border p-2 border-border-gray rounded-lg focus:border-border-gray cursor-not-allowed bg-gray-100 dark:bg-gray-700">
            { eventDetail.eventName}
            </span>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
              Event Description
            </label>
            <span className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700 focus:border-border-gray cursor-not-allowed">
            {eventDetail.eventDescription}
            </span>  
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
              Event Format
            </label>
            <span className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700 focus:border-border-gray cursor-not-allowed">
              {eventDetail.eventFormat}
            </span>
          </div>  

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
              Location
            </label>
            <span className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700 focus:border-border-gray cursor-not-allowed ">
            {eventDetail.location}
            </span>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
              Duration
            </label>
            <span className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700 focus:border-border-gray cursor-not-allowed ">
            {eventDetail.duration}
            </span>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
              Event Category
            </label>
            <span className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700 focus:border-border-gray cursor-not-allowed ">
            {eventDetail.eventCategory}
            </span>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
             expected Outcome
            </label>
            <span className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700 focus:border-border-gray cursor-not-allowed ">
            {eventDetail.expectedOutcome}
            </span>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
              Team Size
            </label>
            <span className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700 focus:border-border-gray cursor-not-allowed ">
            {eventDetail.teamSize}
            </span>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
              Services Included
            </label>
            <div className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700">
              {renderServices(eventDetail?.servicesIncluded || [])}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${textColor} mb-1`}>
              Services Not Included
            </label>
            <div className="flex flex-wrap gap-2 border p-2 border-border-gray rounded-lg bg-gray-100 dark:bg-gray-700">
            {renderServices(eventDetail?.servicesNotIncluded || [])} 
            </div>
          </div>

          <div className="w-full  border-border-gray h-11 px-3 py-2 text-base font-normal rounded-lg focus:border-[#6C36FE] focus:outline-none border-2 border-solid">
            <DatePicker
              selected={formData.eventDate}  
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              minDate={new Date()} //  Prevents selecting past dates
              placeholderText="MM/DD/YYYY"
              className="w-full "
            />
            {errors.eventDate && (
              <p className="text-red-500 mt-4 ">{errors.eventDate}</p>
            )}
          </div>
       
          {optionalServices?.length > 0 ? (
         // {optionalServices && optionalServices.length > 0 && (
          <div className="py-6">
               {optionalServices.length > 0 && (
      <h2 className="text-lg font-semibold mb-2">Optional Services</h2>
    )}
            <ul className="grid grid-cols-1 max-md:grid-cols-2 max-xs:grid-cols-1 gap-2">
            {optionalServices.map((service: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                  <Checkbox
                    name={service}
                    checked={formData.optionalServices.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    label={service}
                  />
                </li>
              ))}
            </ul>
          </div>
  ) : (
    <div className="py-2"></div>
  )}
          <button
            type="submit"
            className="w-full font-semibold py-2 rounded-lg bg-primary bg-hover text-white flex items-center justify-center"
          >
              {isLoading ? "Submitting..." : eventDetail.isBooked ? "Update Booking" : "Book This Event"}
            <FiArrowUpRight className="ml-2 font-bold" />
          </button>
        </form>
      </div>

      {isSuccess && (
        <SuccessModal
        header={eventDetail.isBooked ? "Your booking has been updated." : "Thank you! Your event booking request has been received."}
          message="Our team will get in touch soon to finalize the details. We’re excited to help you create an unforgettable team-building experience!"
          onClose={() => {
            setIsSuccess(false);
            navigate(`/edit-event/bookings/${formData.bookingId}/${slug}`);
          }}
        />
      )}
    </div>
  );
};

export default BookingForm;
