const dateCircle = document.getElementById("date-circle");
const calendarSection = document.getElementById("calendar-section");
const monthYear = document.getElementById("month-year");
const calendarDays = document.getElementById("calendar-days");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const eventContainer = document.getElementById("event-card-container");

let currentDate = new Date();
let today = new Date();

dateCircle.innerText = today.getDate();

dateCircle.onclick = ()=>{
    calendarSection.classList.toggle("show");
};

// Important Events
const events = [
    {date:"2026-03-05", title:"Project Deadline"},
    {date:"2026-03-10", title:"Client Meeting"},
    {date:"2026-03-15", title:"Launch Day"}
];

// Event Cards
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
        date.toLocaleString("bn-BD",{month:"long"})+" "+year;

    const weekDays = ["রবি","সোম","মঙ্গল","বুধ","বৃহস্পতি","শুক্র","শনি"];

    // Week Header
    weekDays.forEach((day,index)=>{
        const div = document.createElement("div");
        div.style.fontWeight="600";

        // Friday red
        if(index === 5){
            div.style.color="red";
        }

        div.innerText = day;
        calendarDays.appendChild(div);
    });

    const firstDay = new Date(year,month,1).getDay();
    const daysInMonth = new Date(year,month+1,0).getDate();

    for(let i=0;i<firstDay;i++){
        calendarDays.innerHTML+="<div></div>";
    }

    for(let d=1; d<=daysInMonth; d++){

        let fullDate =
            year + "-" +
            String(month+1).padStart(2,'0') + "-" +
            String(d).padStart(2,'0');

        const dayIndex = new Date(year,month,d).getDay();

        const div = document.createElement("div");
        div.innerText = d;

        // ✅ Today highlight
        if(
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ){
            div.style.background = "#6c63ff";
        }

        // ✅ Event highlight
        if(events.some(e => e.date === fullDate)){
            div.style.border = "2px solid #6c63ff";
        }

        // ✅ Friday red
        if(dayIndex === 5){
            div.style.color="red";
        }

        calendarDays.appendChild(div);
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
