import React, { useState } from "react";

interface DateDisplayProps {
  onDateClick: (date: Date) => void;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ onDateClick }) => {
  const [date] = useState(new Date());

  const handleClick = () => onDateClick(date);

  const banglaMonth = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","অগাস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
  const arabicMonth = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  const engMonth = date.toLocaleString("en-US", { month: "long" });

  return (
    <div className="date-display" onClick={handleClick}>
      <p>{banglaMonth[date.getMonth()]}, {date.getDate()}</p>
      <p>{arabicMonth[date.getMonth()]}, {date.getDate()}</p>
      <p>{engMonth}, {date.getDate()}</p>
    </div>
  );
};

export default DateDisplay;
