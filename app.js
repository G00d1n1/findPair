let arr = []
let arrNew = []
let empty = ''
let checkDouble = ''
let field = document.querySelector('.field')

          // генерирую элементы в массив
for (let i = 0; i < 5; i++){
  empty = `
  <div class = "card" data-num='${i}'>
  <img class = 'cardImg' src='img/${i}.png'>
  <div class = 'back'></div>
  </div>`
  arr.push(empty)
  arr.push(empty)
}
          // копирую элементы в новый массив в случайном порядке и очищаю старый массив
while(arr.length){
  let getRandomCoord = Math.floor(Math.random() * arr.length)
  arrNew.push(arr[getRandomCoord])
  arr.splice(getRandomCoord, 1)
}
          // добавляю элементы на поле
for(let i = 0; i < arrNew.length; i++){
  field.innerHTML += arrNew[i]
}

          // обработчик для каждой карточки
let timer = document.querySelector('.timer')
let timerInput = +timer.innerText
let count = 0
let counter = 0
let total = document.querySelector('.total');
let cards = document.querySelectorAll('.card')
let totalResult = document.querySelector('.totalResult')

          // таймер игры
let btnStart = document.querySelector('.btnStart')
let timerId;
btnStart.addEventListener('click',function(){
  field.style.display = 'flex'
  timerId = setInterval(function(){
    count = timerInput += 1
    timer.innerHTML = count
  }, 1000);
  btnStart.style.display = 'none'
  timer.style.display = 'block'
})

cards.forEach(element => {
  element.addEventListener('click',function(){
          // логика игры
    let currentElement = this
    let i = currentElement.querySelector('img')
    let v = currentElement.querySelector('div')
    open()

    setTimeout(() => {
      if(checkDouble === ''){
        checkDouble = currentElement
      }
      else if (+currentElement.dataset.num === +checkDouble.dataset.num){
        checkDouble.style.opacity = '0'
        currentElement.style.opacity = '0'
        checkDouble = ''
        counter++
        if(counter == cards.length / 2){
          total.style.display = 'block'
          totalResult.innerHTML = timerInput
          timer.style.display = 'none'
          timerId.removeEventListener('click')
        }
      }
      else {
        close()
      }
    }, 1000);
    function open(){
      i.style.opacity = '1'  
      v.style.opacity = '0'
    }
    function close(){
      let img = checkDouble.querySelector('.cardImg')
      let back = checkDouble.querySelector('.back')
      img.style.opacity = '0'
      back.style.opacity = '1'
      i.style.opacity = '0'
      v.style.opacity = '1'
      checkDouble = ''
    }
  })
});
