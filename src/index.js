var React = require('react')
var ReactDOM = require('react-dom')

var Arrow = React.createClass ({

    render: function() {

        return <img src="../static/images/arrow.gif" className={this.props.side+"_pointer "+this.props.visible} />


    }
});

var Card = React.createClass ({
  getInitialState: function() {
     return {
         side:this.props.side,
         visible:this.props.visible
     };
   },

   onMouseDownHandler: function() {

        game1.player.select_hand(this.props.side);

   },


    render: function () {
        return <img onMouseDown={this.onMouseDownHandler} src={"../static/images/cards/"+this.props.cardNumber+".png"} className={this.props.side+"_card"+this.props.handPosition+" "+this.props.visible} />

    }
});


var Hand_Score = React.createClass ({

    render: function() {
      return <span className="neongreen smallertext">{this.props.score}</span>

  }
});

var Hand_Bet = React.createClass ({

    render: function() {
      return <span className="neongreen smallertext">{this.props.bet}</span>

  }
});

var Chip_Hand = React.createClass ({


 onMouseDownHandler: function() {

      game1.player.remove_chip();

 },



    render: function() {
      var hide = ''
      if (this.props.visible=='hidden') {
        hide = this.props.side+"_chip"+this.props.position+" hidden"
      }else {
        hide = this.props.side+"_chip"+this.props.position
      }
      return <img onMouseDown={this.onMouseDownHandler} src={"../static/images/chips/chip"+this.props.chipNumber+".png"} className={hide} />

  }
});

var Chip_Bet = React.createClass ({
  getInitialState: function() {
     return {
         down: false
     };
 },

 onMouseDownHandler: function() {
     this.setState({
         down: true

     });
      game1.player.bet_chip(this.props.chipNumber);

 },
 onMouseUpHandler: function() {
     this.setState({
         down: false
     });

 },
    render: function() {
      var downpic = "chip"+this.props.chipNumber+".png"
    if (this.state.down){
        downpic= "chip"+this.props.chipNumber+"down.png"
      }

      return <img onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} src={"../static/images/chips/"+downpic} className={"chip"+this.props.chipNumber} />
    }
});



var Busted = React.createClass ({

    render: function() {
      return <span className={"neonred "+this.props.visible}>BUSTED</span>
  }
});

var Held = React.createClass ({

    render: function() {
      return <span className={"neongreen "+this.props.visible}>HELD</span>
  }
});

var Hit_Button = React.createClass ({
  getInitialState: function() {
     return {
         hover: false,
         down: false
     };
 },

 onMouseDownHandler: function() {
     this.setState({
         down: true
     });
    game1.player.hit_card();


 },
 onMouseUpHandler: function() {
     this.setState({
         down: false
     });

 },
    render: function() {
      var hoverpic = "hitbutton.png"
      if (this.state.hover){
        hoverpic="hitbuttonover.png"
      }else if (this.state.down){
        hoverpic="hitbuttondown.png"
      }
      return <img onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} className={"hit_button"} src={"../static/images/buttons/"+hoverpic} />
  }
});

var Stand_Button = React.createClass ({
  getInitialState: function() {
     return {
         hover: false,
         down: false
     };
 },

 onMouseDownHandler: function() {
     this.setState({
         down: true
     });
       game1.player.hold_hand();


 },
 onMouseUpHandler: function() {
     this.setState({
         down: false
     });

 },
    render: function() {
      var hoverpic = "standbutton.png"
      if (this.state.hover){
        hoverpic="standbuttonover.png"
      }else if (this.state.down){
        hoverpic="standbuttondown.png"
      }
      return <img onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} className="stand_button" src={"../static/images/buttons/"+hoverpic} />
  }
});

var Bank = React.createClass ({

    render: function() {
      return <p className="neongreen smallertext">{this.props.bank}</p>


  }
});

var Bet_Total = React.createClass ({

    render: function() {
      return 	<p className="neongreen smallertext">{this.props.total_bet}</p>

  }
});

var Win = React.createClass ({

    render: function() {
      return <p className="neongreen smallertext">{this.props.win_amount}</p>

  }
});


var Blank = React.createClass ({

    render: function() {
      return 	<div></div>

  }
});


function inject_objects() {
/*var left_cards =  ReactDOM.render(React.createElement (Left_Cards),  document.getElementById('left'))
var mid_cards =  ReactDOM.render(React.createElement (Mid_Cards),  document.getElementById('mid'))
var right_cards =  ReactDOM.render(React.createElement (Right_Cards),  document.getElementById('right'))
*/


var total_bank = ReactDOM.render(React.createElement (Bank,{bank:''}),  document.getElementById('total_bank'))
var total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$5'}),  document.getElementById('total_bet'))
var total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$0'}),  document.getElementById('total_win'))

var stand_button= ReactDOM.render(React.createElement (Stand_Button),  document.getElementById('stand_button'))
var hit_button= ReactDOM.render(React.createElement (Hit_Button),  document.getElementById('hit_button'))

var left_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'left'}),  document.getElementById('left_top'))
var mid_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'show',side:'mid'}),  document.getElementById('mid_top'))
var right_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'right'}),  document.getElementById('right_top'))

/*var left_bust = ReactDOM.render(React.createElement (Busted,{visible:'hidden'}),  document.getElementById('left_bust'))
var mid_bust = ReactDOM.render(React.createElement (Busted,{visible:'hidden'}),  document.getElementById('mid_bust'))
var right_bust = ReactDOM.render(React.createElement (Busted,{visible:'hidden'}),  document.getElementById('right_bust'))

var left_held = ReactDOM.render(React.createElement (Held,{visible:'hidden'}),  document.getElementById('left_held'))
var mid_held = ReactDOM.render(React.createElement (Held,{visible:'hidden'}),  document.getElementById('mid_held'))
var right_held = ReactDOM.render(React.createElement (Held,{visible:'hidden'}),  document.getElementById('right_held'))
*/

var dealer_score = ReactDOM.render(React.createElement (Hand_Score,{score:'??'}),  document.getElementById('dealer_score'))


var left_score = ReactDOM.render(React.createElement (Hand_Score,{score:''}),  document.getElementById('left_score'))
var mid_score = ReactDOM.render(React.createElement (Hand_Score,{score:''}),  document.getElementById('mid_score'))
var right_score = ReactDOM.render(React.createElement (Hand_Score,{score:''}),  document.getElementById('right_score'))


var left_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:''}),  document.getElementById('left_bet'))
var mid_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:''}),  document.getElementById('mid_bet'))
var right_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:''}),  document.getElementById('right_bet'))

/*
var left_chip1 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'left',position:'1'}),  document.getElementById('left_chip1'))
var left_chip2 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'left',position:'2'}),  document.getElementById('left_chip2'))
var left_chip3 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'left',position:'3'}),  document.getElementById('left_chip3'))
var left_chip4 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'left',position:'4'}),  document.getElementById('left_chip4'))
var left_chip5 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'left',position:'5'}),  document.getElementById('left_chip5'))
var left_chip6 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'left',position:'6'}),  document.getElementById('left_chip6'))
var left_chip7 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'left',position:'7'}),  document.getElementById('left_chip7'))
var left_chip8 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'left',position:'8'}),  document.getElementById('left_chip8'))

var mid_chip1 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'show', chipNumber:'5',side:'mid',position:'1'}),  document.getElementById('mid_chip1'))

var mid_chip2 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'mid',position:'2'}),  document.getElementById('mid_chip2'))
var mid_chip3 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'mid',position:'3'}),  document.getElementById('mid_chip3'))
var mid_chip4 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'mid',position:'4'}),  document.getElementById('mid_chip4'))
var mid_chip5 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'mid',position:'5'}),  document.getElementById('mid_chip5'))
var mid_chip6 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'mid',position:'6'}),  document.getElementById('mid_chip6'))
var mid_chip7 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'mid',position:'7'}),  document.getElementById('mid_chip7'))
var mid_chip8 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'mid',position:'8'}),  document.getElementById('mid_chip8'))

var right_chip1 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'right',position:'1'}),  document.getElementById('right_chip1'))
var right_chip2 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'right',position:'2'}),  document.getElementById('right_chip2'))
var right_chip3 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'right',position:'3'}),  document.getElementById('right_chip3'))
var right_chip4 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'right',position:'4'}),  document.getElementById('right_chip4'))
var right_chip5 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'right',position:'5'}),  document.getElementById('right_chip5'))
var right_chip6 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'right',position:'6'}),  document.getElementById('right_chip6'))
var right_chip7 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'right',position:'7'}),  document.getElementById('right_chip7'))
var right_chip8 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'100',side:'right',position:'8'}),  document.getElementById('right_chip8'))
*/
var bet_chip1 = ReactDOM.render(React.createElement (Chip_Bet,{chipNumber:'1'}),  document.getElementById('bet_chip1'))
var bet_chip5 = ReactDOM.render(React.createElement (Chip_Bet,{chipNumber:'5'}),  document.getElementById('bet_chip5'))
var bet_chip10 = ReactDOM.render(React.createElement (Chip_Bet,{chipNumber:'10'}),  document.getElementById('bet_chip10'))
var bet_chip25 = ReactDOM.render(React.createElement (Chip_Bet,{chipNumber:'25'}),  document.getElementById('bet_chip25'))
var bet_chip50 = ReactDOM.render(React.createElement (Chip_Bet,{chipNumber:'50'}),  document.getElementById('bet_chip50'))
var bet_chip100 = ReactDOM.render(React.createElement (Chip_Bet,{chipNumber:'100'}),  document.getElementById('bet_chip100'))
};




function Game () {
	this.player = new Player("Andrew",2000);
  this.dealer = new Player("Dealer",0);
  this.blackjack = false;
	this.deck = new Deck();

  this.first_turn = true;




	this.updateScoreBoards = function(score,hand) {


	};
  /*Called once at first draw and then when hold button is placed on all hands */
  this.check_winner = function() {
    console.log("first turn");
    if(this.first_turn == true) {

        if (this.player.hands[0].check_blackjack()==true) {
            this.player.hands[0].win = 'blackjack';
            this.blackjack = true;

        } if(this.dealer.hands[0].check_blackjack()==true) {
          console.log("dealerbj");
            this.player.hands[0].win = 'bust';
            this.blackjack = true;

        }if(this.player.hands[0].check_blackjack()==true && this.dealer.hands[0].check_blackjack()==true) {
          console.log("tie");
            this.player.hands[0].win="draw";
            this.blackjack = true;
        }
        this.first_turn = false;
    }else {
          for (var x=0;x<this.player.hands.length;x++) {
              if (this.player.hands[x].hand_value > 21 && this.player.hands[x].cards.length>1) {

                  for(var y=0; y < this.player.hands[x].cards;y++ ) {
                      if (this.player.hands[x].cards[y].cardValue == 11) {

                          this.player.hands[x].cards[y].cardValue = 1;
                          this.player.hands[x].hand_value -= 10;
                          console.log("hand_score"+this.player.hands[x].hand_value);
                      }
                  }

              var score = ReactDOM.render(React.createElement (Hand_Score,{score:this.player.hands[x].hand_value}),  document.getElementById(this.player.hands[x].hand_side+'_score'))

              if (this.player.hands[x].hand_value > 21 && this.player.hands[x].cards.length>1) {
                  this.player.hands[x].win='bust';

              }

            }else if (this.player.hands[x].hand_value > this.dealer.hands[0].hand_value && this.player.hands[x].cards.length>1) {
                    if (this.player.hands[x].hand_value > 21) {
                        this.player.hands[x].win='bust';
                    }else {
                        this.player.hands[x].win='true';
                    }
            }else if (this.dealer.hands[0].hand_value > 21) {
                  if (this.player.hands[x].hand_value > 21) {
                      this.player.hands[x].win='bust';
                  }else if(this.player.hands[x].cards.length>1) {
                      this.player.hands[x].win='true';
                  }
              }else if (this.dealer.hands[0].hand_value == this.player.hands[x].hand_value) {
                      this.player.hands[x].win='draw';
              }else {
                  this.player.hands[x].win='bust'
              }
          }

    }
    this.calculate_win()

  };
  this.calculate_win = function () {
      if (this.blackjack) {
          console.log("blackjack=true");
          switch (this.player.hands[0].win) {
              case 'blackjack':
                  this.player.total_won += (this.player.hands[0].bet * 1.5);
                  this.player.bank += this.player.hands[0].bet*2;
                  var msg = "YOU AND GOT A BLACKJACK! YOU WON $"+this.player.total_won+"!";
                  console.log(msg);
                  var total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
                  var bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
                  this.reset_game();
                  break;

              case 'bust':
                  this.player.total_won = 0;
                  this.player.total_won -= (this.player.hands[0].bet);

                  var msg = "DEALER GOT A BLACKJACK. YOU LOSE $"+(this.player.total_won*-1)+"!";
                  console.log(msg);
                  var total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
                  this.reset_game();
                  break;

              case 'draw':
                  this.player.total_won = 0;
                  this.player.bank += this.player.hands[0].bet;
                  var msg = "YOU AND THE DEALER BOTH GOT A BLACKJACK. DRAW GAME!";
                  console.log(msg);
                  var total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
                  var bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
                  this.reset_game();
                  break;

          }
      }else {
          this.player.total_won = 0;
          console.log("else statement");
          for (var x = 0; x < this.player.hands.length; x++ ) {
              switch (this.player.hands[0].win) {
                  case 'true':
                      console.log("win is true");

                      this.player.total_won += (this.player.hands[x].bet);
                      this.player.bank += this.player.hands[x].bet*2;
                      break;
                  case 'bust':
                  console.log("bust!!");
                      this.player.total_won -= (this.player.hands[x].bet);
                      break;
                  case 'draw':
                      this.player.total_won = 0;
                      this.player.bank += this.player.hands[0].bet;
                      var msg = "YOU AND THE DEALER BOTH GOT " + this.player.hands[x].hand_value + ". DRAW GAME!";
                      console.log(msg);
                      break;

              }
          }
          if (this.player.total_won > 0) {
              var msg = "YOU WON $"+this.player.total_won+"!";
              console.log(msg);
              var total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
              var bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
              this.reset_game();
          }else {

              var msg = "YOU LOST $"+this.player.total_won*-1+"!";
              console.log(msg);
              var total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
              var bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
              this.reset_game();
          }
      }
  };






  this.reset_game = function() {
      this.player.total_won = 0
      this.player.playing = false;
      this.blackjack = false;
      this.first_turn = true;
      this.player.split_count = 0;
      this.player.total_bet = 0;
      this.player.select_hand('mid');

      for(var x=0;x<this.player.hands.length;x++) {

          for(var y=0;y<this.player.hands[x].cards.length;y++){

              var newcard = ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+"_card"+(y+1)));
              //ReactDOM.render(React.createElement (Card,{visible:'hidden',cardNumber:'53',side:this.player.hands[x].hand_side,handPosition:y+1}),  document.getElementById(this.player.hands[x].hand_side+"_card"+(y+1)))
          }
          for(var z=0; z < this.player.hands[x].chips.length; z++) {
              var newchip= ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+'_chip'+(z+1)));

            //var newchip = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'5',side:this.player.hands[x].hand_side,position:z+1}),  document.getElementById(this.player.hands[x].hand_side+'_chip'+(z+1)))
          }
          this.player.hands[x].cards.length=0;
          this.player.hands[x].held = false;
          this.player.hands[x].win=false;
          this.player.hands[x].hand_value = 0;
          this.player.hands[x].bet = 0;
          this.player.hands[x].chip_count = 1;
          this.player.hands[x].cards_shown = 1;
          this.player.hands[x].chips.length = 0;
      }
      for(var a=0; a < this.dealer.hands[0].cards.length; a++) {
        var newcard = ReactDOM.unmountComponentAtNode(document.getElementById("dealer_card"+(a+1)));

        //var newcard = ReactDOM.render(React.createElement (Card,{visible:'hidden',cardNumber:'53',side:'dealer',handPosition:a+1}),  document.getElementById("dealer_card"+(a+1)))

      }
      this.dealer.hands[0].cards.length = 0;
      this.dealer.hands[0].hand_value = 0;
      this.dealer.hands[0].cards_shown = 1;
      this.player.ante_up(100);
      var newcard = ReactDOM.unmountComponentAtNode(document.getElementById("dealer_card"+(a+1)));

      var left_bust = ReactDOM.unmountComponentAtNode(document.getElementById('left_bust'))
      var mid_bust = ReactDOM.unmountComponentAtNode(document.getElementById('mid_bust'))
      var right_bust = ReactDOM.unmountComponentAtNode(document.getElementById('right_bust'))

      var left_held = ReactDOM.unmountComponentAtNode(document.getElementById('left_held'))
      var mid_held = ReactDOM.unmountComponentAtNode(document.getElementById('mid_held'))
      var right_held = ReactDOM.unmountComponentAtNode(document.getElementById('right_held'))

      var dealer_score = ReactDOM.unmountComponentAtNode(document.getElementById('dealer_score'))

      var left_score = ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
      var mid_score = ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
      var right_score = ReactDOM.unmountComponentAtNode(document.getElementById('right_score'))
  };


};


function Player (name,bank) {
	this.name=name;
	this.hands = [];
  this.split_count = 0;
	this.total_won = 0;
	this.playing = false;
	this.bank = bank;
  this.total_bet = 0;
  this.hand_selected = 0; //0==mid  1==left  2==right

  this.ante_up = function(bet) {
      this.hands[0].chips.push(new Chip(bet));
      this.hands[0].bet += bet;
      this.total_bet += bet;
      this.bank -= bet;
      var mid_chip1 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'show', chipNumber:bet,side:'mid',position:'1'}),  document.getElementById('mid_chip1'))
      var mid_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+bet}),  document.getElementById('mid_bet'))

      var total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
      var total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
  };



	this.bet_chip = function(chip_amount) {
      var bet = parseInt(chip_amount);

      if(this.playing==false){
            console.log("check1");
          if (this.hands[this.hand_selected].bet + bet < 501 && bet < this.bank ) {
            console.log("check2");
              this.hands[this.hand_selected].bet += bet;
              this.total_bet +=bet;
              this.bank -= bet;
              var total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+this.total_bet}),  document.getElementById('total_bet'))
              var total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.bank}),  document.getElementById('total_bank'))
              this.hands[this.hand_selected].chips.push(new Chip(bet))

                      var empty_chip_slot = this.hands[this.hand_selected].hand_side+"_chip"+(this.hands[this.hand_selected].chip_count+1);
                      var current_position = (this.hands[this.hand_selected].chip_count+1);
                      empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:chip_amount,side:this.hands[this.hand_selected].hand_side,position:current_position}),  document.getElementById(empty_chip_slot))
                      this.hands[this.hand_selected].chip_count++;

                      var mid_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[this.hand_selected].bet}),  document.getElementById(this.hands[this.hand_selected].hand_side+'_bet'))






          }else if(bet > this.bank){

            console.log("Hey! You Are Broke!");
          }
      }
  };
  /*Player may remove chips if the game has not started yet*/
  this.remove_chip= function() {
    if (this.playing == false) {
    var top_chip_slot = this.hands[this.hand_selected].hand_side+"_chip"+(this.hands[this.hand_selected].chip_count);

      if (this.hands[this.hand_selected].chip_count>1) {
          var mid_chip = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'5',side:this.hands[this.hand_selected].hand_side,position:this.hands[this.hand_selected].chip_count}),  document.getElementById(top_chip_slot))
          this.hands[this.hand_selected].chip_count -= 1;
          this.bank += this.hands[this.hand_selected].chips[this.hands[this.hand_selected].chip_count].chip_value;
          this.total_bet -= this.hands[this.hand_selected].chips[this.hands[this.hand_selected].chip_count].chip_value;
          this.hands[this.hand_selected].bet -= this.hands[this.hand_selected].chips[this.hands[this.hand_selected].chip_count].chip_value;
          var mid_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[this.hand_selected].bet}),  document.getElementById(this.hands[this.hand_selected].hand_side+'_bet'))

          var total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+this.total_bet}),  document.getElementById('total_bet'))
          var r = this.hands[this.hand_selected].chips.pop();
          var total_bank = ReactDOM.render(React.createElement (Bank,{bank:'$'+this.bank}),  document.getElementById('total_bank'));

      }
    }
  }

  this.hold_hand = function () {
      if(this.playing == true) {
          this.hands[this.hand_selected].held = true;
          var hand_count = 0;
          var held_count = 0;
          for( var x = 0; x < this.hands.length; x++ ) {
              if (this.hands[x].held == true) {
                  held_count++;
              }
              if (this.hands[x].cards.length>1) {
                  hand_count++;
              }
          }
          if(held_count == hand_count) {
              console.log("showing dealers cards");
              game1.dealer.hands[0].show_card();
              game1.dealer.hands[0].show_card();
              game1.dealer.hands[0].update_score();
              if(game1.dealer.hands[0].hand_value == 22) {
                  game1.dealer.hands[0].cards[0].cardValue = 1;
                  game1.dealer.hands[0].hand_value -= 10;
                  console.log("hand_score"+game1.dealer.hands[0].hand_value);
                  var score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.dealer.hands[0].hand_value}),  document.getElementById('dealer_score'))
              }
              var z = 1;
              while (z==1) {
                  if(game1.dealer.hands[0].hand_value < 16) {
                      console.log("dealer under 16, hitting card");
                      game1.deck.dealCards(1,0,'dealer');
                      game1.dealer.hands[0].show_card();
                      game1.dealer.hands[0].update_score();
                      if ( game1.dealer.hands[0].check_bust() ) {
                          game1.dealer.hands[0].win = 'bust';
                      }
                  }else if(game1.dealer.hands[0].hand_value <= 21 && game1.dealer.hands[0].hand_value >= 17 ) {
                      console.log(game1.dealer.hands[0].hand_value);
                      game1.check_winner();
                      z=2;
                  }else if(game1.dealer.hands[0].hand_value > 21) {
                      console.log(game1.dealer.hands[0].hand_value+"bustdealer");
                      if ( game1.dealer.hands[0].check_bust() ) {

                          game1.dealer.hands[0].win = 'bust';
                      }
                      game1.check_winner()
                      z=2;
                  }
              }
          }
      }
  };

	this.hit_card = function (){
      if (this.playing) {
        console.log('playing');
        if(this.name=='dealer') {
          game1.deck.dealCards(1,0,'dealer');

        }else {
          game1.deck.dealCards(1,this.hand_selected,'player');

          this.hands[this.hand_selected].show_card();
          this.hands[this.hand_selected].update_score();
          var hand_count = 0;
          var bust_count = 0;
          //check if the new card busted the hand
          if ( this.hands[this.hand_selected].check_bust() ) {
              this.hands[this.hand_selected].win = 'bust';

              var bust = ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.hands[this.hand_selected].hand_side+'_bust'))
              //check if all of the player's hands are busted including possible split hands
              for( var x = 0; x < this.hands.length; x++ ) {
                  if( this.hands[x].cards.length > 1 ) {
                      hand_count ++;


                  }
                  if( this.hands[x].win== 'bust') {
                      bust_count ++;
                      console.log("bust"+bust_count);

                  }
              }
              //if all hands are busted, end the round by checking winner and calculating scores
              if (hand_count == bust_count) {

                  game1.check_winner();

              }
          }
        }
      }else {

        game1.deck.dealCards(2,0,'dealer');//(numberofCards,hand,dealer/player) hand 0=mid 1=left 2=right
        game1.deck.dealCards(2,0,'player');
        game1.dealer.hands[0].show_card(true);//true = dealers first cards, hide first card and show second only need to call once
        game1.player.hands[0].show_card();//call to show the next card that has not been shown
        game1.player.hands[0].show_card();
        game1.player.hands[0].update_score();
        if(this.hands[0].hand_value == 22) {
            this.hands[0].cards[0].cardValue = 1;
            this.hands[0].hand_value -= 10;

            var score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[0].hand_value}),  document.getElementById('mid_score'))
        }
        game1.player.playing=true;
        if (game1.dealer.hands[0].check_blackjack() == true) {
            game1.check_winner();
        }else if (game1.player.hands[0].check_blackjack() == true) {
            game1.check_winner();
        }
        game1.first_turn = false;


      }


		};



    this.select_hand = function(side) {

        switch(side) {
            case 'left':
                this.hand_selected = 1;
                var mid_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'mid'}),  document.getElementById('mid_top'))
                var right_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'right'}),  document.getElementById('right_top'))
                var left_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'visible',side:'left'}),  document.getElementById('left_top'))
                break;
            case 'mid':
                this.hand_selected = 0;
                var mid_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'visible',side:'mid'}),  document.getElementById('mid_top'))
                var right_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'right'}),  document.getElementById('right_top'))
                var left_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'left'}),  document.getElementById('left_top'))
                break;
            case 'right':
                this.hand_selected = 2;
                var mid_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'mid'}),  document.getElementById('mid_top'))
                var right_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'visible',side:'right'}),  document.getElementById('right_top'))
                var left_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'left'}),  document.getElementById('left_top'))
                break;
        }
    }

    this.split_hand = function (side) {
      switch(this.split_count) {
          case 0:
                this.hands[1].cards[0] = this.hands[0].cards.pop()
                this.hands[0].cards_shown -= 1;
                game1.deck.dealCards(1,0,'player');
                game1.deck.dealCards(1,1,'player');
                game1.player.hands[0].show_card();
                game1.player.hands[1].show_card();
                game1.player.hands[1].show_card();
                game1.player.hands[0].update_score();
                game1.player.hands[1].update_score();
                if(this.hands[0].hand_value == 22) {
                    this.hands[0].cards[0].cardValue = 1;
                    this.hands[0].hand_value -= 10;

                    var score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[0].hand_value}),  document.getElementById('mid_score'))
                }
                if(this.hands[1].hand_value == 22) {
                    this.hands[1].cards[0].cardValue = 1;
                    this.hands[1].hand_value -= 10;

                    var score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[1].hand_value}),  document.getElementById('left_score'))
                }
                this.hands[1].bet = this.hands[0].bet;
                game1.player.total_bet += this.hands[1].bet;
                game1.player.bank -= this.hands[1].bet
                var bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[1].bet}),  document.getElementById('left_bet'));

                this.hands[1].chip_count =0;
                for (var z=0;z<this.hands[0].chips.length;z++) {
                    var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[0].chips[z].chip_value,side:'left',position:z+1}),  document.getElementById("left_chip"+(z+1)));
                    this.hands[1].chips.push(this.hands[0].chips[z]);
                    this.hands[1].chip_count++;
                };
                var total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                var total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
                var left_score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[1].hand_value}),  document.getElementById('left_score'))

                this.split_count++;

                break;
          case 1:
                this.hands[2].cards[0] = this.hands[side].cards.pop()
                this.hands[side].cards_shown -= 1;
                game1.deck.dealCards(1,side,'player');
                game1.deck.dealCards(1,2,'player');
                game1.player.hands[side].show_card();
                game1.player.hands[2].show_card();
                game1.player.hands[2].show_card();
                game1.player.hands[2].update_score();
                if(this.hands[2].hand_value == 22) {
                    this.hands[2].cards[0].cardValue = 1;
                    this.hands[2].hand_value -= 10;

                    var score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[2].hand_value}),  document.getElementById('right_score'))
                }
                this.hands[2].bet = this.hands[side].bet;
                game1.player.total_bet += this.hands[2].bet;
                game1.player.bank -= this.hands[2].bet
                var bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[2].bet}),  document.getElementById('right_bet'));

                this.hands[2].chip_count =0;
                for (var z=0;z<this.hands[side].chips.length;z++) {
                    var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[side].chips[z].chip_value,side:'right',position:z+1}),  document.getElementById("right_chip"+(z+1)));
                    this.hands[2].chips.push(this.hands[side].chips[z]);
                      this.hands[2].chip_count++;
                };
                var total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                var total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))

                break;

      }

    }

};

function Chip(chip_value) {
  this.chip_value = chip_value;
}

function Hand (side) {
    this.win=false;
    this.hand_side=side;
		this.cards = [];
		this.hand_value = 0;
		this.bet = 0;
		this.chip_count = 1;
    this.cards_shown = 1
    this.chips = []
    this.held = false;

    this.show_card = function (first_turn) {

        if (first_turn) {

          var mid_card = ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:'53',side:'dealer',handPosition:1}),  document.getElementById('dealer_card1'))

          var mid_card = ReactDOM.render(React.createElement (Card,{visible: 'show',cardNumber:this.cards[1].cardNumber,side:'dealer',handPosition:2}),  document.getElementById('dealer_card2'))


        }else {
                var card = ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:this.cards[this.cards_shown-1].cardNumber,side:this.hand_side,handPosition:this.cards_shown}),  document.getElementById(this.hand_side+"_card"+this.cards_shown))

                this.cards_shown ++;
            }
        }
    this.check_blackjack = function () {
        var total_value = 0;
        for (var x=0;x<this.cards.length;x++) {
            total_value += this.cards[x].cardValue;
        }
        if (total_value == 21) {

          return true;
        }
    };

    this.update_score = function () {
          this.hand_value = 0;
          var tempscore = 0;
      for (var x=0;x<this.cards.length;x++) {
          this.hand_value += this.cards[x].cardValue;
      }
      var score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hand_value}),  document.getElementById(this.hand_side+'_score'))

    }
    this.check_bust = function() {
        if(this.hand_value > 21) {


          for( var x= 0; x < this.cards.length; x++ ) {
              if (this.cards[x].cardValue == 11) {
                  this.cards[x].cardValue == 1;
                  this.hand_value -= 10;
                  if (this.hand_value <= 21) {
                      break;
                  }
              }
          }
          var score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hand_value}),  document.getElementById(this.hand_side+'_score'))

        }

        if(this.hand_value > 21) {
           return true;
        }else {
            return false;
        }
    }
};


function Cards (cardNumber,suit,face,cardValue) {
			this.cardNumber = cardNumber;
			this.cardValue = cardValue;
			this.suit = suit;
			this.face = face;
		};


function Deck () {
			this.cards = [];
      this.makeNewDeck = function (numberOfDecks) {
					var suits = ['Clubs','Diamonds','Hearts','Spades'];
					var faces = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
					var cardValue = [11,2,3,4,5,6,7,8,9,10,10,10,10];
					for( var i = 0; i < numberOfDecks; i++ ) {
							var cardnumber = 0;
							for(var j=0;j<suits.length;j++) {
									for(var k=0;k<faces.length;k++) {
										this.cards.push(new Cards(cardnumber+1,suits[j],faces[k],cardValue[k]));
										cardnumber++;
									}
							}
					}
			};

			this.shuffleDeck = function () {
					var tempCard;
					var tempcardNumber1;
					for(var i=0;i<this.cards.length;i++) {
							tempCard = this.cards[i];
							var r = Math.floor(Math.random() * this.cards.length)
							this.cards[i] = this.cards[r];
							this.cards[r] = tempCard;
					}
			};

		this.dealCards = function (numberOfCards,hand,player_dealer) {
				var newCard

						for(var i=0;i<numberOfCards;i++) {
								newCard = this.cards.pop();
                switch(player_dealer) {
                    case 'dealer':
                        game1.dealer.hands[hand].cards.push(newCard);
                        break;
                    case 'player':
                        game1.player.hands[hand].cards.push(newCard);
                        break;
                }

						}

		};

	};


function main() {
  inject_objects();



  game1.deck.makeNewDeck(5);

  game1.deck.shuffleDeck();
  game1.dealer.hands.push(new Hand('dealer'));
  game1.player.hands.push(new Hand('mid'),new Hand('left'),new Hand('right'));

  game1.player.ante_up(100);



}
var game1 = new Game();
main();
