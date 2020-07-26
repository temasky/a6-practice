const numDivs = 36;
const maxHits = 11;

let hits = 1;
let firstHitTime;
let missClicks;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");
  $(".game-field").text("");

  let divSelector = randomDivId();

  $(divSelector).addClass("target");
  $(divSelector).text(hits);
  // TODO: помечать target текущим номером
  if (hits === 2) {
    firstHitTime = getTimestamp();
  }
  // FIXME: тут надо определять при первом клике firstHitTime;



  if (hits === maxHits) {
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");
  $(".game-field").text("");
  endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#miss-clicks").text(missClicks);
  $("#win-message").removeClass("d-none");
  $('.game-field').hide();
  $('#button-start').hide();
  $('#button-reload').show();
}

function handleClick(event) {

  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;

    round();
  }
  else {
    $(event.target).addClass("miss");
    missClicks++;
  }

// TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
    
  }
  
function start() {
  missClicks=0;
  round();
}

function init() {
  $('#button-reload').hide();
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(start);

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });


}

$(document).ready(init);
