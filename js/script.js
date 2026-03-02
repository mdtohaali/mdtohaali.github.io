const dateCircle = document.getElementById("date-circle");
const calendarSection = document.getElementById("calendar-section");
const monthYear = document.getElementById("month-year");
const calendarDays = document.getElementById("calendar-days");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const eventContainer = document.getElementById("event-card-container");

let currentDate = new Date();

// Show today's date
dateCircle.innerText = currentDate.getDate();

// Toggle calendar
dateCircle.onclick = ()=>{
    calendarSection.classList.toggle("show");
};

// Important Events (edit here)
const events = [
    {date:"2026-03-05", title:"Project Deadline"},
    {date:"2026-03-10", title:"Client Meeting"},
    {date:"2026-03-15", title:"Launch Day"}
];

// Render Event Cards
events.forEach(event=>{
    const card = document.createElement("div");
    card.className="event-card";
    card.innerHTML=`<h4>${event.title}</h4><p>${event.date}</p>`;
    eventContainer.appendChild(card);
});

// Calendar Render
function renderCalendar(date){
    calendarDays.innerHTML="";
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYear.innerText =
        date.toLocaleString("default",{month:"long"})+" "+year;

    const firstDay = new Date(year,month,1).getDay();
    const daysInMonth = new Date(year,month+1,0).getDate();

    for(let i=0;i<firstDay;i++){
        calendarDays.innerHTML+="<div></div>";
    }

    for(let d=1; d<=daysInMonth; d++){
        calendarDays.innerHTML+=`<div>${d}</div>`;
    }
}

prevMonth.onclick=()=>{
    currentDate.setMonth(currentDate.getMonth()-1);
    renderCalendar(currentDate);
};

nextMonth.onclick=()=>{
    currentDate.setMonth(currentDate.getMonth()+1);
    renderCalendar(currentDate);
};

renderCalendar(currentDate);
