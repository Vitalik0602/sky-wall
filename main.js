// main.js — Sky Wall 2025 (полная версия)

// === Мобильное меню ===
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.textContent = mobileMenu.classList.contains('active') ? '×' : '☰';
  });

  // Закрытие по клику на ссылку
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.remove('active');
      menuToggle.textContent = '☰';
    }
  });
}

// === Плавное появление хедера при скролле ===
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// === Отправка всех форм в Telegram ===
const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE";   // ← Замени на свой токен
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID_HERE";       // ← Замени на свой ID чата

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Сбор данных
    const service = form.dataset.service || 'Не указано';
    const type = form.querySelector('[name="type"]')?.value || '';
    const packageVal = form.querySelector('[name="package"]')?.value || '';

    const name = form.querySelector('[name="name"]')?.value.trim() || 'Не указано';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
    const email = form.querySelector('[name="email"]')?.value.trim() || '—';
    const message = form.querySelector('[name="message"]')?.value.trim() || '—';

    // Валидация телефона
    if (!phone) {
      alert('Пожалуйста, укажите телефон');
      return;
    }

    // Формирование текста
    let text = `НОВАЯ ЗАЯВКА\n\nУслуга: ${service}`;
    if (type) text += `\nТип: ${type}`;
    if (packageVal) text += `\nПакет: ${packageVal}`;
    text += `\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message}\n\nСтраница: ${window.location.pathname}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        alert('Спасибо! Заявка отправлена. Скоро свяжемся!');
        form.reset();
      } else {
        throw new Error('Ошибка сервера Telegram');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка отправки. Проверьте токен и ID бота в main.js');
    }
  });
});

// === Калькулятор на странице calculator.html ===
function calculatePrice() {
  const serviceSelect = document.getElementBy  ('#service-select');
  const packageSelect = document.getElementById('package-select');
  const resultDisplay = document.getElementById('result-display');

  if (!serviceSelect || !packageSelect || !resultDisplay) return;

  const base = parseInt(serviceSelect.value) || 0;
  const multiplier = parseFloat(packageSelect.value) || 1;
  const total = base * multiplier;

  if (total === 0) {
    resultDisplay.textContent = 'Выберите услугу';
  } else {
    resultDisplay.textContent = total.toLocaleString('ru-RU') + ' ₽';
  }
}

// Автоматический пересчёт при смене селектов
document.getElementById('service-select')?.addEventListener('change', calculatePrice);
document.getElementById('package-select')?.addEventListener('change', calculatePrice);

// === Плавный скролл к секциям (если есть якоря) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// === Закрытие лайтбокса по Esc ===
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
  }
});

// === Дополнительно: анимация при загрузке (опционально) ===
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// LIGHTBOX С ПЕРЕЛИСТЫВАНИЕМ
let currentPhotoIndex = 0;
const allPhotos = document.querySelectorAll('.gallery-grid img');

function openLightbox(index) {
  currentPhotoIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightbox.style.display = 'flex';
  lightboxImg.src = allPhotos[index].src;
  lightboxImg.alt = allPhotos[index].alt;
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function changeLightboxPhoto(direction) {
  currentPhotoIndex = (currentPhotoIndex + direction + allPhotos.length) % allPhotos.length;
  document.getElementById('lightbox-img').src = allPhotos[currentPhotoIndex].src;
}

// Закрытие по Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeLightboxPhoto(-1);
  if (e.key === 'ArrowRight') changeLightboxPhoto(1);
});

// === ИСПРАВЛЕНИЕ: ТЕКСТ В SELECT ВИДЕН ===
document.querySelectorAll('select.input-neon').forEach(select => {
  select.style.color = '#fff';
  select.style.background = 'rgba(255,255,255,0.05)';
  select.addEventListener('change', function() {
    this.style.color = this.value ? '#fff' : '#888';
  });
});

// При загрузке — если уже выбрано значение
document.querySelectorAll('select.input-neon').forEach(select => {
  if (select.value) select.style.color = '#fff';
});