// sidebar.js

export const sidebar = document.querySelector('.sidebar');

export const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);



// close button
const closeBtn = document.getElementById('closeSidebar');
closeBtn.addEventListener('click', closeSidebar);

// Function to open sidebar
export function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
}

// Function to close sidebar
export function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}

// Swipe to close (mobile)
let startX = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50 && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

