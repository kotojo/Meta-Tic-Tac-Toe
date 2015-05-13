$(document).ready(function() {

  'use strict';

  var turn = 'O'; //initalizes turn

  var playerTurn = function () {
    $('#playerTurn').text(turn + '\'s turn');
  };

  playerTurn();

   $('div > div.innerbox').click(function(){                //click function to play
      var that = $(this);
      if ($(this).parents('.outerbox').hasClass('active')){
        if(that.text() === 'X' || that.text() === 'O'){

          that.addClass('animated shake'); //shakes if already full
          setTimeout(function() {
            that.removeClass('animated shake');
          }, 500);
        }
        else {
          that.text(turn);
        }

        getInsideWinner(that);
        getOutsideWinner();

        that.parents('.outerbox').removeClass('active');
      }
      else if ($('.outerbox').hasClass('active')) {
        return;
      }
      else {
        that.parents('.outerbox').addClass('active');
        if (turn === 'X') { //changes player
          turn = 'O';
        }
        else {
          turn = 'X';
        }
        playerTurn();
        console.log(that);
      }
  });

   var xWon = function(z) {
    z.parents('.outerbox').children().children('#box1, #box3, #box5, #box7, #box9').css('background-color', 'black');
    z.parents('.outerbox').addClass('x');
   };

   var oWon = function (w) {
     w.parents('.outerbox').children().children('#box1, #box2, #box3, #box4, #box6, #box7, #box8, #box9').css('background-color', 'black');
     w.parents('.outerbox').addClass('o');
   };

   var getOutsideWinner = function () { //when someone wins inside game it adds class x or o, this checks those for full winner.
    var y = 'x';
    for (var i=0; i<2; i++) {
      if ($('#outerone').hasClass(y) && $('#outertwo').hasClass(y) && $('#outerthree').hasClass(y)) {
        console.log(y + 'is winner!');
      }
      else if ($('#outerfour').hasClass(y) && $('#outerfive').hasClass(y) && $('#outersix').hasClass(y)) {
        console.log(y + 'is winner!');
      }
      else if ($('#outerseven').hasClass(y) && $('#outereight').hasClass(y) && $('#outernine').hasClass(y)) {
        console.log(y + 'is winner!');
      }
      else if ($('#outerone').hasClass(y) && $('#outerfour').hasClass(y) && $('#outerseven').hasClass(y)) {
        console.log(y + 'is winner!');
      }
      else if ($('#outertwo').hasClass(y) && $('#outerfive').hasClass(y) && $('#outereight').hasClass(y)) {
        console.log(y + 'is winner!');
      }
      else if ($('#outerthree').hasClass(y) && $('#outersix').hasClass(y) && $('#outernine').hasClass(y)) {
        console.log(y + 'is winner!');
      }
      else if ($('#outerone').hasClass(y) && $('#outerfive').hasClass(y) && $('#outernine').hasClass(y)) {
        console.log(y + 'is winner!');
      }
      else if ($('#outerthree').hasClass(y) && $('#outerfive').hasClass(y) && $('#outerseven').hasClass(y)) {
        console.log(y + 'is winner!');
      }
      else{
        return;
      }
      y = 'o';
    }
   };

   var getInsideWinner = function (x) {
    var box = function (y) {
      return x.parents('.outerbox').children().children(y); //Goes out to tictactoe board you're playing in and passes in value
    };

    if (box('#box1').text() === box('#box2').text() && box('#box1').text() === box('#box3').text() && box('#box1').text() !== ''){
      if (box('#box1').text() === 'X') {
        xWon(x);
      }
      else {
        oWon(x);
      }
    }

    else if (box('#box4').text() === box('#box5').text() && box('#box4').text() === box('#box6').text() && box('#box4').text() !== ''){
      if (box('#box4').text() === 'X') {
       xWon(x);
      }
      else {
        oWon(x);
      }
    }

    else if (box('#box7').text() === box('#box8').text() && box('#box7').text() === box('#box9').text() && box('#box7').text() !== ''){
      if (box('#box7').text() === 'X') {
        xWon(x);
      }
      else {
        oWon(x);
      }
    }

    else if (box('#box1').text() === box('#box4').text() && box('#box1').text() === box('#box7').text() && box('#box1').text() !== ''){
      if (box('#box1').text() === 'X') {
        xWon(x);
      }
      else {
        oWon(x);
      }
    }

    else if (box('#box2').text() === box('#box5').text() && box('#box2').text() === box('#box8').text() && box('#box2').text() !== ''){
      if (box('#box2').text() === 'X') {
        xWon(x);
      }
      else {
        oWon(x);
      }
    }

    else if (box('#box3').text() === box('#box6').text() && box('#box3').text() === box('#box9').text() && box('#box3').text() !== ''){
      if (box('#box3').text() === 'X') {
        xWon(x);
      }
      else {
        oWon(x);
      }
    }

    else if (box('#box1').text() === box('#box5').text() && box('#box1').text() === box('#box9').text() && box('#box1').text() !== ''){
      if (box('#box1').text() === 'X') {
        xWon(x);
      }
      else {
        oWon(x);
      }
    }

    else if (box('#box3').text() === box('#box5').text() && box('#box3').text() === box('#box7').text() && box('#box3').text() !== ''){
      if (box('#box3').text() === 'X') {
        xWon(x);
      }
      else {
        oWon(x);
      }
    }

   };

});
