// Функционал страницы контактов
document.addEventListener("DOMContentLoaded", function () {
  // Маска для телефона
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

  // Обработка формы обратной связи
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const formDataObj = Object.fromEntries(formData.entries());

      // Здесь должна быть отправка данных на сервер
      console.log("Форма обратной связи:", formDataObj);

      // Показываем сообщение об успехе
      alert(
        `Спасибо, ${formDataObj.name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.`
      );

      // Сбрасываем форму
      this.reset();

      // Можно добавить отправку в Google Analytics
      // gtag('event', 'contact_form', {
      //     'event_category': 'conversion',
      //     'event_label': 'contact_page'
      // });
    });
  }

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

  // Анимации при прокрутке
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

  // Анимируем карточки контактов
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Анимируем карточки мессенджеров
  const messengerCards = document.querySelectorAll(".messenger-card");
  messengerCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateX(-30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Анимируем карточки направлений
  const directionCards = document.querySelectorAll(".direction-card");
  directionCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateX(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});
