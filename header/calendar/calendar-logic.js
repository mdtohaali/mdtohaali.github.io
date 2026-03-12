export const calendarConverter = {
    toBanglaNumber(n) {
        return n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
    },

    toBanglaDateString(date) {
        const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
        let day = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        return `${this.toBanglaNumber(day)} ${month} ${this.toBanglaNumber(year)}`;
    },

    getBengaliDate(date = new Date()) {
        const d = new Date(date);
        let day = d.getDate(), month = d.getMonth(), year = d.getFullYear();
        let bYear = (month < 3 || (month === 3 && day < 14)) ? year - 594 : year - 593;
        const bMonths = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
        const monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) monthDays[10] = 31;
        let totalDays = Math.floor((d - new Date(year, 3, 14)) / (1000 * 60 * 60 * 24));
        if (totalDays < 0) totalDays = Math.floor((d - new Date(year - 1, 3, 14)) / (1000 * 60 * 60 * 24));
        let m = 0; while (totalDays >= monthDays[m]) { totalDays -= monthDays[m]; m++; }
        return `${this.toBanglaNumber(totalDays + 1)} ${bMonths[m]}, ${this.toBanglaNumber(bYear)}`;
    },

    getHijriDate(date = new Date()) {
        const d = date.getDate(), m = date.getMonth() + 1, y = date.getFullYear(), h = date.getHours();
        let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + (2 - Math.floor(y/100) + Math.floor(Math.floor(y/100)/4)) - 1524.5;
        if (h >= 18) jd += 1; 
        const epoch = 1948439.5; 
        let totalDays = Math.ceil(jd - epoch) + 1; 
        let cycle = Math.floor((totalDays - 1) / 10631);
        let remainingDays = totalDays - (cycle * 10631);
        let hYear = cycle * 30;
        const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
        for (let i = 1; i <= 30; i++) {
            let daysInYear = leapYears.includes(i) ? 355 : 354;
            if (remainingDays <= daysInYear) { hYear += i; break; }
            remainingDays -= daysInYear;
        }
        const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        if (leapYears.includes(hYear % 30)) monthDays[11] = 30;
        let hMonth = 0, hDay = 0;
        for (let i = 0; i < 12; i++) {
            if (remainingDays <= monthDays[i]) { hMonth = i + 1; hDay = remainingDays; break; }
            remainingDays -= monthDays[i];
        }
        const hMonths = ["মুহাররাম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শা'বান", "রমজান", "শাওয়াল", "জিলকদ", "জিলহজ্জ"];
        return `${this.toBanglaNumber(hDay)} ${hMonths[hMonth - 1]}, ${this.toBanglaNumber(hYear)}`;
    }
};

