// Функционал страницы акций
document.addEventListener("DOMContentLoaded", function () {
  // Таймер обратного отсчета
  function updateTimer() {
    const timerElement = document.getElementById("mainTimer");
    if (!timerElement) return;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    // Устанавливаем дату окончания акции (14 дней от текущей даты)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14);
    endDate.setHours(23, 59, 59, 999);

    function update() {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        // Акция завершена
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysElement.textContent = days.toString().padStart(2, "0");
      hoursElement.textContent = hours.toString().padStart(2, "0");
      minutesElement.textContent = minutes.toString().padStart(2, "0");
      secondsElement.textContent = seconds.toString().padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
  }

  // Табы сезонных предложений
  function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.dataset.tab;

        // Убираем активный класс у всех кнопок и панелей
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabPanes.forEach((pane) => pane.classList.remove("active"));

        // Добавляем активный класс текущей кнопке и панели
        this.classList.add("active");
        document.getElementById(tabId).classList.add("active");
      });
    });
  }

  // Обработка форм
  function initForms() {
    const trialForm = document.getElementById("trialForm");

    if (trialForm) {
      trialForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const formDataObj = Object.fromEntries(formData.entries());

        // Здесь должна быть отправка данных на сервер
        console.log("Заявка на пробное занятие:", formDataObj);

        // Показываем сообщение об успехе
        alert(
          `Спасибо, ${formDataObj.trialName}! Ваша заявка на пробное занятие принята. Мы свяжемся с вами в течение 2 часов для подтверждения времени.`
        );

        // Сбрасываем форму
        this.reset();
      });
    }

    // Обработка кнопок "Участвовать" на карточках акций
    const promoButtons = document.querySelectorAll(".promo-card .btn");
    promoButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const card = this.closest(".promo-card");
        const title = card.querySelector(".promo-card__title").textContent;
        const discount = card.querySelector(".promo-card__badge").textContent;

        // Здесь можно открыть модальное окно или перенаправить на форму
        alert(
          `Вы выбрали акцию: "${title}" (${discount}). Скоро с вами свяжется наш менеджер для уточнения деталей.`
        );

        // Отслеживание в аналитике
        // gtag('event', 'promo_click', {
        //     'promo_name': title,
        //     'promo_discount': discount
        // });
      });
    });

    // Обработка кнопок на баннерах
    const bannerButtons = document.querySelectorAll(".banner .btn");
    bannerButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const banner = this.closest(".banner");
        const title = banner.querySelector(".banner__title").textContent;

        if (title.includes("пробное")) {
          // Прокрутка к форме пробного занятия
          document.querySelector(".trial-conditions").scrollIntoView({
            behavior: "smooth",
          });
        } else {
          // Открытие модального окна или переход
          alert(
            `Спасибо за интерес к акции "${title}"! Наш менеджер свяжется с вами для уточнения деталей.`
          );
        }
      });
    });
  }

  // Маска для телефона
  function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach((input) => {
      input.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length === 0) return;

        if (value[0] === "7" || value[0] === "8") {
          value = value.substring(1);
        }

        let formattedValue = "+7 (";

        if (value.length > 0) {
          formattedValue += value.substring(0, 3);
        }
        if (value.length >= 4) {
          formattedValue += ") " + value.substring(3, 6);
        }
        if (value.length >= 7) {
          formattedValue += "-" + value.substring(6, 8);
        }
        if (value.length >= 9) {
          formattedValue += "-" + value.substring(8, 10);
        }

        e.target.value = formattedValue;
      });
    });
  }

  // Анимации при прокрутке
  function initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Анимируем карточки акций
    const promoCards = document.querySelectorAll(".promo-card");
    promoCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

    // Анимируем баннеры
    const banners = document.querySelectorAll(".banner");
    banners.forEach((banner, index) => {
      banner.style.opacity = "0";
      banner.style.transform = "translateX(-50px)";
      banner.style.transition = `opacity 0.6s ease ${
        index * 0.2
      }s, transform 0.6s ease ${index * 0.2}s`;
      observer.observe(banner);
    });

    // Анимируем условия
    const conditions = document.querySelectorAll(".condition-item");
    conditions.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-30px)";
      item.style.transition = `opacity 0.6s ease ${
        index * 0.1
      }s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(item);
    });
  }

  // Инициализация всех функций
  updateTimer();
  initTabs();
  initForms();
  initPhoneMask();
  initAnimations();

  // Плавная прокрутка к якорям
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
