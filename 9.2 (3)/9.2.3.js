//Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
//При клике на кнопку происходит следующее:
//Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
//Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL 
//https:picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
//После получения данных вывести ниже картинки на экран.

function btn(){
  var res = document.querySelector(".result");
  var a = document.querySelector("input").value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://picsum.photos/v2/list/?limit=${a}`, true);
  xhr.onload = function(){
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    }else {
      const result = JSON.parse(xhr.response);
      let cards = "";
      result.forEach(item => {
        const cardBlock = `
          <div class="card">
            <img src="${item.download_url}"/>
          </div>
        `;
        cards = cards + cardBlock;
      });
      if(a > 10 || a < 0){
        res.innerText = "Число вне диапазона от 1 до 10";
      }else {
        res.innerHTML = cards;
      }
    }
  }
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  }
  xhr.send();
}

