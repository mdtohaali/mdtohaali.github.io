import { zakatData } from './zakat-data.js';

/* ইংরেজি সংখ্যা → আরবি সংখ্যা (উল্টো ক্রমে রূপান্তর) */
function toArabicDigits(num) {
    if (num === null || num === undefined) return '';
    const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString()
              .replace(/\d/g, d => arabicDigits[d])
              .split('')
              .reverse()
              .join('');
}

/* Hijri → Gregorian Converter */
function hijriToGregorian(hYear, hMonth, hDay) {
    const jd =
        Math.floor((11 * hYear + 3) / 30) +
        354 * hYear +
        30 * hMonth -
        Math.floor((hMonth - 1) / 2) +
        hDay +
        1948440 - 385;
    let l = jd + 68569;
    let n = Math.floor((4 * l) / 146097);
    l = l - Math.floor((146097 * n + 3) / 4);
    let i = Math.floor((4000 * (l + 1)) / 1461001);
    l = l - Math.floor((1461 * i) / 4) + 31;
    let j = Math.floor((80 * l) / 2447);
    let day = l - Math.floor((2447 * j) / 80);
    l = Math.floor(j / 11);
    let month = j + 2 - 12 * l;
    let year = 100 * (n - 49) + i + l;
    return new Date(year, month - 1, day);
}

/* Hijri date parser */
function parseHijriDate(hijriString){
    const [year, month, day] = hijriString.split('-').map(Number);
    return hijriToGregorian(year, month, day);
}

/* Progress গণনা */
function calculateHijriProgress(startDateString) {
    const start = parseHijriDate(startDateString);
    const today = new Date();
    start.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    const elapsed = Math.floor((today - start) / (1000*60*60*24));
    return {
        elapsed,
        total: 354,
        percent: (elapsed / 354.3667) * 100
    };
}

/* বর্তমান হিজরি সাল */
function getCurrentHijriYear() {
    const formatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', { year: 'numeric' });
    const parts = formatter.formatToParts(new Date());
    const yearPart = parts.find(p => p.type === 'year');
    return parseInt(yearPart.value);
}

/* হিজরি তারিখ প্রদর্শন */
function formatHijriDate(date){
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    const day = parts.find(p => p.type === 'day').value;
    const month = parts.find(p => p.type === 'month').value;
    const year = parts.find(p => p.type === 'year').value;

    return `${toArabicDigits(day)} ${month} ${toArabicDigits(year)} هـ`;
}

window.toggleZakatCard = function(element) {
    const allZakat = document.querySelectorAll('.zakat-unit-card');
    allZakat.forEach(item => {
        if(item !== element) item.classList.remove('z-open');
    });
    element.classList.toggle('z-open');
}

export function renderZakatGraph() {
    const hijriYear = getCurrentHijriYear();
    const hasCompleted = zakatData.milestones.some(
        item => calculateHijriProgress(item.startDate).percent >= 100
    );
    const masterAlert = hasCompleted
        ? 'border:1.5px solid #ff4d4d; box-shadow: inset 0 0 40px 5px rgba(255,77,77,0.5);'
        : '';

    let zakatHTML = zakatData.milestones.map(item => {
        const prog = calculateHijriProgress(item.startDate);
        const percentage = Math.min(prog.percent, 100);
        const isCompleted = percentage >= 100;
        const startDateDisplay = formatHijriDate(parseHijriDate(item.startDate));

        // আরবি ক্যারেক্টার চেক (Regex)
        const isArabic = /[\u0600-\u06FF]/.test(item.details);
        
        // CSS ইনজেকশন লজিক
        const boxStyle = isArabic 
            ? `direction: rtl; text-align: right;` 
            : `direction: ltr; text-align: left;`;
        
        const pStyle = isArabic 
            ? `text-align: right; direction: rtl; unicode-bidi: isolate;` 
            : `text-align: left; direction: ltr;`;

        return `
        <div class="zakat-unit-card" onclick="toggleZakatCard(this)">
            <div class="zakat-circle-wrapper">
                <div class="zakat-circle"
                     style="background: conic-gradient(${isCompleted ? '#ff4d4d' : item.color} ${percentage*3.6}deg, #3d3d3d 0deg);">
                    <div class="zakat-inner-circle">
                        <span class="zakat-percent-text">%${toArabicDigits(Math.floor(percentage))}</span>
                    </div>
                </div>
                <div class="zakat-info-text" style="text-align:right;">
                    <div style="font-weight:bold; color:#fff;">
                        الحَوْلُ (${toArabicDigits(hijriYear)})
                    </div>
                    <div style="color: ${isCompleted ? '#ff4d4d' : '#ccc'};">
                        ${
                            isCompleted
                                ? 'حان وقت الزكاة'
                                : `متبقي ${toArabicDigits(Math.max(354 - prog.elapsed,0))} يومًا`
                        }
                    </div>
                </div>
            </div>
            <div class="zakat-details-box">
                <div class="info-inner-card" style="--bar-color: ${item.color}; ${boxStyle}">
                    <p style="margin: 0; line-height: 1.6; ${pStyle}">
                        ${item.details}
                    </p>
                    <hr style="border:0.5px solid #444; margin:10px 0;">
                    <p style="font-size:11px; text-align: left; direction: ltr; margin: 0; opacity: 0.8;">
                        ${startDateDisplay}
                    </p>
                </div>
            </div>
        </div>
        `;
    }).join('');

    return `
        <div class="life-graph-container" style="${masterAlert}">
            <h4 class="graph-title">تقويم الزكاة</h4>
            ${zakatHTML}
        </div>
    `;
}

