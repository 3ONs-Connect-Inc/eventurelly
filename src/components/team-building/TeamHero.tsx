

import { SearchBar } from '../Home/SearchBar';
import HeroContainer from '../ui/hero/HeroContainer';
import HeroContent from '../ui/hero/HeroContent';

const TeamHero = () => {
  return (
    <HeroContainer className="mb-2 p-4">
     <HeroContent 
          title=" Elevate team bonding with engaging corporate events" 
          description=" Boost team bonding, engagement, and collaboration with our curated team-building experiences. Whether your team is remote, in-office, or hybrid, we have the perfect activities to strengthen connections and improve team morale." 
        />

      <SearchBar />  
    </HeroContainer>
  )
}

export default TeamHero