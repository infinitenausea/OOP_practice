'use strict'

const DomElement = function (selector, height, width, bg, fontSize, posAbsOrStatic) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = {
        top: 0,
        left: 300,
    };
    this.posAbsOrStatic = posAbsOrStatic //принимаем absolute или static

    this.createNewElements = function (inputText) {
        let newElement;

        if (this.selector.startsWith('.')) {
            newElement = document.createElement('div');
            newElement.className = this.selector.slice(1);
        } else if (this.selector.startsWith('#')) {
            newElement = document.createElement('p');
            newElement.id = this.selector.slice(1);
        } else {
            console.error('Селектор должен начинаться с точки или решётки!');
            return;
        }

        newElement.style.cssText = `
        height: ${this.height};
        width: ${this.width};
        background: ${this.bg};
        font-size: ${this.fontSize};
        padding: 10px;
        margin: 10px;
        box-sizing: border-box;
        border: 2px solid black;
        top: ${this.position.top}px;
        left: ${this.position.left}px;
        position: ${this.posAbsOrStatic};
        `;

        newElement.textContent = inputText;

        document.body.append(newElement);

        return newElement;
    };

    this.moveElement = function (direction, element) {
        const step = 10; // 

        switch (direction) {
            case 'ArrowUp':
                this.position.top -= step;
                break;
            case 'ArrowDown':
                this.position.top += step;
                break;
            case 'ArrowLeft':
                this.position.left -= step;
                break;
            case 'ArrowRight':
                this.position.left += step;
                break;
        }

        element.style.top = `${this.position.top}px`;
        element.style.left = `${this.position.left}px`;
    };
};

const newCreatedElement1 = new DomElement('.block', '76px', '200px', 'lightblue', '16px', 'static');
const container = newCreatedElement1.createNewElements('this is block');
const newCreatedElement2 = new DomElement('#someID', '56px', '200px', 'yellow', '26px', 'static');
const paragraph = newCreatedElement2.createNewElements('this is paragraph');


document.addEventListener('DOMContentLoaded', function () {

    const square = new DomElement('.square', '100px', '100px', 'blue', '16px', 'absolute');

    // Создаем элемент и сохраняем ссылку на него
    const squareElement = square.createNewElements('SQUARE');

    // Обработчик события для клавиш стрелок
    document.addEventListener('keydown', function (event) {
        // Проверяем, что нажата одна из клавиш стрелок
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            // Перемещаем квадрат
            square.moveElement(event.key, squareElement);

            // Предотвращаем прокрутку страницы при нажатии стрелок
            event.preventDefault();
        }
    });
});