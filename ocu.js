/* ==========================================
   열린사이버대학교 상담심리학과 메인 자바스크립트
   (basicsociety.go.kr 스타일 인터랙티브 기능 모듈)
   ========================================== */

// 1. Tailwind CSS 커스텀 테마 설정
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#164e87',    /* 깊고 신뢰감 있는 딥블루 */
                secondary: '#1A7162',  /* 차분하고 전문적인 에메랄드 그린 */
            }
        }
    }
};

// DOM 로드 완료 후 모든 이벤트 및 인터랙션 초기화
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHeaderScroll();
    initIntroTabs();
    initNavIntroTabTriggers();
    initNewsCarouselAndFilter();
    initLiveSearch();
    initScheduleWidget();
    initNewsletterForm();
    initMobileMenu();
});

/* ==========================================
   2. 스크롤 등장 애니메이션 (Scroll Reveal)
   ========================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('active'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================
   3. 헤더 스크롤 시 유리(Glassmorphism) 효과
   ========================================== */
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

/* ==========================================
   4. 학과소개 세로 탭 동적 인터랙션
   ========================================== */
const introTabData = {
    goal: {
        title: "상담심리학과란 무엇인가요?",
        subtitle: "현대인의 마음을 치유하는 실무형 전문가 양성",
        desc: "열린사이버대학교 상담심리학과는 복잡한 현대 사회에서 발생하는 다양한 심리적 갈등과 스트레스를 치유하고, 개인의 성장과 발달을 돕는 전문가를 양성합니다. 체계적인 이론 교육과 현장 중심의 실습을 통해, 언제 어디서나 꼭 필요한 맞춤형 상담 서비스를 제공할 수 있는 역량을 키웁니다."
    },
    faculty: {
        title: "우수한 상담심리 분야 전문 교수진",
        subtitle: "이론과 현장 실무를 겸비한 최고 수준의 교수진",
        desc: "학계 및 상담 임상 현장에서 활발히 활동하고 계신 우수한 교수진이 학생 1:1 맞춤형 진로 지도와 깊이 있는 전문 상담 심리 교육을 제공합니다."
    },
    curriculum: {
        title: "체계적인 단계별 커리큘럼",
        subtitle: "기초 심리학부터 고급 임상 상담 실습까지",
        desc: "상담심리학 개론, 발달심리학, 이상심리학 등 탄탄한 이론 기반 위에서 미술치료, 집단상담, 청소년상담 등 실제 현장에서 즉시 활용 가능한 실무 중심 교과목을 완성도 있게 배치하였습니다."
    },
    license: {
        title: "국가 및 전문 자격증 완벽 지원",
        subtitle: "졸업과 동시에 자격 취득을 위한 과목 연계",
        desc: "보건복지부 인정 임상심리사, 여성가족부 청소년상담사, 한국상담심리학회 상담심리사 및 본교 상담심리지도사 자격증 등 취업에 유용한 핵심 자격 취득을 완벽 지원합니다."
    },
    career: {
        title: "무한한 가능성의 졸업 후 진로",
        subtitle: "다양한 심리상담 현장 및 전문 기관 진출",
        desc: "국공립 상담기관, 병원, 학교상담실, 기업체 EAP 상담원, 사설 상담센터 개업 및 대학원 진학(임상/상담심리 전공) 등 다양한 사회 분야에서 마음 전문가로 활약하게 됩니다."
    }
};

function initIntroTabs() {
    const tabBtns = document.querySelectorAll('.intro-tab-btn');
    const titleEl = document.getElementById('intro-title');
    const subtitleEl = document.getElementById('intro-subtitle');
    const descEl = document.getElementById('intro-desc');
    const courseBtn = document.getElementById('intro-course-btn');
    const facultyBtn = document.getElementById('intro-faculty-btn');
    const licenseBtn = document.getElementById('intro-license-btn');
    const careerBtn = document.getElementById('intro-career-btn');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-intro-tab');
            const data = introTabData[key];
            if (!data) return;

            // 탭 액티브 클래스 교체
            tabBtns.forEach(b => b.classList.remove('tab-active'));
            btn.classList.add('tab-active');

            // [사용자 요청 반영] 탭별 전용 안내 버튼 노출 제어
            if (courseBtn) {
                if (key === 'curriculum') {
                    courseBtn.classList.remove('hidden');
                } else {
                    courseBtn.classList.add('hidden');
                }
            }

            if (facultyBtn) {
                if (key === 'faculty') {
                    facultyBtn.classList.remove('hidden');
                } else {
                    facultyBtn.classList.add('hidden');
                }
            }

            if (licenseBtn) {
                if (key === 'license') {
                    licenseBtn.classList.remove('hidden');
                } else {
                    licenseBtn.classList.add('hidden');
                }
            }

            if (careerBtn) {
                if (key === 'career') {
                    careerBtn.classList.remove('hidden');
                } else {
                    careerBtn.classList.add('hidden');
                }
            }

            // 텍스트 페이드 변경 효과
            if (titleEl && subtitleEl && descEl) {
                titleEl.style.opacity = '0';
                subtitleEl.style.opacity = '0';
                descEl.style.opacity = '0';

                setTimeout(() => {
                    titleEl.textContent = data.title;
                    subtitleEl.textContent = data.subtitle;
                    descEl.textContent = data.desc;

                    titleEl.style.opacity = '1';
                    subtitleEl.style.opacity = '1';
                    descEl.style.opacity = '1';
                }, 200);
            }
        });
    });
}

/* ==========================================
   4-2. 상단 내비게이션 전용 탭 연동 핸들러
   ========================================== */
function initNavIntroTabTriggers() {
    const navTriggers = document.querySelectorAll('[data-nav-intro-tab]');
    navTriggers.forEach(link => {
        link.addEventListener('click', () => {
            const targetTabKey = link.getAttribute('data-nav-intro-tab');
            if (!targetTabKey) return;

            const targetTabBtn = document.querySelector(`.intro-tab-btn[data-intro-tab="${targetTabKey}"]`);
            if (targetTabBtn) {
                targetTabBtn.click();
            }
        });
    });
}

/* ==========================================
   5. 최신 소식 탭 필터링 & 좌우 카루셀 슬라이더
   ========================================== */
function initNewsCarouselAndFilter() {
    const carousel = document.getElementById('news-carousel');
    const prevBtn = document.getElementById('news-prev-btn');
    const nextBtn = document.getElementById('news-next-btn');
    const filterBtns = document.querySelectorAll('.news-tab-btn');
    const newsCards = document.querySelectorAll('.news-card');

    // 좌우 슬라이드 이동
    if (carousel && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -320, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // 탭 필터링 기능
    if (filterBtns.length && newsCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // 버튼 스타일 변경
                filterBtns.forEach(b => {
                    b.classList.remove('text-white', 'border-white');
                    b.classList.add('text-blue-200', 'border-transparent');
                });
                btn.classList.remove('text-blue-200', 'border-transparent');
                btn.classList.add('text-white', 'border-white');

                // 카드 노출 제어
                newsCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden-card');
                    } else {
                        card.classList.add('hidden-card');
                    }
                });
            });
        });
    }
}

/* ==========================================
   6. 게시물 실시간 키워드 검색 (Live Search)
   ========================================== */
function initLiveSearch() {
    const searchInput = document.getElementById('search-input');
    const postItems = document.querySelectorAll('#notice-post-list .post-item');

    if (!searchInput || !postItems.length) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        postItems.forEach(item => {
            const title = item.getAttribute('data-search-title').toLowerCase();
            if (title.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

/* ==========================================
   7. 학사 일정 슬라이더 컨트롤
   ========================================== */
const scheduleData = [
    {
        month: "2024년 8월 주요 일정",
        events: [
            { date: "08.15(목)", title: "광복절 (휴무)" },
            { date: "08.20(화)", title: "2학기 수강신청 시작일" },
            { date: "08.30(금)", title: "2학기 수강신청 마감일" }
        ]
    },
    {
        month: "2024년 9월 주요 일정",
        events: [
            { date: "09.02(월)", title: "2학기 개강 및 수업 개시" },
            { date: "09.16(월)~18(수)", title: "추석 연휴 (휴강)" },
            { date: "09.30(월)", title: "수강 변경 및 포기 신청 마감" }
        ]
    },
    {
        month: "2024년 10월 주요 일정",
        events: [
            { date: "10.03(목)", title: "개천절 (휴무)" },
            { date: "10.09(수)", title: "한글날 (휴무)" },
            { date: "10.21(월)~27(일)", title: "2학기 중간고사 시험 기간" }
        ]
    }
];

let currentScheduleIndex = 0;

function initScheduleWidget() {
    const prevBtn = document.getElementById('schedule-prev-btn');
    const nextBtn = document.getElementById('schedule-next-btn');
    const monthEl = document.getElementById('schedule-month');
    const contentEl = document.getElementById('schedule-content');

    if (!prevBtn || !nextBtn || !monthEl || !contentEl) return;

    function renderSchedule(index) {
        const item = scheduleData[index];
        monthEl.textContent = item.month;

        contentEl.innerHTML = item.events.map(ev => `
            <div class="flex items-start gap-3 transform transition-all duration-300">
                <span class="font-bold text-secondary whitespace-nowrap">${ev.date}</span>
                <span class="text-gray-700">${ev.title}</span>
            </div>
        `).join('');
    }

    prevBtn.addEventListener('click', () => {
        currentScheduleIndex = (currentScheduleIndex - 1 + scheduleData.length) % scheduleData.length;
        renderSchedule(currentScheduleIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentScheduleIndex = (currentScheduleIndex + 1) % scheduleData.length;
        renderSchedule(currentScheduleIndex);
    });
}

/* ==========================================
   8. 일반 상세 보기 팝업 모달 (Modal Popup)
   ========================================== */
function openDetailModal(title, content) {
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.textContent = title;
    modalBody.textContent = content;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

function closeDetailModal(event) {
    const modal = document.getElementById('detail-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

/* ==========================================
   9. 비디오 전용 멀티 모달 팝업 (모달창 내부 직접 재생 모드)
   ========================================== */
function openVideoModal(videoUrl, title) {
    const videoModal = document.getElementById('video-modal');
    const videoTitle = document.getElementById('video-modal-title');
    const videoIframe = document.getElementById('video-iframe');

    if (!videoModal || !videoIframe) return;

    if (title && videoTitle) {
        videoTitle.textContent = title;
    }

    // 유튜브 노쿠키 도메인 및 자동재생 주입
    const finalUrl = videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;
    videoIframe.src = finalUrl;
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal(event) {
    const videoModal = document.getElementById('video-modal');
    const videoIframe = document.getElementById('video-iframe');

    if (!videoModal) return;

    videoModal.classList.remove('open');
    document.body.style.overflow = '';

    // 모달이 닫힐 때 비디오와 음성을 완전히 정지시킴
    if (videoIframe) {
        videoIframe.src = '';
    }
}

// ESC 키 입력 시 활성화된 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDetailModal();
        closeVideoModal();
    }
});

/* ==========================================
   10. 소식지 구독 폼 유효성 검사 및 토스트 알림
   ========================================== */
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('sub-name');
        const emailInput = document.getElementById('sub-email');
        const privacy = document.getElementById('privacy');

        if (!privacy.checked) {
            showToast('개인정보 수집 동의에 체크해주세요.');
            return;
        }

        const name = nameInput ? nameInput.value : '';
        showToast(`${name}님, 상담심리학과 소식지 구독 신청이 완료되었습니다!`);

        form.reset();
    });
}

// 토스트 메시지 출력 함수
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* ==========================================
   11. 모바일 햄버거 메뉴 토글
   ========================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');

    if (!menuBtn || !drawer) return;

    menuBtn.addEventListener('click', () => {
        drawer.classList.toggle('hidden');
    });
}
