import React from 'react';
import ClubStats from './ClubStats';
import LatestNews from './LatestNews';
import TeamCalendarPreview from './calendar/TeamCalendarPreview';
// ... other imports

const WelcomeSection = () => {
  const userRole = localStorage.getItem('userRole');
  const isTeamMember = userRole === 'player' || userRole === 'admin';

  return (
    <>
      {/* Other welcome content */}
      <ClubStats />
      <LatestNews />
      {isTeamMember && <TeamCalendarPreview />}
      {/* Other sections */}
    </>
  );
};

export default WelcomeSection; 