document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contact-form');
  const msgEl = document.getElementById('form-msg');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const body = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        service: form.service.value,
        message: form.message.value.trim(),
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          msgEl.textContent = 'Message sent! I\'ll get back to you soon.';
          msgEl.className = 'form-msg success';
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        msgEl.textContent = 'Something went wrong. Please try again.';
        msgEl.className = 'form-msg error';
      } finally {
        btn.innerHTML = 'Send Message <span class="arrow">→</span>';
        btn.disabled = false;
      }
    });
  }

});
