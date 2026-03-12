export const feedData = [
    {
        id: "p1",
        priority: 1,
        category: "মহাকাশ বিজ্ঞান",
        author: "নাসা (NASA)",
        title: "জেমস ওয়েব টেলিস্কোপ: মহাবিশ্বের অতীতে এক উঁকি",
        fullDetails: `
            <div style="line-height: 1.8; font-family: 'Segoe UI', sans-serif;">
                <p>জেমস ওয়েব স্পেস টেলিস্কোপ (JWST) বর্তমানে মানবজাতির ইতিহাসের সবচেয়ে শক্তিশালী মহাকাশ পর্যবেক্ষণ যন্ত্র। এটি পৃথিবী থেকে প্রায় <b>১৫ লক্ষ কিলোমিটার</b> দূরে অবস্থান করছে।</p>
                <img src="https://images-assets.nasa.gov/image/PIA25321/PIA25321~small.jpg" style="width:100%; border-radius:12px; margin: 10px 0;" alt="James Webb">
                <p style="color: var(--f-accent); font-weight: 600;">কেন এটি গুরুত্বপূর্ণ?</p>
                <ul style="padding-left: 20px;">
                    <li>এটি মহাবিশ্বের প্রথম নক্ষত্র ও গ্যালাক্সি সন্ধানে সক্ষম।</li>
                    <li>এটি ইনফ্রারেড রশ্মি ব্যবহার করে মহাজাগতিক ধূলিকণার আস্তরণ ভেদ করে দেখতে পায়।</li>
                </ul>
            </div>
        `
    },
    {
        id: "p2",
        priority: 2,
        category: "সাহিত্য",
        author: "রবীন্দ্রনাথ ঠাকুর",
        title: "নির্ঝরের স্বপ্নভঙ্গ: চেতনার জাগরণ",
        fullDetails: `
            <div style="line-height: 2; font-style: italic; color: var(--f-text-secondary); text-align: center; padding: 10px;">
                "আজি এ প্রভাতে রবির কর<br>
                কেমনে পশিল প্রাণের 'পর,<br>
                কেমনে পশিল গুহায় আঁধারে প্রভাতপাখির গান!<br>
                না জানি কেন রে এতদিন পরে জাগিয়া উঠিল প্রাণ।"
            </div>
            <p style="margin-top: 15px; text-align: justify; line-height: 1.6;">
                এই কবিতাটি কবির 'প্রভাতসংগীত' কাব্যগ্রন্থের অন্তর্ভুক্ত। এটি একটি জড়তা ভেঙে প্রাণচঞ্চলতায় ফিরে আসার রূপক হিসেবে বিশ্বসাহিত্যে স্বীকৃত।
            </p>
        `
    },
    {
        id: "p3",
        priority: 3,
        category: "স্বাস্থ্য",
        author: "মেডিকেল জার্নাল",
        title: "পর্যাপ্ত পানি পানের বৈজ্ঞানিক উপকারিতা",
        fullDetails: `
            <div style="background: var(--f-card-hover); padding: 15px; border-radius: 8px;">
                <p style="margin: 0; line-height: 1.8;">আমাদের শরীরের প্রায় <b>৬০%</b> পানি। প্রতিদিন অন্তত ২-৩ লিটার পানি পান করলে:</p>
                <ol style="margin-top: 10px;">
                    <li>শরীরের বিষাক্ত পদার্থ (Toxins) বেরিয়ে যায়।</li>
                    <li>ত্বক উজ্জ্বল ও সতেজ থাকে।</li>
                    <li>মস্তিষ্কের কার্যক্ষমতা বৃদ্ধি পায়।</li>
                </ol>
            </div>
        `
    },
    {
        id: "p4",
        priority: 4,
        category: "দর্শন",
        author: "সক্রেটিস",
        title: "নিজেকে জানো (Know Thyself)",
        fullDetails: `
            <div style="border-left: 4px solid var(--f-accent); padding-left: 15px; margin: 10px 0;">
                <p style="font-size: 1.1rem; line-height: 1.8;">"একমাত্র সত্যিকারের জ্ঞান হলো এটা জানা যে, আপনি কিছুই জানেন না।"</p>
            </div>
            <p style="line-height: 1.7;">সক্রেটিসের এই দর্শন আমাদের বিনয়ী হতে এবং প্রতিনিয়ত সত্য অনুসন্ধানে অনুপ্রাণিত করে। আত্মোপলব্ধিই হলো সকল জ্ঞানের মূল ভিত্তি।</p>
        `
    },
    {
        id: "p5",
        priority: 5,
        category: "প্রযুক্তি",
        author: "টেক রিভিউ",
        title: "আর্টিফিশিয়াল ইন্টেলিজেন্স (AI) এর ভবিষ্যৎ",
        fullDetails: `
            <div style="line-height: 1.8;">
                <p>এআই বা কৃত্রিম বুদ্ধিমত্তা এখন আর কেবল বৈজ্ঞানিক কল্পকাহিনী নয়। এটি আমাদের দৈনন্দিন জীবনের অংশ হয়ে দাঁড়িয়েছে।</p>
                <div style="display: flex; gap: 10px; margin: 10px 0;">
                    <span style="background: #e1f5fe; color: #01579b; padding: 5px 10px; border-radius: 20px; font-size: 12px;">Machine Learning</span>
                    <span style="background: #ede7f6; color: #4527a0; padding: 5px 10px; border-radius: 20px; font-size: 12px;">Neural Networks</span>
                </div>
                <p>ভবিষ্যতে এটি চিকিৎসা বিজ্ঞান এবং জলবায়ু পরিবর্তনের মতো জটিল সমস্যা সমাধানে প্রধান ভূমিকা পালন করবে।</p>
            </div>
        `
    }
];

