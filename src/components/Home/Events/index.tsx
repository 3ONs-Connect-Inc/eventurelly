import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import EventHeader from "./EventHeader";
import EventGrid from "./EventGrid";
import EventSwiper from "./EventSwiper";
import { useFetchEvents } from "../../../hooks/events/useFetchEvents";
import Spinner from "../../Spinner";
import { useIconColor } from "../../../hooks/ui/useIconColor";

interface EventSectionProps {
  title: string;
  subtitle: string;
  hasNavigationButtons?: boolean;
  hasViewMore?: boolean;
  viewMoreLink?: string;
  collectionName: string;
}

const EventSection: React.FC<EventSectionProps> = ({
  title,
  subtitle,
  hasNavigationButtons = false,
  hasViewMore = false,
  viewMoreLink = "",
  collectionName,
}) => {
    const { textColor, pColor, bgColor } = useIconColor();
  const navigate = useNavigate();
  const { events, loading, error } = useFetchEvents(collectionName);
  const swiperRef = useRef<any>(null);

  const handleLearnMore = (id: string, slug: string) => {
    const formattedSlug = slug.replace(/\s+/g, "-");
    navigate(`/event-details/${collectionName}/${id}/${formattedSlug}`);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!events || events.length === 0) return null; 

  return (
    <div className={`w-full relative py-4 max-xs:px-0 ${bgColor}`}>
    <div
      className={`z-[1] flex flex-col items-center py-4 mx-auto ${textColor}`}
    >
        <EventHeader
          title={title}
          subtitle={subtitle}
          hasNavigationButtons={hasNavigationButtons}
          hasViewMore={hasViewMore}
          viewMoreLink={viewMoreLink}
          swiperRef={swiperRef}
          pColor={pColor}
        />
        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {title === "Top Events" ? (
          <EventGrid events={events} handleLearnMore={handleLearnMore} />
        ) : (
          <EventSwiper events={events} swiperRef={swiperRef} handleLearnMore={handleLearnMore} />
        )}
      </div>
    </div>
  );
};


export const Upcoming: React.FC = () => {


  return (
    <EventSection
      title="Upcoming Events"
      subtitle="Don’t Miss Out on Exciting Experiences"
      collectionName="bookings"
      hasNavigationButtons
    />
  );
};

export const FollowedEvents: React.FC = () => (
  <EventSection
    title="Followed Events"
    subtitle="Keep Track of Your Favorite Events"
    collectionName="bookings"
    hasNavigationButtons
  />
);

export const TrendingEvents: React.FC = () => (
  <EventSection
    title="Trending Events"
    subtitle="Engage in the Most Popular Team Experiences"
    collectionName="bookings"
    hasNavigationButtons
  />
);

export const TopPick: React.FC = () => (
  <EventSection
    title="Top Events"
    subtitle="Our Top Picks"
    collectionName="events"
    hasViewMore
    viewMoreLink="/team-building-events"
  />
);

export default EventSection;
