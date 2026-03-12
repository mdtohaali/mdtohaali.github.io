import { calendarConverter } from './calendar-logic.js';
import { eventsData } from './events.js';

export function initCalendar() {
    const header = document.querySelector('.header');
    if (!header) return;

    let eventBtn = document.getElementById('openCalBtn');
    if (!eventBtn) {
        eventBtn = document.createElement('div');
        eventBtn.id = "openCalBtn";
        eventBtn.className = "header-cal-btn-premium";
        eventBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>`;
        header.appendChild(eventBtn);
    }

    let calSidebar = document.getElementById('calendarSidebar');
    if (!calSidebar) {
        calSidebar = document.createElement('div');
        calSidebar.id = "calendarSidebar";
        calSidebar.className = "cal-glass-sidebar";
        document.body.appendChild(calSidebar);
    }

    const today = new Date();
    const currentMonth = today.getMonth();

    calSidebar.innerHTML = `
        <div class="cal-close-btn" id="closeCal">✕</div>
        <div class="cal-wrapper">
            <div class="premium-header-area">
                <div class="calligraphy-text">﷽</div>
                <div class="sidebar-header-desc">
                    ১. কসম যুগের (সময়ের),
                    ২. নিশ্চয় মানুষ ক্ষতিগ্রস্ত;
                    ৩. কিন্তু তারা নয়, যারা বিশ্বাস স্থাপন করে ও সৎকর্ম করে এবং পরস্পরকে তাকীদ করে সত্যের এবং তাকীদ করে সবরের। (সূরা আসর, আয়াত : ১-৩)
                </div>
            </div>
            
            <div class="date-container-glass-premium">
                <h3 class="cal-title-premium">আজকের তারিখ</h3>
                <div class="date-grid">
                    <div class="date-item-p"><span>EN</span><strong>${calendarConverter.toBanglaDateString(today)}</strong></div>
                    <div class="date-item-p"><span>BN</span><strong>${calendarConverter.getBengaliDate(today)}</strong></div>
                    <div class="date-item-p"><span>HIJ</span><strong>${calendarConverter.getHijriDate(today)}</strong></div>
                </div>
            </div>
            
            <h3 class="cal-section-title-premium">চলতি মাসের ইভেন্টসমূহ</h3>
            <div id="evContainer"></div>
            
            <div class="cal-footnote">
                ​প্রযুক্তি গত কারণে তারিখ ভুল হতে পারে; সঠিকতা যাচাই করে নিন। 
            </div>
        </div>
    `;

    const evContainer = document.getElementById('evContainer');
    const monthlyEvents = eventsData.filter(ev => new Date(ev.date).getMonth() === currentMonth);

    if (monthlyEvents.length === 0) {
        evContainer.innerHTML = `<p style="text-align:center; color:#555; font-size:12px; margin-top:20px;">এই মাসে কোনো বিশেষ ইভেন্ট নেই।</p>`;
    } else {
        monthlyEvents.forEach(ev => {
            const evDate = new Date(ev.date);
            const enDateFormatted = evDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
            const item = document.createElement('div');
            item.className = "ev-premium-card";
            item.innerHTML = `
                <div class="ev-main">
                    <div class="ev-info">
                        <strong>${ev.title}</strong>
                        <small>${enDateFormatted}</small>
                        <small style="opacity:0.7; font-size:10px; display:block; margin-top:2px;">
                            ${calendarConverter.getBengaliDate(evDate)} | ${calendarConverter.getHijriDate(evDate)}
                        </small>
                    </div>
                    <div class="ev-arrow">›</div>
                </div>
                <div class="ev-details-p"><div class="details-inner">${ev.desc || "বিস্তারিত তথ্য শীঘ্রই আসছে।"}</div></div>
            `;
            item.onclick = (e) => {
                e.stopPropagation();
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.ev-premium-card').forEach(c => c.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            };
            evContainer.appendChild(item);
        });
    }

    // স্ক্রল লক/আনলক ফাংশন
    const toggleLock = (lock) => {
        if (lock) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }
    };

    // সোয়াইপ জেশ্চার (Swipe to Close)
    let touchStartX = 0;
    calSidebar.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    calSidebar.addEventListener('touchend', (e) => { 
        if (e.changedTouches[0].screenX - touchStartX > 50) {
            calSidebar.classList.remove('active'); 
            toggleLock(false); // স্ক্রল সচল
        }
    }, { passive: true });

    // ওপেন বাটন লজিক
    eventBtn.onclick = () => {
        calSidebar.classList.add('active');
        calSidebar.scrollTop = 0;
        toggleLock(true); // স্ক্রল লক
    };

    // ক্লোজ বাটন লজিক
    document.getElementById('closeCal').onclick = () => {
        calSidebar.classList.remove('active');
        toggleLock(false); // স্ক্রল সচল
    };
}

