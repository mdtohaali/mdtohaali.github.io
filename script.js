import { openSidebar } from './header/profile/sidebar/sidebar.js';
import './header/profile/security/pass.js'; 
import { renderPublicProfile } from './header/profile/public/public-logic.js';
import { initCalendar } from './header/calendar/calendar-view.js';
import { renderNewsFeed } from './body/feed-view.js';

/**
 * গ্লোবাল ফাংশন: বডি স্ক্রল লক/আনলক
 */
function toggleScrollLock(isLocked) {
    if (isLocked) {
        document.body.classList.add('sidebar-open');
    } else {
        document.body.classList.remove('sidebar-open');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ১. নিউজফিড ও ক্যালেন্ডার ইনিশিয়াল করুন
    initCalendar();

    const homeBody = document.getElementById('home-body');
    if (homeBody) {
        homeBody.innerHTML = renderNewsFeed();
    }

    // ২. এলিমেন্ট রেফারেন্স সংগ্রহ
    const profileBtn = document.getElementById("profileBtn");
    const nameBtn = document.getElementById("nameBtn");
    const sidebar = document.querySelector(".sidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const smartHeader = document.getElementById('smartHeader'); // স্মার্ট হেডারের রেফারেন্স
    
    const publicSection = document.getElementById("publicSection");
    const passwordArea = document.getElementById("passwordArea");
    const privateBox = document.getElementById("privateBox");

    // --- ৩. স্মার্ট হেডার হাইড/শো লজিক ---
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (smartHeader) {
            // যদি নিচে স্ক্রল করা হয় এবং ১০০ পিক্সেলের বেশি নিচে নামা হয়
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                smartHeader.classList.add('header-hidden');
            } 
            // যদি উপরে স্ক্রল করা হয়
            else {
                smartHeader.classList.remove('header-hidden');
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

    // ৪. নামে ক্লিক: পাবলিক সাইডবার ওপেন
    if (nameBtn) {
        nameBtn.addEventListener("click", () => {
            if (sidebar) {
                sidebar.classList.add("active");
                toggleScrollLock(true);
            }
            
            if (publicSection) {
                renderPublicProfile(); 
                publicSection.style.display = "block";
            }
            
            if (privateBox) privateBox.style.display = "none";
            if (passwordArea) passwordArea.style.display = "none";

            const unlockedContent = document.querySelector('.unlocked-content');
            if (unlockedContent) unlockedContent.style.display = "none"; 
        });
    }

    // ৫. প্রোফাইল ছবিতে ক্লিক: প্রাইভেট সাইডবার ওপেন
    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            if (sidebar) {
                sidebar.classList.add("active");
                toggleScrollLock(true);
            }
            
            if (publicSection) publicSection.style.display = "none";
            
            const unlockedContent = document.querySelector('.unlocked-content');
            if (unlockedContent) {
                unlockedContent.style.display = "block"; 
                if (privateBox) privateBox.style.display = "none"; 
            } else {
                if (privateBox) privateBox.style.display = "block"; 
                if (passwordArea) passwordArea.style.display = "block";
            }
        });
    }

    // ৬. সাইডবার বন্ধ করার বাটন
    if (closeSidebar) {
        closeSidebar.addEventListener("click", () => {
            if (sidebar) {
                sidebar.classList.remove("active");
                toggleScrollLock(false);
            }
        });
    }

    // ৭. বাইরে ক্লিক করলে সাইডবার বন্ধ করা
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !profileBtn.contains(e.target) && !nameBtn.contains(e.target)) {
                sidebar.classList.remove('active');
                toggleScrollLock(false);
            }
        }
    });
});
