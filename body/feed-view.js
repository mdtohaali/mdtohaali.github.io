import { feedData } from './feed-data.js';

// স্মার্ট সর্টিং লজিক (প্রায়োরিটি + র্যান্ডম)
function getSortedData(data) {
    const priorityItems = data.filter(item => item.priority !== undefined && item.priority !== null);
    const randomItems = data.filter(item => item.priority === undefined || item.priority === null);

    // ১. প্রায়োরিটি সর্ট
    priorityItems.sort((a, b) => a.priority - b.priority);

    // ২. সাধারণ তথ্য র্যান্ডমাইজ
    for (let i = randomItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomItems[i], randomItems[j]] = [randomItems[j], randomItems[i]];
    }

    return [...priorityItems, ...randomItems];
}

export function renderNewsFeed() {
    if (!feedData || feedData.length === 0) return '<p style="text-align:center; padding:20px;">কোনো তথ্য নেই।</p>';

    // সর্টিং করা ডাটা নিয়ে আসা
    let sortedData = getSortedData([...feedData]);

    // ৩. অটো-আইডি লজিক
    const finalData = sortedData.map((item, index) => {
        return {
            ...item,
            id: item.id || `auto-${index}-${Date.now()}` 
        };
    });

    return `
        <div id="fList" class="f-container">
            ${generateFeedHTML(finalData)}
        </div>
    `;
}

function generateFeedHTML(data) {
    if (data.length === 0) return '<div style="text-align:center; padding:40px; color:#999;">🔍 তথ্য পাওয়া যায়নি।</div>';

    return data.map(post => {
        const hasTitle = post.title && post.title.trim().length > 0;
        const hasCategory = post.category && post.category.trim().length > 0;
        const hasDetails = post.fullDetails && post.fullDetails.trim().length > 0;
        const displayTitle = hasTitle ? post.title : (post.fullDetails || "তথ্য নেই");
        
        const authorPrefix = (hasCategory && post.author) ? " • " : "";

        return `
            <div class="f-item ${hasTitle ? '' : 'no-title'} ${hasDetails ? 'has-content' : ''}" 
                 data-id="${post.id}" 
                 onclick="handleCardToggle(this, ${hasDetails && hasTitle})">
                <div class="f-meta-row">
                    ${hasCategory ? `<span class="f-cat">${post.category}</span>` : ''}
                    ${hasTitle && post.author ? `<span class="f-author">${authorPrefix}${post.author}</span>` : ''}
                </div>
                <h2 class="f-title">${displayTitle}</h2>
                ${!hasTitle && post.author ? `<span class="f-quote-author">${post.author}</span>` : ''}
                
                ${hasDetails && hasTitle ? `
                    <div class="f-details-wrapper">
                        <div class="f-details-content">
                            <div class="f-content-inner custom-design-area">${post.fullDetails}</div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// কার্ড টগল লজিক
window.handleCardToggle = function(element, canExpand) {
    if (!canExpand) return;
    const isActive = element.classList.contains('active');
    document.querySelectorAll('.f-item').forEach(item => item.classList.remove('active'));
    if (!isActive) {
        element.classList.add('active');
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
};

// সার্চ লজিক
window.filterKnowledge = function() {
    const term = document.getElementById('fSearch').value.toLowerCase().trim();
    const filtered = feedData.filter(p => 
        (p.title || "").toLowerCase().includes(term) || 
        (p.author || "").toLowerCase().includes(term) || 
        (p.category || "").toLowerCase().includes(term) ||
        (p.fullDetails || "").toLowerCase().includes(term)
    );
    document.getElementById('fList').innerHTML = generateFeedHTML(filtered);
};
