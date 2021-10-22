//Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. 
//В input можно ввести любое число. При клике на кнопку происходит следующее:
//Если оба числа не попадают в диапазон от 100 до 300 или введено 
//не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
//Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch 
//по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.


function btn(){
    var inp1 = document.querySelector(".input1").value;
    var inp2 = document.querySelector(".input2").value;
    var result = document.querySelector(".result");
    if(inp1 < 100 || inp1 > 300 || inp2 < 100 || inp2 > 300){
        var notNumber = document.createElement("div");
        notNumber.innerText = "одно из чисел вне диапазона от 100 до 300";
        document.body.appendChild(notNumber);
    }else {
      fetch(`https://picsum.photos/${inp1}/${inp2}`)
      .then((response) => {result.innerHTML = 
        `
        <div class="cart">
            <img src="${response.url}">
        </div>
        `})
        .catch(() => console.log("error"))
    }
      
}