// ДЕЙСТВИЯ ПО СМОТРЕТЬ МЕНЮ
// вызов действия по нажатию кнопки  "Смотреть меню" строка в html c идентификатором id="main-action-button"
//<button className="button" id="main-action-button">Смотреть меню</button>
//после ввода document.getElementById в скобках открыть кавычки и написать имя идентификатора main-action-button. elementld - не небирать
document.getElementById("main-action-button").onclick = function () {
    document.getElementById("products").scrollIntoView({behavior: "smooth"}) // agr не небирать
}

// ДЕЙСТВИЯ ПО ССЫЛКАМ
// создение переменной links и размещение в неё всех ссылок, которые нажимаются
// querySelectorAll - поиск всех елементов (ссылок) по определенному селектору menu-item (строки html 18 - 24) далее элементы попадают в ячейку памяти links
// далее на каждую ячейку вешается обработчик события и по клику не неё выполнять действия
// так как ссылок несколько используется цикл для прохода по каждой из имеющихся ссылок
// условия выполнения цикла: действие повторяется - итератор i от 0 до количества всех ссылок, при каждом повторе цикла итератор i увеличивается на 1 (i++)
// для каждой ссылки вешается обработчик события для перевода (скроллинга - scrollIntoView) пользователя на нужный блок
// links[i] - обращение к ссылке, фукнция выполняется при каждом нажатии на ссылку которая указана в data-link

let links = document.querySelectorAll(".menu-item > a");
for (let i=0; i<links.length; i++){
    links[i].onclick = function (){
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior: "smooth"})
    }
}

// ДЕЙСТВИЯ ПО КНОПКАМ
// поиск все кнопок по имени класса product-button, присвоение к каждой кнопке обработчик события
// для кнопки "заказать" (12шт) вешается обработчик события для перевода (скроллинга - scrollIntoView) на id = "order"
let buttons = document.getElementsByClassName("product-button")
for (let i=0; i<buttons.length; i++){
    buttons[i].onclick = function (){
        document.getElementById("order").scrollIntoView({behavior: "smooth"})
    }
}

// ДЕЙСТВИЯ ПО ОФОРМЛЕНИЮ ЗАКАЗА
// Поиск всех инпутов и сохренение их в переиненные burger name phone
// Создение функции для выполнение действие при клике по кнопке
// При клике по кнопке прохлдим по каждому элементу и проверяем есть ли там значение
// 1й условный блок
// Если поле постое меняется фон на красный и сообщение "Заполните все поля заказа!"
// Если ошибки нет то возвращаем фон который был изначально

// 2й условный блок
// Если ошибок нет каждый элемент массива очищается и вовыдится сообщение  "Спасибо за заказ! Мы скоро свяжемся с Вами!"

let burger = document.getElementById("burger");
let name = document.getElementById("name");
let phone = document.getElementById("phone");
document.getElementById("order-action").onclick=function (){
    let hasError = false;

    [burger, name, phone].forEach(item=>{
       if(!item.value){
           item.parentElement.style.background="red";
           alert("Заполните все поля заказа!")
           // Нужно добавить валидацию заполненных данных
           hasError=true;
       } else{
           item.parentElement.style.background = "";
       }
    });
    if (!hasError){
        [burger, name, phone].forEach(item=>{
        item.value="";
        });
        alert("Спасибо за заказ! Мы скоро свяжемся с Вами!")
    }
}


// КУРСОВОЙ ФУНКЦИОНАЛ

let prices = document.getElementsByClassName("products-item-price");

// Смена валюты
document.getElementById("change-currency").onclick = function (e) {
    let currentCurrency = e.target.innerText;

    let newCurrency = "$"
    let coefficient = "1"

    if (currentCurrency === "$") {
        newCurrency = "₽";
        coefficient = 80;
    }

    else if (currentCurrency === "₽") {
        newCurrency = "BYN";
        coefficient = 3;
    }
    else if (currentCurrency === "BYN") {
        newCurrency = "¥";
        coefficient = 7.14;
    }
    else if (currentCurrency === "¥") {
        newCurrency = "€";
        coefficient = 0.9;
    }
// Пересчет цены в текущей валюте
// Проход циклом по каждому блоку для отобрежения цены в текущей валюте
// + перед (prices ... - преобразование в число
// getAttribute("data-base-price") - получение цены из атрибута "data-base-price" в базовой валюте ($)
// * coefficient - пересчет цены bp базовой валюты ($) в текущую валюту
// toFixed(1) - округление цены до одного знака после запятой


    e.target.innerText = newCurrency;
    for (let i=0; i < prices.length; i++){
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
    }
}