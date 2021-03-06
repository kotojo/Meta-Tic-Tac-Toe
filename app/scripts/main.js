$(document).ready(function() {

  'use strict';

  var turn = 'X'; //initalizes turn
  var xWins = 0;  //winner counters
  var oWins = 0;
  var winArr = [[null, null, null, null, null, null, null, null, null], //reference array for getWinner functions
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null]];

  $('#restart').hide();

  var clearArr = function(x) { //resets array for new game
    for (var i = 0; i < 9; i++) {
      x[i] = [null, null, null, null, null, null, null, null, null];
    }
  };

  var playerTurn = function () { //switches the text onscreen for player turn
    $('#playerTurn').text(turn + '\'s turn');
  };

  var compActive = function() {  //randomly chooses active square
    var square = Math.floor((Math.random() * 9) + 1);
    var choice = '#outer'+square.toString();
    if ($(choice).hasClass('x') || $(choice).hasClass('o')) {
      compActive();
    }
    else {
      $(choice).addClass('active');
    }
  };

  compActive(); //sets active square for starting game

  playerTurn(); //initializes turn screen

    $('#check').click(function() { //if player turns on random square assignment it takes their turn away
      if (turn === 'X') {
        turn = 'O';
      }
      else {
        turn = 'X';
      }
      playerTurn();
    });

    $('#restart').click(function() { //on restart it clears all html and css changes and resets the array
      $('.bs-example-modal-sm').modal('hide');
      clearArr(winArr);
      compActive();
      $('#restart').hide();
    });

    $('div').on('click', 'div.innerbox', function(event){                //click function to play
      event.stopPropagation();
      var that = $(this);
      var innerThat = (that.attr('id').substr(that.attr('id').length - 1));
      var outerThat = (that.parents('.outerbox').attr('id').substr(that.parents('.outerbox').attr('id').length -1));

      if ($(this).parents('.outerbox').hasClass('active')){ //if clickedsquare is active do this
        if(that.text() === 'X' || that.text() === 'O'){

          that.addClass('animated shake'); //shakes if already full
          setTimeout(function() {
            that.removeClass('animated shake');
          }, 500);
          return;
        }
        else {  //assigns square to player and adds value to array
          winArr[outerThat - 1][innerThat -1] = turn;
          that.text(turn);
        }

        newInsideWinner(that); //checks winner for both inside and outside
        newOutsideWinner();

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

   var winCount = function (winner) {
    if (winner === 'X') {
      xWins += 1;
      $('#xWin').text('X: ' + xWins);
    }
    else if (winner === 'O') {
      oWins += 1;
      $('#oWin').text('O: ' + oWins);
    }
   };

   var outerWin = function (winner) { // when someone wins it explodes screen, resets the html and css, shows winner, and increments score
    $('.game').toggle('explode', {pieces: 128}, 1000);
    $('.bs-example-modal-sm').modal('show');
    $('.modal-content p').text(winner + ' wins!');
    winCount(winner);
    $('.game').children().children().children().children().text('');
    $('.game').children().children().children().children().css('background-color', '');
    $('.game').children().children().removeClass('x o');
    setTimeout(function() {
              $('.game').toggle('explode');
            }, 2000);
    $('#restart').show();
   };

   var newOutsideWinner = function () { //checks for meta game winner
    for (var i=0; i<7; i+=3){
      if (winArr[i] === winArr[1+i] && winArr[i] === winArr[2+i]) {
        outerWin(turn);
      }
    }
    for (i=0; i<3; i++) {
      if (winArr[i] === winArr[3+i] && winArr[i] === winArr[6+i]) {
        outerWin(turn);
      }
    }
    if (winArr[0] === winArr[4] && winArr[0] === winArr[8]) {
      outerWin(turn);
    }
    if (winArr[2] === winArr[4] && winArr[2] === winArr[6]) {
      outerWin(turn);
    }
   };

   var newInsideWinner = function(x) { //checks for individual game winner
    for (var j=0; j<9; j++) {
      for (var i=0; i<7; i+=3) {
        if (winArr[j][i] === winArr[j][1+i] && winArr[j][0+i] === winArr[j][2+i]) {
          if (winArr[j][i] === 'X') {
            xWon(x);
            winArr[j] = turn; }

          else if (winArr[j][i] === 'O'){
            oWon(x);
            winArr[j] = turn; }

        }
      }
      for (i=0; i<3; i++) {
        if (winArr[j][i] === winArr[j][3+i] && winArr[j][i] === winArr[j][6+i]) {
          if (winArr[j][i] === 'X') {
            xWon(x);
            winArr[j] = turn; }

          else if (winArr[j][i] === 'O'){
            oWon(x);
            winArr[j] = turn; }
        }
      }
      if (winArr[j][0] === winArr[j][4] && winArr[j][0] === winArr[j][8]) {
        if (winArr[j][0] === 'X') {
            xWon(x);
            winArr[j] = turn; }

        else if (winArr[j][0] === 'O'){
          oWon(x);
          winArr[j] = turn; }
      }
      if (winArr[j][2] === winArr[j][4] && winArr[j][2] === winArr[j][6]) {
        if (winArr[j][2] === 'X') {
            xWon(x);
            winArr[j] = turn; }

        else if (winArr[j][2] === 'O'){
          oWon(x);
          winArr[j] = turn; }
      }
    }
   };

});
