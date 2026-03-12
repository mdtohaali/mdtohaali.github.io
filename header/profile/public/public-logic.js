import { PUBLIC_DATA } from './public-info.js';

export const renderPublicProfile = () => {
    const container = document.getElementById('publicSection');
    if (!container) return;

    container.innerHTML = `
        <div class="p-container">
            <div class="p-card">
                <h3 class="p-title">${PUBLIC_DATA.about.title}</h3>
                <div class="p-about-scroll">
                    <p class="p-desc">${PUBLIC_DATA.about.shortDesc}</p>
                </div>
                <div class="p-grid">
                    ${PUBLIC_DATA.about.menuItems.map(item => `
                        <button class="p-tab" onclick="window.showInfo('${item.id}', '${item.content}', this)">${item.label}</button>
                    `).join('')}
                </div>
                <div id="info-box" class="p-detail-wrapper"><div id="info-content"></div></div>
            </div>

            <div class="p-card">
                <h3 class="p-title">${PUBLIC_DATA.enterprises.title}</h3>
                <div class="p-scroll-area">
                    ${PUBLIC_DATA.enterprises.items.map(item => `
                        <div class="p-item" onclick="window.showEnt('${item.id}', this)">
                            <div class="p-item-head">
                                <strong>${item.name}</strong>
                                <span>${item.desc}</span>
                            </div>
                            <div id="ent-${item.id}" class="p-item-body-wrapper">
                                <div class="p-body-content">${item.details}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="p-card">
                <h3 class="p-title">${PUBLIC_DATA.experience.title}</h3>
                <div class="p-scroll-area">
                    ${PUBLIC_DATA.experience.items.map(exp => `
                        <div class="p-item" onclick="window.showExp('${exp.id}', this)">
                            <div class="p-item-head experience-head">
                                <strong class="role-text">${exp.role}</strong>
                                <span class="company-text">${exp.company}</span>
                                <span class="duration-text">${exp.duration}</span>
                            </div>
                            <div id="exp-${exp.id}" class="p-item-body-wrapper">
                                <div class="p-body-content">${exp.details}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="p-grid">
                ${PUBLIC_DATA.contact.social.map(s => `
                    <a href="${s.link}" target="_blank" class="p-link">${s.platform}</a>
                `).join('')}
            </div>

            <div class="p-contact-note">
                প্রয়োজনে ইমেইল বা সোশ্যাল মিডিয়ার মাধ্যমে সরাসরি যোগাযোগ করতে পারেন।<br>
                আমি দ্রুত উত্তর দেওয়ার চেষ্টা করবো। ইনশাআল্লাহ।
            </div>
        </div>
    `;
};

// --- উইন্ডো ফাংশনসমূহ (অপরিবর্তিত) ---
window.showInfo = (id, content, btn) => {
    const wrapper = document.getElementById('info-box');
    const inner = document.getElementById('info-content');
    const tabs = document.querySelectorAll('.p-tab');
    if (btn.classList.contains('active')) {
        wrapper.style.maxHeight = null;
        wrapper.style.marginTop = "0";
        btn.classList.remove('active');
    } else {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        inner.innerHTML = content;
        wrapper.style.marginTop = "20px";
        wrapper.style.maxHeight = inner.scrollHeight + "px";
    }
    btn.blur();
};

window.showEnt = (id, el) => {
    const wrapper = document.getElementById(`ent-${id}`);
    const isVisible = wrapper.style.maxHeight;
    document.querySelectorAll('.p-item-body-wrapper').forEach(w => w.style.maxHeight = null);
    wrapper.style.maxHeight = isVisible ? null : wrapper.scrollHeight + "px";
    el.blur();
};

window.showExp = (id, el) => {
    const wrapper = document.getElementById(`exp-${id}`);
    const isVisible = wrapper.style.maxHeight;
    document.querySelectorAll('.p-item-body-wrapper').forEach(w => w.style.maxHeight = null);
    wrapper.style.maxHeight = isVisible ? null : wrapper.scrollHeight + "px";
    el.blur();
};

