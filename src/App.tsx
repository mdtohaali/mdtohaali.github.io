import React, { useState } from "react";
import ProfileCard from "./components/ProfileCard";
import DateDisplay from "./components/DateDisplay";
import EventCalendar from "./components/EventCalendar";
import "./styles.css";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="app-container">
      <ProfileCard
        name="John Doe"
        bio="Frontend Developer | Open Source Enthusiast"
        profileUrl="/profile.jpg"
      />
      <div className="right-panel">
        <DateDisplay onDateClick={setSelectedDate} />
        {selectedDate && <EventCalendar date={selectedDate} />}
      </div>
    </div>
  );
}

export default App;
