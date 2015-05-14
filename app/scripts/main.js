$(document).ready(function() {

  'use strict';

  var turn = 'X'; //initalizes turn
  var gameClone;
  var copy = function() {
    gameClone = $('.game').clone();
  };

  copy(); //makes a duplicate of the game to restart with

  $('#restart').hide();

  var playerTurn = function () {
    $('#playerTurn').text(turn + '\'s turn');
  };

  var compActive = function() {
    var square = Math.floor((Math.random() * 9) + 1);
    var choice = '#outer'+square.toString();
    if ($(choice).hasClass('x') || $(choice).hasClass('o')) {
      compActive();
    }
    else {
      $(choice).addClass('active');
    }
  };

  compActive();

  playerTurn();

    $('#restart').click(function() {
      $('.game').replaceWith(gameClone);
      compActive();
      $('#restart').hide();
    });

    $('div').on('click', 'div.innerbox', function(event){                //click function to play
      event.stopPropagation();
      var that = $(this);
      if ($(this).parents('.outerbox').hasClass('active')){ //if clickedsquare is active do this
        if(that.text() === 'X' || that.text() === 'O'){

          that.addClass('animated shake'); //shakes if already full
          setTimeout(function() {
            that.removeClass('animated shake');
          }, 500);
          return;
        }
        else {
          that.text(turn);
        }

        getInsideWinner(that); //checks winner for both inside and outside
        getOutsideWinner();

        that.parents('.outerbox').removeClass('active');

        if ($('input[type="checkbox"]').is(':checked')) {
          compActive();
          if (turn === 'X') { //changes player if computer is changing active
            turn = 'O';
          }
          else {
            turn = 'X';
          }
        }
      }
      else if ($('.outerbox').hasClass('active')) { //checks if click on square that isn't active, but one of the others is.
        return;
      }

      else {                                                  //add class click, also has logic to have comp choose if checkbox is checked
        if ($('input[type="checkbox"]').is(':not(:checked)')) {
          if (that.parents('.outerbox').hasClass('x') || that.parents('.outerbox').hasClass('o')) {

            that.parents('.outerbox').addClass('animated shake'); //shakes if already won
            setTimeout(function() {
              that.parents('.outerbox').removeClass('animated shake');
            }, 500);
            return;
          }
          else {
            that.parents('.outerbox').addClass('active');
          }
        }
        else {
          compActive();
        }
        if (turn === 'X') { //changes player if they are choosing active square
        turn = 'O';
        }
        else {
          turn = 'X';
        }
      }
      playerTurn();  //updates who's turn it is
    });

   var xWon = function(z) {
    z.parents('.outerbox').children().children('#box1, #box3, #box5, #box7, #box9').css('background-color', 'black');
    z.parents('.outerbox').addClass('x');
   };

   var oWon = function (w) {
     w.parents('.outerbox').children().children('#box1, #box2, #box3, #box4, #box6, #box7, #box8, #box9').css('background-color', 'black');
     w.parents('.outerbox').addClass('o');
   };

   var outerWin = function (winner) {
    $('#outer5').parent().siblings().toggle('explode', {pieces: 128}, 2000);
    $('#outer5').parent().html(winner.toUpperCase() + ' is winner!');
    $('#restart').show();
   };

   var getOutsideWinner = function () { //when someone wins inside game it adds class x or o, this checks those for full winner.
    var y = 'x';
    for (var i=0; i<2; i++) {
      if ($('#outer1').hasClass(y) && $('#outer2').hasClass(y) && $('#outer3').hasClass(y)) {
        outerWin(y);
      }
      else if ($('#outer4').hasClass(y) && $('#outer5').hasClass(y) && $('#outer6').hasClass(y)) {
        outerWin(y);
      }
      else if ($('#outer7').hasClass(y) && $('#outer8').hasClass(y) && $('#outer9').hasClass(y)) {
        outerWin(y);
      }
      else if ($('#outer1').hasClass(y) && $('#outer4').hasClass(y) && $('#outer7').hasClass(y)) {
        outerWin(y);
      }
      else if ($('#outer2').hasClass(y) && $('#outer5').hasClass(y) && $('#outer8').hasClass(y)) {
        outerWin(y);
      }
      else if ($('#outer3').hasClass(y) && $('#outer6').hasClass(y) && $('#outer9').hasClass(y)) {
        outerWin(y);
      }
      else if ($('#outer1').hasClass(y) && $('#outer5').hasClass(y) && $('#outer9').hasClass(y)) {
        outerWin(y);
      }
      else if ($('#outer3').hasClass(y) && $('#outer5').hasClass(y) && $('#outer7').hasClass(y)) {
        outerWin(y);
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
