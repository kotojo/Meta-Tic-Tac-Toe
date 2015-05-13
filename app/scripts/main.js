$(document).ready(function() {

  'use strict';

  var turn = 'X';

   $('div > div.innerbox').click(function(){
    if($(this).text() === 'X' || $(this).text() === 'O'){
      $(this).addClass('animated shake');
      var that = $(this);
      setTimeout(function() {
        that.removeClass('animated shake');
      }, 500);
    }
    else {
      $(this).text(turn);
    }

    getInsideWinner($(this));

    if (turn === 'X') {
      turn = 'O';
    }
    else {
      turn = 'X';
    }
  });

   var getInsideWinner = function (x) {
    var box = function (y) {
      return x.parents('.outerbox').children().children(y);
    };

    if (box('#box1').text() === box('#box2').text() && box('#box1').text() === box('#box3').text() && box('#box1').text() !== ''){
      x.parents('.outerbox').children().children('#box1, #box3, #box5, #box7, #box9').css('background-color', 'black');
    }

   };

});
