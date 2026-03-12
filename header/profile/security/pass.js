import { renderLifeGraph } from '../sidebar/graph/graph-logic.js';
import { renderZakatGraph } from '../sidebar/graph/zakat-logic.js';

const SETTINGS = {
    password: " ",
    basePenalty: 10
};

let attempts = 0;
let isLocked = false;

// সিকিউরিটি বক্স রেন্ডার করার ফাংশন
const renderSecurityBox = () => {
    const wrapper = document.getElementById('privateSecurityWrapper');
    if (!wrapper) return;

    wrapper.innerHTML = `
        <div class="private-box" id="privateBox" style="display: none;">
            <div class="private-title" id="privateTrigger" style="cursor: pointer; color: #ff4d4d; margin-top: 20px;">
                ব্যক্তিগত তথ্য দেখতে পাসওয়ার্ড দিন
            </div>
            <div id="passwordArea" style="margin-top: 15px;">
                <input type="password" id="passwordInput" placeholder="পাসওয়ার্ড লিখুন">
                <button id="unlockBtn">প্রবেশ করুন</button>
            </div>
            <div id="lockMessage" style="margin-top: 10px;"></div>
        </div>
        <div id="privateContent"></div>
    `;
    
    // HTML ইনজেক্ট করার পর সিকিউরিটি লজিক ইনিশিয়ালাইজ করা
    initializeSecurity();
};

const initializeSecurity = () => {
    const passwordInput = document.getElementById('passwordInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const lockMessage = document.getElementById('lockMessage');
    const privateBox = document.getElementById('privateBox');
    const sidebarProfile = document.querySelector('.sidebar-profile');
    const publicSection = document.getElementById('publicSection');

    if (!unlockBtn || !passwordInput) return;

    const attemptUnlock = () => {
        if (isLocked) return;

        if (passwordInput.value.trim() === SETTINGS.password) {
            // সফল হলে সিকিউরিটি বক্স সরিয়ে ফেলা
            if (privateBox) privateBox.remove(); 
            if (publicSection) publicSection.style.display = 'none';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'unlocked-content';
            infoDiv.innerHTML = `
                ${renderLifeGraph()}
                ${renderZakatGraph()}
            `; 
            sidebarProfile.appendChild(infoDiv);
        } else {
            attempts++;
            startLockout(passwordInput, unlockBtn, lockMessage);
        }
    };

    unlockBtn.onclick = attemptUnlock;
    passwordInput.onkeypress = (e) => { 
        if (e.key === 'Enter') attemptUnlock(); 
    };
};

function startLockout(input, btn, msg) {
    isLocked = true;
    input.disabled = true;
    btn.disabled = true;
    let timeLeft = attempts * SETTINGS.basePenalty;

    const timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            isLocked = false;
            input.disabled = false;
            btn.disabled = false;
            input.value = "";
            msg.innerText = "আবার চেষ্টা করুন।";
            msg.style.color = "#2ecc71";
        } else {
            msg.innerText = `ভুল পাসওয়ার্ড! ${timeLeft} সেকেন্ড অপেক্ষা করুন।`;
            msg.style.color = "#ff4d4d";
            timeLeft--;
        }
    }, 1000);
}

//DOMContentLoaded ইভেন্টে রেন্ডারিং শুরু করা
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    renderSecurityBox();
} else {
    document.addEventListener('DOMContentLoaded', renderSecurityBox);
}

