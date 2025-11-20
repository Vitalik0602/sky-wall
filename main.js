// main.js — полностью рабочий

// Мобильное меню
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.toggle('active');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.remove('active');
  });
});

// === Отправка форм в Telegram ===
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";  // ← Замени на свой токен
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID_HERE";     // ← Замени на свой ID

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const service = form.dataset.service || 'Не указано';
    const type = form.querySelector('[name="type"]')?.value || '';
    const packageVal = form.querySelector('[name="package"]')?.value || '';

    const name = form.name?.value.trim() || 'Не указано';
    const phone = form.phone?.value.trim() || '';
    const email = form.email?.value.trim() || '—';
    const message = form.message?.value.trim() || '—';

    if (!phone) {
      alert('Введите телефон!');
      return;
    }

    let text = `НОВАЯ ЗАЯВКА\n\nУслуга: ${service}`;
    if (type) text += ` | ${type}`;
    if (packageVal) text += ` | ${packageVal}`;
    text += `\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}`;

    try {
      const res = await fetch(url);
      if (res.ok) {
        alert('Заявка отправлена в Telegram! Мы свяжемся с вами.');
        form.reset();
      } else {
        alert('Ошибка отправки. Проверьте токен и ID бота.');
      }
    } catch {
      alert('Нет интернета или ошибка.');
    }
  });
});

// === Калькулятор ===
const calcDisplay = document.getElementById('calc-display');

if (calcDisplay) {
  window.addToCalc = function(value) {
    if (calcDisplay.textContent === '0' || calcDisplay.textContent === 'Ошибка') {
      calcDisplay.textContent = value;
    } else {
      calcDisplay.textContent += value;
    }
  };

  window.clearCalc = function() {
    calcDisplay.textContent = '0';
  };

  window.calculate = function() {
    try {
      let expr = calcDisplay.textContent.replace(/×/g, '*').replace(/÷/g, '/');
      calcDisplay.textContent = eval(expr);
    } catch {
      calcDisplay.textContent = 'Ошибка';
    }
  };
}