import { graphData } from './graph-data.js';

// ১. সংখ্যাকে বাংলায় রূপান্তর
function toBengaliDigits(num) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[d]);
}

// ২. দিন গণনা
function calculateDays(dateString) {
    const start = new Date(dateString);
    const today = new Date();
    start.setHours(0, 0, 0, 0); 
    today.setHours(0, 0, 0, 0);
    return Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
}

// ৩. টগল ফাংশন
window.toggleLifeDetails = function(id) {
    const target = document.getElementById(`life-details-${id}`);
    const allLifeDocs = document.querySelectorAll('.life-details-pane');
    allLifeDocs.forEach(doc => {
        if (doc.id !== `life-details-${id}`) doc.style.display = 'none';
    });
    if (target) {
        target.style.display = (target.style.display === 'block') ? 'none' : 'block';
    }
};

// ৪. রেন্ডার ফাংশন (আপডেটেড পজিশনিং লজিকসহ)
export function renderLifeGraph() {
    const milestones = [...graphData.milestones];
    const totalCount = milestones.length;
    
    // ফিক্সড পজিশনের জন্য একটি খালি অ্যারে তৈরি
    const finalDisplay = new Array(totalCount).fill(null);
    const regularItems = [];

    // ক. প্রায়োরিটি চেক করে তাদের নিজস্ব পজিশনে বসানো
    milestones.forEach(item => {
        if (item.priority && item.priority <= totalCount) {
            // যদি ২ জন একই প্রায়োরিটি পায়, তবে প্রথম জন বসবে, পরের জন রেগুলার হবে
            if (finalDisplay[item.priority - 1] === null) {
                finalDisplay[item.priority - 1] = item;
            } else {
                regularItems.push(item);
            }
        } else {
            regularItems.push(item);
        }
    });

    // খ. বাকি আইটেমগুলোকে সর্ট করা (Infinity > Progress)
    regularItems.sort((a, b) => {
        const isInfA = a.maxDays === Infinity;
        const isInfB = b.maxDays === Infinity;

        // ১. Infinity আগে থাকবে
        if (isInfA && !isInfB) return -1;
        if (!isInfA && isInfB) return 1;

        const daysA = calculateDays(a.startDate);
        const daysB = calculateDays(b.startDate);

        // ২. উভয়ই Infinity হলে দিনের আধিক্য অনুযায়ী
        if (isInfA && isInfB) return daysB - daysA;

        // ৩. প্রগ্রেস বার হলে পার্সেন্টেজ অনুযায়ী
        const progA = daysA / (a.maxDays || 1);
        const progB = daysB / (b.maxDays || 1);
        return progB - progA;
    });

    // গ. ফাঁকা জায়গাগুলোতে সর্ট করা আইটেমগুলো সিরিয়ালি বসিয়ে দেওয়া
    let regIndex = 0;
    for (let i = 0; i < totalCount; i++) {
        if (finalDisplay[i] === null) {
            finalDisplay[i] = regularItems[regIndex];
            regIndex++;
        }
    }

    // ঘ. এইচটিএমএল জেনারেট করা
    let milestoneHTML = finalDisplay.map(item => {
        if (!item) return ''; // নিরাপত্তা মূলক চেক
        
        const daysCount = calculateDays(item.startDate);
        const percentage = Math.min((daysCount / (item.maxDays || 1)) * 100, 100);
        const isOverdue = item.maxDays && (daysCount >= item.maxDays);

        return `
        <div class="life-milestone-card ${isOverdue ? 'overdue' : ''}">
            <div class="life-click-area" onclick="toggleLifeDetails('${item.id}')">
                <div class="milestone-label-row">
                    <span class="milestone-label">${item.label}</span>
                    <span class="days-text">${toBengaliDigits(daysCount)} দিন</span>
                </div>
                <div class="progress-bg">
                    <div class="progress-fill" style="width: ${percentage}%; background-color: ${isOverdue ? '#ff4d4d' : item.color};"></div>
                </div>
            </div>
            <div id="life-details-${item.id}" class="life-details-pane">
                <div class="info-inner-card"><p>${item.details}</p></div>
            </div>
        </div>`;
    }).join('');

    return `
    <div class="life-graph-container">
        <h4 class="graph-title">জীবনরেখা</h4>
        <div class="milestone-scroll-area">${milestoneHTML}</div>
    </div>`;
}

