[![Build status](https://ci.appveyor.com/api/projects/status/hc42fr9rrp9x8x13?svg=true)](https://ci.appveyor.com/project/nirastor/test-avito-avs)


***

# Тестовое в avito-AVS

## Сборка  
https://nirastor.github.io/test-avito-avs/

## Комментарии к реализации
- Сохранение в localstorage — при каждом изменении. Загрузка из хранилища при загрузке страницы
- Кросбраузерность — Нужен полифил для closest для IE
- Ширины элементов: выбрал на свое усмотрение, чтобы нормально выглядело. В реальном проекте нужно смотреть по реальным данным
- Не делал тесты :-(

## [Оригинал ТЗ] Тестовое задание для стажёра в команду VAS

### Описание
Написать приложение-редактор, для создания баннеров. За основу нужно взять [баннер из stories](https://i.imgur.com/K3ituxT.png) на главной Авито.
Баннер создаётся из формы, которую можно заполнить на странице и сериализовать в `json`. Получившийся баннер можно экспортировать картинкой, а также как разметку.

### Приложение состоит из:
* Превью баннера
* Формы ввода параметров баннера
* 3 кнопок экспорта:
    * сохранить картинку в `png`
    * скопировать баннер в буфер обмена, как `html` или `jsx` строку (на ваше усмотрение)
    * скопировать конфигурацию баннера в буфер обмена, как `json` строку

### Баннер может:
* иметь иллюстрацию (по ссылке или `dataURI`)
* отображать не более 3 строк текста, но текст может быть какой угодно длины
* иметь заливку цветом ([`color`](https://developer.mozilla.org/ru/docs/Web/CSS/color_value) или [`gradient`](https://developer.mozilla.org/ru/docs/Web/CSS/gradient))
* при клике на баннер можно перейти по заданной ссылке (в случае с выгружаемой разметкой)

### Дизайн и технологии
Дизайн, framework и библиотеки могут быть выбраны на ваше усмотрение. Финальную версию разработанного приложения выложить на github.com. Приветствуется написание тестов.

### Критерии приёмки
Задание должно быть выполнено в срок до 2-ух недель. Исходный код можно скачать (`git clone`) и запустить локально (`npm install && npm start`).
После запуска приложение должно быть доступно в браузере по адресу `localhost:3999`.
