/* =====================================================
   Graduate Verification Demo
   Lightweight vanilla JavaScript for UI interactions
   ===================================================== */

const initPage = () => {
  document.body.classList.add('is-loaded');

  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  initRevealAnimations();
  initCopyButton();
  initScrollTopButton();
};

const initRevealAnimations = () => {
  const revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const initCopyButton = () => {
  const copyButton = document.querySelector('[data-copy-target]');
  if (!copyButton) return;

  const originalText = copyButton.textContent;

  copyButton.addEventListener('click', async () => {
    const targetId = copyButton.getAttribute('data-copy-target');
    const target = targetId ? document.getElementById(targetId) : null;
    const value = target?.textContent?.trim();

    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      copyButton.textContent = 'Copied';
      copyButton.setAttribute('aria-label', 'Reference ID copied');
    } catch (error) {
      copyButton.textContent = 'Copy unavailable';
    }

    window.setTimeout(() => {
      copyButton.textContent = originalText;
      copyButton.setAttribute('aria-label', 'Copy reference ID');
    }, 1800);
  });
};

const initScrollTopButton = () => {
  const scrollButton = document.querySelector('.scroll-top');
  if (!scrollButton) return;

  const toggleButton = () => {
    scrollButton.classList.toggle('is-visible', window.scrollY > 520);
  };

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleButton, { passive: true });
  toggleButton();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
