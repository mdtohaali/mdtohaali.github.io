import React from "react";

interface EventCalendarProps {
  date: Date;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ date }) => {
  const events = [
    { title: "মিটিং", date: "2026-03-03" },
    { title: "ورشة عمل", date: "2026-03-03" },
    { title: "Workshop", date: "2026-03-04" },
  ];

  const filtered = events.filter(e => e.date === date.toISOString().slice(0,10));

  const banglaMonth = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","অগাস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
  const arabicMonth = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  const engMonth = date.toLocaleString("en-US", { month: "long" });

  return (
    <div className="event-calendar">
      <h3>Events:</h3>
      <ul>
        {filtered.map((e,i) => <li key={i}>{e.title}</li>)}
      </ul>
      <p>Bangla: {banglaMonth[date.getMonth()]} {date.getDate()}</p>
      <p>Arabic: {arabicMonth[date.getMonth()]} {date.getDate()}</p>
      <p>English: {engMonth} {date.getDate()}</p>
    </div>
  );
};

export default EventCalendar;
