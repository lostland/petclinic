const scrollButtons = document.querySelectorAll('[data-scroll]');
scrollButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(btn.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.25,
  }
);

document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

const galleryButtons = document.querySelectorAll('.gallery-toggle .toggle');
const galleryBlocks = document.querySelectorAll('[data-gallery]');

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    galleryButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    galleryBlocks.forEach((block) => {
      const isTarget = block.dataset.gallery === button.dataset.target;
      block.toggleAttribute('hidden', !isTarget);
      if (isTarget) {
        block.classList.add('is-visible');
      }
    });
  });
});

const inquiryForm = document.querySelector('#inquiry-form');
const feedback = inquiryForm?.querySelector('.form-feedback');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(inquiryForm);
    const payload = Object.fromEntries(formData.entries());

    inquiryForm.classList.add('is-submitting');
    feedback.textContent = '문의 접수 중입니다...';
    feedback.style.color = '#fff';

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '문의 접수에 실패했습니다.');
      }

      feedback.textContent = data.message || '문의가 접수되었습니다!';
      feedback.style.color = '#00c9a7';
      inquiryForm.reset();
    } catch (error) {
      feedback.textContent = error.message;
      feedback.style.color = '#ff76b8';
    } finally {
      inquiryForm.classList.remove('is-submitting');
    }
  });
}

const parallaxBadges = document.querySelectorAll('.floating-badge');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  parallaxBadges.forEach((badge, index) => {
    const speed = (index + 1) * 0.08;
    badge.style.transform = `translateY(${Math.sin(scrollY * speed * 0.015) * 14}px)`;
  });
});
