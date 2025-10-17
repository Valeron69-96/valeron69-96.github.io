// FAQ аккордеон
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-item__question");

    question.addEventListener("click", function () {
      // Закрываем все остальные элементы
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Переключаем текущий элемент
      item.classList.toggle("active");
    });
  });

  // Обработка кнопок выбора тарифа
  const tariffButtons = document.querySelectorAll(".pricing-card__footer .btn");

  tariffButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tariffTitle = this.closest(".pricing-card").querySelector(
        ".pricing-card__title"
      ).textContent;
      const tariffPrice = this.closest(".pricing-card").querySelector(
        ".pricing-card__amount"
      ).textContent;

      // Здесь можно добавить логику для перехода к оплате или форме заявки
      alert(
        `Вы выбрали тариф "${tariffTitle}" за ${tariffPrice} в месяц! Скоро с вами свяжется наш менеджер.`
      );

      // Можно также добавить отправку данных в Google Analytics
      // gtag('event', 'tariff_selection', {
      //     'tariff_name': tariffTitle,
      //     'tariff_price': tariffPrice
      // });
    });
  });

  // Плавная прокрутка к секциям при клике на якорные ссылки
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
