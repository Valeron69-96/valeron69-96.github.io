// Функционал страницы расписания
document.addEventListener("DOMContentLoaded", function () {
  // Элементы DOM
  const dayButtons = document.querySelectorAll(".day-btn");
  const categorySelect = document.getElementById("categorySelect");
  const daySchedules = document.querySelectorAll(".day-schedule");
  const classCards = document.querySelectorAll(".class-card");
  const bookButtons = document.querySelectorAll(".btn-book");
  const bookingModal = document.getElementById("bookingModal");
  const quickBookingForm = document.getElementById("quickBookingForm");
  const mainBookingForm = document.getElementById("bookingForm");
  const modalClose = document.querySelector(".modal__close");
  const modalOverlay = document.querySelector(".modal__overlay");

  // Текущие фильтры
  let currentDayFilter = "all";
  let currentCategoryFilter = "all";

  // Фильтрация по дням
  dayButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Убираем активный класс у всех кнопок
      dayButtons.forEach((btn) => btn.classList.remove("active"));
      // Добавляем активный класс текущей кнопке
      this.classList.add("active");

      currentDayFilter = this.dataset.day;
      applyFilters();
    });
  });

  // Фильтрация по категориям
  categorySelect.addEventListener("change", function () {
    currentCategoryFilter = this.value;
    applyFilters();
  });

  // Применение фильтров
  function applyFilters() {
    daySchedules.forEach((schedule) => {
      const day = schedule.dataset.day;
      const classCardsInDay = schedule.querySelectorAll(".class-card");
      let hasVisibleClasses = false;

      classCardsInDay.forEach((card) => {
        const category = card.dataset.category;
        const dayMatch = currentDayFilter === "all" || currentDayFilter === day;
        const categoryMatch =
          currentCategoryFilter === "all" || currentCategoryFilter === category;

        if (dayMatch && categoryMatch) {
          card.style.display = "grid";
          hasVisibleClasses = true;
        } else {
          card.style.display = "none";
        }
      });

      // Показываем/скрываем день в зависимости от наличия видимых занятий
      schedule.style.display = hasVisibleClasses ? "block" : "none";
    });
  }

  // Быстрая запись через кнопки "Записаться"
  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.disabled) return;

      const classCard = this.closest(".class-card");
      const className = classCard.querySelector(".class-name").textContent;
      const classTime = classCard.querySelector(".class-time").textContent;
      const classTrainer = classCard
        .querySelector(".class-trainer")
        .textContent.replace("Тренер: ", "");

      // Заполняем модальное окно
      document.getElementById("modalClassName").textContent = className;
      document.getElementById("modalClassTime").textContent = classTime;
      document.getElementById("modalClassTrainer").textContent = classTrainer;

      // Показываем модальное окно
      bookingModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Закрытие модального окна
  function closeModal() {
    bookingModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  // ESC для закрытия модального окна
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && bookingModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Быстрая форма записи
  quickBookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const userName = formData.get("quickUserName");
    const userPhone = formData.get("quickUserPhone");
    const className = document.getElementById("modalClassName").textContent;
    const classTime = document.getElementById("modalClassTime").textContent;

    // Здесь должна быть отправка данных на сервер
    console.log("Быстрая запись:", {
      userName,
      userPhone,
      className,
      classTime,
    });

    // Показываем сообщение об успехе
    alert(
      `Спасибо, ${userName}! Вы записаны на "${className}" (${classTime}). Мы позвоним вам для подтверждения.`
    );

    closeModal();
    this.reset();
  });

  // Основная форма записи
  mainBookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formDataObj = Object.fromEntries(formData.entries());

    // Здесь должна быть отправка данных на сервер
    console.log("Основная запись:", formDataObj);

    // Показываем сообщение об успехе
    alert(
      `Спасибо, ${formDataObj.userName}! Вы записаны на тренировку. Мы отправили подтверждение на ${formDataObj.userEmail}`
    );

    this.reset();
  });

  // Навигация по неделям (упрощенная версия)
  const weekNavPrev = document.querySelector(".week-nav-btn--prev");
  const weekNavNext = document.querySelector(".week-nav-btn--next");
  const currentWeekElement = document.querySelector(".current-week");

  let currentWeekOffset = 0;

  weekNavPrev.addEventListener("click", function () {
    currentWeekOffset--;
    updateWeekDisplay();
  });

  weekNavNext.addEventListener("click", function () {
    currentWeekOffset++;
    updateWeekDisplay();
  });

  function updateWeekDisplay() {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - today.getDay() + 1 + currentWeekOffset * 7
    );
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const options = { day: "numeric", month: "long" };
    const startStr = startOfWeek.toLocaleDateString("ru-RU", options);
    const endStr = endOfWeek.toLocaleDateString("ru-RU", options);
    const year = startOfWeek.getFullYear();

    currentWeekElement.textContent = `Текущая неделя: ${startStr} - ${endStr} ${year}`;

    // Блокируем кнопку "Предыдущая неделя" если мы на текущей неделе
    weekNavPrev.disabled = currentWeekOffset === 0;
  }

  // Инициализация
  updateWeekDisplay();

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

  // Анимация появления карточек
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

  // Добавляем анимации для карточек занятий
  classCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});
