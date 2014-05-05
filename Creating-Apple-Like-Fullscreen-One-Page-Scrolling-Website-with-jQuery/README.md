## UIPageScrolling

JQuery плагин, позволяющий представить web-страницу в виде слайдов.
Поддерживает возможность скролла вверх\вниз влева\вправо.

## Demo
Вертикальный скроллинг - http://xnimorz.github.io/UIPageScrolling/DEMO/UIPageScrolling-Vertical-DEMO.html
Горизонтальный скроллинг - http://xnimorz.github.io/UIPageScrolling/DEMO/UIPageScrolling-Horizontal-DEMO.html

## Тестировался

Chrome\Opera\Mozilla\Safari
IE10+

мобильные бразуеры с движком WebKit


## Использование

Для работы с данным плагином, необходимо подключить JQuery версии 1.8 и выше, подключить плагин -
UIPageScrolling.js и добавить таблицу стилей UIPageScrolling.css

Стандартное использование предполагает верстку по типу

````html
<div class=main>
    <section>
        ....
    </section>
    <section>
        ....
    </section>
    <section>
        ....
    </section>
</div>
````

Стандартный вызов:
````javascript
$(".main").UIPageScrolling();
````
Поддерживаемые параметры:
````html
{String} sections : пользовательский селектор (по умолчанию section)
{String} easing : transition-timing-function
{Number} time : время анимации (Целое, > 0)
{Function} beforeMoveFunc : функция, исполняющаяся перед анимацией
{Function} afterMoveFunc : функция, исполняющаяся после анимации
{Boolean} isCyclic : цикличная прокрутка
{Boolean} isVertical : вертикальная\горизонтальная прокрутка
{String} sectionsControl : селектор на выбор слайда
{Boolean} captureKeyboard : захват клавиатуры (управления курсором + Page Up\Down)
{Boolean} captureTouch : захват скроллинга пальцем и мышью (по умолчанию - отключено (false))</div>
````
Параметры передаются в виде JSON объекта:

Пример вызова с перечислением СТАНДАРТНЫХ параметров:
````javascript
$(".main").UIPageScrolling({
    sections : "section",
    easing : "ease",
    time : 1000,
    beforeMoveFunc : null,
    afterMoveFunc : null,
    isCyclic : false,
    isVertical : true,
    sectionsControl : null,
    captureKeyboard : false
});
````

Управление отображаемой страницей
после применения:
````javascript
$(".main").UIPageScrolling();
````

Возможно с помощью вызово функций:
````javascript
$(".main").moveNext(); //Переводит на следующую страницу
$(".main").movePrevious(); //Переводит на предыдущую страницу
$(".main").moveTo(index); //Переводит на выбранную страницу (где index  = от 0 до pageCount - 1)
````




