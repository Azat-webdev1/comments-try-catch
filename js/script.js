const filterByType = (type, ...values) => values.filter(value => typeof value === type), // стрелочная функция, на вход получает переменную type и массив значений.

  hideAllResponseBlocks = () => {
    const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
    responseBlocksArray.forEach(block => block.style.display = 'none');
  }, // функция получает элементы со страницы и каждый элемент скрывает

  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks();
    document.querySelector(blockSelector).style.display = 'block';
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    }
  }, // функция вызывает предыдущую функцию, отображает только блок с указанным селектором, и заменяет содержимое элемента, если передан третий аргумент в функцию

  showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

  showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

  showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
  // эти три функции вызывают предыдущую, передают в неё селектор, первые две ещё переменную + третий аргумент

  tryFilterByType = (type, values) => { // функция принимает две переменные - тип и значение
    try {
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // в переменную присваиается значение из функции filterByType
      const alertMsg = (valuesArray.length) ? // тернарный оператор, в зависимости от длины массива определяет ответ в переменной
        `Данные с типом ${type}: ${valuesArray}` :
        `Отсутствуют данные типа ${type}`;
      showResults(alertMsg); // ответ передается в функцию и выводится на экран
    } catch (e) {
      showError(`Ошибка: ${e}`); // отрабатывает при ошибке в предыдущем блоке
    }
  };

const filterButton = document.querySelector('#filter-btn'); // определяем элемент кнопку

filterButton.addEventListener('click', e => { // навешиваем слушатель на кнопку
  const typeInput = document.querySelector('#type'); // определяем данные из инпута
  const dataInput = document.querySelector('#data'); // определяем данные из инпута

  if (dataInput.value === '') {
    dataInput.setCustomValidity('Поле не должно быть пустым!');
    showNoResults();
  } else {
    dataInput.setCustomValidity('');
    e.preventDefault();
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
}); // в зависимости от данных в поле выводит подсказку о валидации, или запускает функцию фильтрации строки