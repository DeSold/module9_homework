// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — 
//выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;

// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — 
//выводить ниже текст «Лимит вне диапазона от 1 до 10»;

// Если и первый, и второй input не в диапазонах или не являются числами — 
//выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;

// Если числа попадают в диапазон от 1 до 10 — 
//сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, 
//где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 

function btn(){
    var inp1 = document.querySelector(".input1").value;
    var inp2 = document.querySelector(".input2").value;
    var result = document.querySelector(".result");
    if((inp1 < 1 || inp1 > 10) && inp2 >= 1 && inp2 <= 10){
        result.innerHTML += "Номер страницы вне диапазона от 1 до 10";
    }else if((inp2 < 1 || inp2 > 10) && inp1 >= 1 && inp1 <= 10){
        result.innerHTML += "Лимит вне диапазона от 1 до 10";
    }else if((inp1 < 1 || inp1 > 10) && (inp2 < 1 || inp2 > 10)){
        result.innerHTML += "Номер страницы и лимит вне диапазона от 1 до 10";
    }else {
        fetch(` https://picsum.photos/v2/list?page=${inp1}&limit=${inp2}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('items', JSON.stringify(data))
                let cards = '';
                data.forEach(item => {
                    const cardBlock = `
                    <div class="card">
                      <img
                        src="${item.download_url}"
                        class="card-image"
                      />
                    </div>
                    `;
                    cards = cards + cardBlock;
                });
                result.innerHTML = cards;
            })
            .catch(() => {
                console.log('error')
            });
        }
    }

    const state = localStorage.getItem('items')
    const myState = JSON.parse(state)

    window.onload = function () {
    if(state) {
        let cards = '';
        myState.forEach(item => {
            const cardBlock = `
            <div class="card">
              <img
                src="${item.download_url}"
                class="card-image"
              >
            </div>
            `;
            cards = cards + cardBlock;
        });
        result.innerHTML = cards;
    }      
}