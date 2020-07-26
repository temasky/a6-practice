const numDivs = 36;
const maxHits = 11;

let hits = 1;
let firstHitTime;
let missClicks;

function round() {
 

  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");
  $(".game-field").text("");

  let divSelector = randomDivId();

  $(divSelector).addClass("target");
  $(divSelector).text(hits);

  if (hits === 2) {
    firstHitTime = getTimestamp();
  }


  if (hits === maxHits) {

  endGame();
  }
}

function endGame() {
  // при вызове функции конца игры всё поле отчищается
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");
  $(".game-field").text("");
  $('.game-field').hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  // общее количество некоректных попаданий будет отражено
  // внутри span miss-clicks
  $("#miss-clicks").text(missClicks);
  $("#win-message").removeClass("d-none");
// В конце игры прячется кнопка пуск 
// и показывается кнопка начать заново
  $('#button-start').hide();
  $('#button-reload').removeClass("d-none");
}

function handleClick(event) {

 
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;

    round();
  }
  else {
    // Работа с неправильным попаданием. в случае ошибки - удаляется
    // предыдущее неправильное поле и подсвечивается новое
    $(".game-field").removeClass("miss");
    $(event.target).addClass("miss");
    missClicks++;
  }

    
  }
// функция запуска игры по кнопке. Необходима для 
// обнуления неправильно нажатых полей перед началом
// игры
function startGame() {
  missClicks=0;
  round();
}

function init() {
  // Игра начинается только после кнопки запуск,
  // но время начинает считаться после первого выбраного
  // значения
  $("#button-start").removeClass("d-none");
 
  $("#button-start").click(startGame);

  $(".game-field").click(handleClick);

  $("#button-reload").click(function() {
    location.reload();
  });


}

$(document).ready(init);
