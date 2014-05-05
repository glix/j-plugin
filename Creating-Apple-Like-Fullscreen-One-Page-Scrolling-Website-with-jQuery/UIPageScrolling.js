/**
 * UIPageScrolling.js v1.0
 *
 * JQuery plugin
 *
 * by Nikita Mostovoy
 */

(function($) {
    /**
     * Стандарные настройки
     * section {String} - селектор элементов
     * easing {String} - transition-timing-function
     * time {Number} - время анимации
     * beforeMoveFunc {Function} - функция, выполняющаяся перед анимацией
     * afterMoveFunc {Function} - функция, выполняющаяся после анимации
     * isCyclic {Boolean} - циклическое переключение "слайдов"
     * isVertical {Boolean} - вертикальная прокрутка, false = горизонтальная
     * sectionsControl {String} - селектор на выбор секции
     * captureKeyboard {Boolean} - управление как мышкой, так и клавиатурой
     * captureTouch {Boolean} - управление переключением слайдов касанием
     */
    var defaults = {
        sections : "section",
        easing : "ease",
        time : 1000,
        beforeMoveFunc : null,
        afterMoveFunc : null,
        isCyclic : false,
        isVertical : true,
        sectionsControl : null,
        captureKeyboard : false,
        captureTouch : false
    };

    /**
     * Создаем прокрутку по заданному div
     * @param settings - польховательские настройки
     * @returns {*|HTMLElement} JQuery object
     */
    $.fn.UIPageScrolling = function (settings) {
        var options = $.extend({}, defaults, settings),
            index = 0,
            current = $(this),
            maxIndex = 0,
            lockNext = false,
            lockPrev = false;

        /**
         * reset mouse events
         */
        function unbindMouseEvents() {
            current.unbind("mousemove")
                .unbind("mouseup")
                .bind("mousedown", mouseDownEvent);
        };

        /**
         * mouse down and move events
         */
        function mouseDownEvent() {
            var lastClient = -1;
            current.bind("mousemove", function(e) {
                var delta;
                if (lastClient == -1) {
                    lastClient = options.isVertical? e.clientY : e.clientX;
                }
                delta = lastClient - (options.isVertical? e.clientY : e.clientX);
                if (delta > 150) {
                    current.moveNext();
                }
                if (delta < -150) {
                    current.movePrevious();
                }
            })
                .bind("mouseup", unbindMouseEvents)
                .unbind("mousedown");
        };

        /**
         * touch event
         */
        function touchStartEvent(e) {
            e = window.event || e.originalEvent;
            var lastClient = options.isVertical? e.touches[0].pageY : e.touches[0].pageX;
            current.bind("touchmove", function(e) {
                    e = window.event || e.originalEvent;
                    var delta = lastClient - (options.isVertical? e.touches[0].pageY : e.touches[0].pageX);
                    if (delta >= 50) {
                        current.moveNext();
                     }
                     if (delta <= -50) {
                         current.movePrevious();
                     }
                    if (Math.abs(delta) >= 50) {
                        current.unbind("touchmove");
                    }
                });
        }

        /**
         * Перевод слайда к заданному
         * @param position - позиция (в процентах)
         * @param options - опции
         * @param index - индекс целевого слайда
         * @returns {*|HTMLElement}
         */
         function transformPageTo(index) {

            var position = index * 100,
                positionX = 0,
                positionY = 0;

            $('.ui-page-scrolling-section_active').removeClass('ui-page-scrolling-section_active');
            $('.ui-page-scrolling-control_active').removeClass('ui-page-scrolling-control_active');

            $('.ui-page-scrolling-control[data-index=' + index + ']').addClass('ui-page-scrolling-control_active');
            $('.ui-page-scrolling-section[data-index=' + index + ']').addClass('ui-page-scrolling-section_active');
            if (options.beforeMoveFunc instanceof Function) options.beforeMoveFunc(index);

            if (position > 0) {
                position = -position;
            }

            if (options.isVertical) {
                positionY = position;
            } else {
                positionX = position;
            }

            $(this).css({
                "-webkit-transform": "translate3d(" + positionX + "%, " + positionY + "%, 0)",
                "-webkit-transition": "all " + options.time + "ms " + options.easing,
                "-moz-transform": "translate3d(" + positionX + "%, " + positionY + "%, 0)",
                "-moz-transition": "all " + options.time + "ms " + options.easing,
                "-ms-transform": "translate3d(" + positionX + "%, " + positionY + "%, 0)",
                "-ms-transition": "all " + options.time + "ms " + options.easing,
                "transform": "translate3d(" + positionX + "%, " + positionY + "%, 0)",
                "transition": "all " + options.time + "ms " + options.easing
            })
                .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                    options.lockManager();
                    if (options.afterMoveFunc instanceof Function) options.afterMoveFunc(index);
                });
        }

        transformPageTo = transformPageTo.bind(this);

        /**
         * переход на слайд по заданному индексу
         * @param index
         */
        $.fn.moveTo = function(index) {
            if (index < 0 || index > maxIndex) throw new Error("Index must be smaller than count of existing pages and greater than 0");
            transformPageTo(index);
        };

        /**
         * Переход на следующий слайд
         */
        $.fn.moveNext = function() {
            if (lockNext) return;
            var lastIndex = $('.ui-page-scrolling-section_active').attr('data-index');
            lastIndex++;
            if (lastIndex > maxIndex && options.isCyclic) lastIndex = 0;
            if (lastIndex <= maxIndex) {
                lockNext = true;
                lockPrev = false;
                $(this).moveTo(lastIndex);
            }
        };

        /**
         * Переход на предыдущий слайд
         */
        $.fn.movePrevious = function() {
            if (lockPrev) return;
            var lastIndex = $('.ui-page-scrolling-section_active').attr('data-index');
            lastIndex--;
            if (lastIndex < 0 && options.isCyclic) lastIndex = maxIndex;
            if (lastIndex >= 0) {
                lockNext = false;
                lockPrev = true;
                $(this).moveTo(lastIndex);
            }
        };

        /**
         * Обработка нажатия клавиши
         * @param {Event} e
         */
        function processKeyEvent(e) {
            switch (e.keyCode) {
                case 38:
                case 37:
                case 33:
                    $(this).movePrevious();
                    break;
                case 40:
                case 39:
                case 34:
                    $(this).moveNext();
                    break;
            }
        }

        processKeyEvent = processKeyEvent.bind(this);

        /**
         * Работа с колесом мышки
         * @param e
         */
        function processMouseWheel(e) {
              var event = window.event || e.originalEvent,
                  delta = event.wheelDelta || (-120) * event.detail,
                  topDelta = 200;
              if (event.wheelDelta) topDelta = 10;
              if (delta < -topDelta) $(this).moveNext();
              if (delta > topDelta) $(this).movePrevious()
        }

        processMouseWheel = processMouseWheel.bind(this);

        /**
         * убирает блокировки на скроллинг
         */
        options.lockManager = function() {
            lockNext = false;
            lockPrev = false;
        };

        //настройка слайдов (положение, data-аттрибуты)
        current.children(options.sections)
            .addClass("ui-page-scrolling-section").each(function () {
                if (options.isVertical) {
                    $(this).css({top: index * 100 + "%"});
                } else {
                    $(this).css({left: index * 100 + "%"});
                }
                $(this).attr('data-index',index++);
            });


        maxIndex = index-1;

        //Настройка переключателей (если есть)
        index = 0;
        if (options.sectionsControl) {
            $(options.sectionsControl)
                .addClass("ui-page-scrolling-control").each(function () {
                    $(this).attr('data-index', index++).bind("click keypress", function () {
                        current.moveTo($(this).attr('data-index'));
                    });
                });
        }

        //захват мыши и касаний
        if (options.captureTouch) {
            current.bind("mousedown", mouseDownEvent);
            current.bind("touchstart", touchStartEvent);
        }

        //Стандартная настройка
        current.addClass('ui-page-scrolling-main')
            .bind("mousewheel DOMMouseScroll", processMouseWheel);

        transformPageTo(0);

        //захват нажатий клавиш
        if (options.captureKeyboard) {
            $(window).bind("keydown", processKeyEvent);
        }

        return $(this);
    }



})(window.jQuery);