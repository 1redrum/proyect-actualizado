/* Shared, native billing controls. No checkout or authentication. */
document.addEventListener('DOMContentLoaded', () => {
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), { threshold: .1 });
  document.querySelectorAll('.pricing').forEach((section) => {
    reveal.observe(section);
    const plans = [...section.querySelectorAll('input[name="billing-plan"]')];
    const link = section.querySelector('[data-pricing-link]');
    const initialPlan = new URLSearchParams(location.search).get('plan');
    if (initialPlan === 'monthly' || initialPlan === 'yearly') {
      plans.find(plan => plan.value === initialPlan).checked = true;
    }
    const update = () => {
      const selected = plans.find(plan => plan.checked).value;
      if (link) link.href = selected === 'monthly' ? '/pricing?plan=monthly' : '/pricing';
    };
    plans.forEach(plan => plan.addEventListener('change', update));
    update();
  });
  // Activate the original icon masks only when files exist. A neutral 12px
  // placeholder remains otherwise, and the adjacent feature label is readable.
  const iconRequests = new Map();
  document.querySelectorAll('.pricing__icon').forEach(icon => {
    const path = icon.style.getPropertyValue('--pricing-icon').match(/url\(['"]?([^'")]+)['"]?\)/)?.[1];
    if (!path) return;
    if (!iconRequests.has(path)) iconRequests.set(path, new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = path;
    }));
    iconRequests.get(path).then(exists => icon.classList.toggle('has-original', exists));
  });
});
