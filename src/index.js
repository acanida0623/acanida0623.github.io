var React = require('react')
var ReactDOM = require('react-dom')

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Arrow = React.createClass ({

    render: function() {

        return <img src="static/images/arrow.gif" className={this.props.side+"_pointer "+this.props.visible} />


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
        return <img onMouseDown={this.onMouseDownHandler} src={"static/images/cards/"+this.props.cardNumber+".png"} className={this.props.side+"_card"+this.props.handPosition+" "+this.props.visible} />

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
      return  <ReactCSSTransitionGroup transitionName = "mc1animate"
               transitionAppear = {false}
               transitionEnter = {false} transitionLeave = {true} transitionLeaveTimeout = {5000}>

               <img onMouseDown={this.onMouseDownHandler} src={"static/images/chips/chip"+this.props.chipNumber+".png"} className={hide} />
            </ReactCSSTransitionGroup>



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
    return <img onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} src={"static/images/chips/"+downpic} className={"chip"+this.props.chipNumber} />

    }
});


var Winner = React.createClass ({

    render: function() {
      return <span className={"neongreen "+this.props.visible}>   WIN</span>
  }
});
var Lose = React.createClass ({

    render: function() {
      return <span className={"neonred "+this.props.visible}>LOSE</span>
  }
});
var Draw = React.createClass ({

    render: function() {
      return <span className={"neongreen "+this.props.visible}>   DRAW</span>
  }
});


var Busted = React.createClass ({
    render: function() {
      return <span className={"neonred "+this.props.visible}>  BUSTED</span>
  }
});

var Held = React.createClass ({

    render: function() {
      return <span className={"neongreen "+this.props.visible}>  HELD</span>
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
      return <img onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} className={"hit_button"} src={"static/images/buttons/"+hoverpic} />
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
      return <img onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} className="stand_button" src={"static/images/buttons/"+hoverpic} />
  }
});

var Split_Button = React.createClass ({
  getInitialState: function() {
     return {

         down: false,
         inactive:this.props.inactive

     };
 },

 onMouseDownHandler: function() {
        this.setState({
            down: true
        });
        if(this.props.inactive){

        }else {
          game1.player.split_hand(game1.player.hand_selected);

        }
    },
 onMouseUpHandler: function() {
     this.setState({
         down: false
     });
 },
    render: function() {
      var hoverpic = "split.png"
      if (this.state.down){
        hoverpic="splitdown.png"
      }
      if (this.state.inactive) {
        hoverpic="splitdisabled.png"
      }
      return <img onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} className="split_button" src={"static/images/buttons/"+hoverpic} />
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

var Blackjack = React.createClass ({

    render: function() {
      return <span className="neonred"> BLACKJACK</span>

  }
});

var Blank = React.createClass ({
  onMouseDownHandler: function() {
      this.setState({
          down: true
      });
        game1.reset_game();


  },

    render: function() {
    return <img onMouseDown={this.onMouseDownHandler}  className={"hit_button"} src={"static/images/buttons/"+hoverpic} />


  }
});


function inject_objects() {
var total_bank = ReactDOM.render(React.createElement (Bank,{bank:'$2000'}),  document.getElementById('total_bank'))
var total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$0'}),  document.getElementById('total_bet'))
var total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$0'}),  document.getElementById('total_win'))
var stand_button= ReactDOM.render(React.createElement (Stand_Button),  document.getElementById('stand_button'))
var hit_button= ReactDOM.render(React.createElement (Hit_Button),  document.getElementById('hit_button'))
var split_button=ReactDOM.render(React.createElement (Split_Button,{inactive:true}), document.getElementById('split_button'))
var left_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'left'}),  document.getElementById('left_top'))
var mid_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'show',side:'mid'}),  document.getElementById('mid_top'))
var right_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'hidden',side:'right'}),  document.getElementById('right_top'))
var dealer_score = ReactDOM.render(React.createElement (Hand_Score,{score:'??'}),  document.getElementById('dealer_score'))
var left_score = ReactDOM.render(React.createElement (Hand_Score,{score:''}),  document.getElementById('left_score'))
var mid_score = ReactDOM.render(React.createElement (Hand_Score,{score:''}),  document.getElementById('mid_score'))
var right_score = ReactDOM.render(React.createElement (Hand_Score,{score:''}),  document.getElementById('right_score'))
var left_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:''}),  document.getElementById('left_bet'))
var mid_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:''}),  document.getElementById('mid_bet'))
var right_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:''}),  document.getElementById('right_bet'))
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
  this.game_over = false;
  this.first_turn = true;

  this.show_dealers_cards = function () {
      console.log("showing dealers cards");
      this.dealer.hands[0].show_card();
      this.dealer.hands[0].show_card();
      this.dealer.hands[0].update_score();
      if(this.dealer.hands[0].hand_value == 22) {
          this.dealer.hands[0].cards[0].cardValue = 1;
          this.dealer.hands[0].hand_value -= 10;
          console.log("hand_score"+this.dealer.hands[0].hand_value);
          var score = ReactDOM.unmountComponentAtNode(document.getElementById('dealer_score'))

          score = ReactDOM.render(React.createElement (Hand_Score,{score:this.dealer.hands[0].hand_value}),  document.getElementById('dealer_score'))
      }

    loop1:  while (true) {
        console.log("loop+");
          if(this.dealer.hands[0].hand_value <= 16) {
              console.log("dealer under 16, hitting card");
              this.deck.dealCards(1,0,'dealer');
              this.dealer.hands[0].show_card();
              this.dealer.hands[0].update_score();
              if ( this.dealer.hands[0].check_bust() == true ) {
                  this.dealer.hands[0].win = 'bust';
              }
              continue loop1;
          }else if(this.dealer.hands[0].hand_value <= 21 && this.dealer.hands[0].hand_value >= 17 ) {
              console.log(this.dealer.hands[0].hand_value);
              this.check_winner();
              break loop1;
          }else if(this.dealer.hands[0].hand_value > 21) {
              console.log(this.dealer.hands[0].hand_value+"bustdealer");
              if ( this.dealer.hands[0].check_bust() == true) {
                  this.dealer.hands[0].win = 'bust';
              } else {
                  continue loop1;
              }
              this.check_winner()
              break loop1;
          }
      }
  };
  /*Called once at first draw and then when hold button is placed on all hands */
  this.check_winner = function() {
    if(this.first_turn == true) {
        console.log("first turn");
        if (this.player.hands[0].check_blackjack()==true) {
            this.player.hands[0].win = 'blackjack';
            this.blackjack = true;
            var bj= ReactDOM.render(React.createElement (Blackjack),  document.getElementById("mid_bust"))

        } if(this.dealer.hands[0].check_blackjack()==true) {
          console.log("dealerbj");
          var bj= ReactDOM.render(React.createElement (Blackjack),  document.getElementById("mid_held"))

            this.player.hands[0].win = 'bust';
            this.blackjack = true;

        }if(this.player.hands[0].check_blackjack()==true && this.dealer.hands[0].check_blackjack()==true) {
          console.log("tie");
            this.player.hands[0].win="draw";
            var draws = ReactDOM.render(React.createElement (Draw,{visible:'show'}),  document.getElementById("mid_held"))
            draws = ReactDOM.render(React.createElement (Draw,{visible:'show'}),  document.getElementById("mid_bust"))

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
                  var score = ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+'_score'))
                  score = ReactDOM.render(React.createElement (Hand_Score,{score:this.player.hands[x].hand_value}),  document.getElementById(this.player.hands[x].hand_side+'_score'))
                  if (this.player.hands[x].hand_value > 21 && this.player.hands[x].cards.length>1) {
                      this.player.hands[x].win='bust';
                      var bust = ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_bust"))
                  }
              }else if (this.player.hands[x].hand_value > this.dealer.hands[0].hand_value && this.player.hands[x].cards.length>1) {
                    if (this.player.hands[x].hand_value > 21) {
                        this.player.hands[x].win='bust';
                        var bust = ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_bust"))
                    }else {
                        this.player.hands[x].win='true';
                        var win = ReactDOM.render(React.createElement (Winner,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_bust"))
                    }
            }else if (this.dealer.hands[0].hand_value > 21) {
                  var bust = ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById("mid_held"))
                  if (this.player.hands[x].hand_value > 21) {
                      this.player.hands[x].win='bust';
                      var bust = ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_bust"))
                  }else if(this.player.hands[x].cards.length>1) {
                      var win = ReactDOM.render(React.createElement (Winner,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_bust"))
                      this.player.hands[x].win='true';
                  }
              }else if (this.dealer.hands[0].hand_value == this.player.hands[x].hand_value && this.player.hands[x].cards.length>1 ) {
                      var draw = ReactDOM.render(React.createElement (Draw,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_bust"))
                      this.player.hands[x].win='draw';
              }else if (this.dealer.hands[0].hand_value > this.player.hands[x].hand_value && this.player.hands[x].cards.length >1) {
                      this.player.hands[x].win='bust'
                      var lose = ReactDOM.render(React.createElement (Lose,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_bust"))
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
                  this.player.bank += this.player.hands[0].bet + this.player.total_won;
                  var msg = "YOU GOT A BLACKJACK! YOU WON $"+this.player.total_won+"!";
                  console.log(msg);
                  var total_win = ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
                  var bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                  total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
                  bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
                  this.reset_game(true);
                  break;

              case 'bust':
                  this.player.total_won = 0;
                  this.player.total_won -= (this.player.hands[0].bet);
                  var msg = "DEALER GOT A BLACKJACK. YOU LOSE $"+(this.player.total_won*-1)+"!";
                  console.log(msg);
                  var total_win = ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
                  total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
                  this.reset_game(false);
                  break;

              case 'draw':
                  this.player.total_won = 0;
                  this.player.bank += this.player.hands[0].bet;
                  var msg = "YOU AND THE DEALER BOTH GOT A BLACKJACK. DRAW GAME!";
                  console.log(msg);
                  var total_win = ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
                  var bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                  total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
                  bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
                  this.reset_game(true);
                  break;

          }
      }else { game1.game_over = true;
          this.player.total_won = 0;
          for (var x = 0; x < this.player.hands.length; x++ ) {
              switch (this.player.hands[x].win) {
                  case 'true':
                      console.log("win=true")
                      this.player.total_won += (this.player.hands[x].bet);
                      this.player.bank += this.player.hands[x].bet*2;
                      console.log("total_win"+ this.player.total_won)

                      break;
                  case 'bust':
                      console.log("bust!!");
                      this.player.total_won -= (this.player.hands[x].bet);
                      console.log(this.player.total_won);
                      console.log("total_win"+ this.player.total_won)

                      break;
                  case 'draw':
                      this.player.total_won = 0;
                      this.player.bank += this.player.hands[0].bet;
                      var msg = "YOU AND THE DEALER BOTH GOT " + this.player.hands[x].hand_value + ". DRAW GAME!";
                      console.log(msg);
                      console.log("total_win"+ this.player.total_won)

                      break;

              }
          }
          if (this.player.total_won > 0) {
              var msg = "YOU WON $"+this.player.total_won+"!";
              console.log(msg);
              var total_win = ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
              var bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
              total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
              bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))

              this.reset_game(true);
          }else {
              var msg = "YOU LOST $"+this.player.total_won*-1+"!";
              console.log(msg);
              var total_win = ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
              var bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
              total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
              bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
              this.reset_game(false);
          }
      }
  };


  this.unmount_chips = function () {
      for(var x=0;x<game1.player.hands.length;x++) {
          for(var z=0; z < game1.player.hands[x].chips.length; z++) {
              var newchip= ReactDOM.unmountComponentAtNode(document.getElementById(game1.player.hands[x].hand_side+'_chip'+(z+1)));
          }
          game1.player.hands[x].bet = 0;
          game1.player.hands[x].chip_count = 0;
          game1.player.hands[x].chips.length = 0;
          game1.game_over = false;

      }

    };

  this.reset_game = function(win) {
      this.player.total_won = 0
      this.player.playing = false;
      this.blackjack = false;
      this.first_turn = true;
      this.player.split_count = 0;
      this.player.total_bet = 0;
      this.player.select_hand('mid');
      for(var x=0;x<this.player.hands.length;x++) {
          for(var z=0; z < this.player.hands[x].chips.length; z++) {
              if(win==true) {
                  document.querySelector("."+this.player.hands[x].hand_side+'_chip'+(z+1)).className = 'mid_chip_win';
              }else {
                  document.querySelector("."+this.player.hands[x].hand_side+'_chip'+(z+1)).className = 'mid_chip_lose';
              }
            //var newchip = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'5',side:this.player.hands[x].hand_side,position:z+1}),  document.getElementById(this.player.hands[x].hand_side+'_chip'+(z+1)))
          }



      }
      setTimeout(game1.unmount_chips,500);
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
      var mid_chip1 = ReactDOM.unmountComponentAtNode(document.getElementById('mid_chip1'))
      var mid_bet = ReactDOM.unmountComponentAtNode(document.getElementById('mid_bet'))
      var total_bet = ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
      var total_bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
      mid_chip1 = ReactDOM.render(React.createElement (Chip_Hand,{visible:'show', chipNumber:bet,side:'mid',position:'1'}),  document.getElementById('mid_chip1'))
      mid_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+bet}),  document.getElementById('mid_bet'))
      total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
      total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
  };

	this.bet_chip = function(chip_amount) {
      var bet = parseInt(chip_amount);
      if(this.playing==false){
          if (this.hands[this.hand_selected].bet + bet < 501 && bet < this.bank ) {
              this.hands[this.hand_selected].bet += bet;
              this.total_bet +=bet;
              this.bank -= bet;
              var total_bet = ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
              var total_bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
              total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+this.total_bet}),  document.getElementById('total_bet'))
              total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.bank}),  document.getElementById('total_bank'))
              this.hands[this.hand_selected].chips.push(new Chip(bet))
              var empty_chip_slot = this.hands[this.hand_selected].hand_side+"_chip"+(this.hands[this.hand_selected].chip_count+1);
              var current_position = (this.hands[this.hand_selected].chip_count+1);
              var empty_chip_slots = ReactDOM.unmountComponentAtNode(document.getElementById(empty_chip_slot))
              empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:chip_amount,side:this.hands[this.hand_selected].hand_side,position:current_position}),  document.getElementById(empty_chip_slot))
              this.hands[this.hand_selected].chip_count++;
              var mid_bet = ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[this.hand_selected].hand_side+'_bet'))
              mid_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[this.hand_selected].bet}),  document.getElementById(this.hands[this.hand_selected].hand_side+'_bet'))
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
          var mid_chip = ReactDOM.unmountComponentAtNode(document.getElementById(top_chip_slot))

          mid_chip = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'5',side:this.hands[this.hand_selected].hand_side,position:this.hands[this.hand_selected].chip_count}),  document.getElementById(top_chip_slot))

          this.hands[this.hand_selected].chip_count -= 1;

          this.bank += this.hands[this.hand_selected].chips[this.hands[this.hand_selected].chip_count].chip_value;

          this.total_bet -= this.hands[this.hand_selected].chips[this.hands[this.hand_selected].chip_count].chip_value;

          this.hands[this.hand_selected].bet -= this.hands[this.hand_selected].chips[this.hands[this.hand_selected].chip_count].chip_value;

          var mid_bet = ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[this.hand_selected].hand_side+'_bet'))

          mid_bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[this.hand_selected].bet}),  document.getElementById(this.hands[this.hand_selected].hand_side+'_bet'))

          var total_bet = ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))

          total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+this.total_bet}),  document.getElementById('total_bet'))

          var r = this.hands[this.hand_selected].chips.pop();

          var total_bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'));

          total_bank = ReactDOM.render(React.createElement (Bank,{bank:'$'+this.bank}),  document.getElementById('total_bank'));

      }
    }
  }

  this.hold_hand = function () {

      if(this.playing == true) {
          this.hands[this.hand_selected].held = true;
          var held = ReactDOM.render(React.createElement (Held,{visible:'show'}),  document.getElementById(game1.player.hands[game1.player.hand_selected].hand_side+"_bust"))

          var hand_count = 0;
          var held_count = 0;
          for( var x = 0; x < this.hands.length; x++ ) {
              if ((this.hands[x].held == true) || (this.hands[x].win == 'bust')){
                  held_count++;
              }
              if (this.hands[x].cards.length>1) {
                  hand_count++;
              }
          }
          if(held_count == hand_count) {
              game1.show_dealers_cards();
          }
      }
  };

	this.hit_card = function (){
      if(game1.game_over==false){
          if (this.playing) {
              console.log('playing');
              if(this.name=='dealer') {
                  game1.deck.dealCards(1, 0, 'dealer');
              } else {
                  if ((this.hands[this.hand_selected].held != true) && (this.hands[this.hand_selected].win != 'bust'))  {
                      game1.deck.dealCards(1,this.hand_selected, 'player');
                      game1.player.hands[this.hand_selected].check_split(this.hands[this.hand_selected].cards.length);
                      this.hands[this.hand_selected].show_card();
                      this.hands[this.hand_selected].update_score();
                      var hand_count = 0;
                      var bust_count = 0;
                    //check if the new card busted the hand
                      if ( this.hands[this.hand_selected].check_bust() ) {
                          this.hands[this.hand_selected].win = 'bust';
                          var bust = ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.hands[this.hand_selected].hand_side+"_bust"))

                        //check if all of the player's hands are busted including possible split hands
                          for( var x = 0; x < this.hands.length; x++ ) {
                              if( this.hands[x].cards.length > 1 ) {
                                  hand_count ++;
                              }
                              if (( this.hands[x].win == 'bust') || ( this.hands[x].held == true)){
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
              }
          }else {
              for(var x=0;x<this.hands.length;x++) {
                  for(var y=0;y<this.hands[x].cards.length;y++){
                      var newcard = ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[x].hand_side+"_card"+(y+1)));
                  }
                  this.hands[x].cards.length=0;
                  this.hands[x].held = false;
                  this.hands[x].win=false;
                  this.hands[x].hand_value = 0;
                  this.hands[x].cards_shown = 1;
                  var held = ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[x].hand_side+"_held"))
                  var bust = ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[x].hand_side+"_bust"))
              }
              for(var a=0; a < game1.dealer.hands[0].cards.length; a++) {
                  var newcard = ReactDOM.unmountComponentAtNode(document.getElementById("dealer_card"+(a+1)));
              }
              game1.dealer.hands[0].cards.length = 0;
              game1.dealer.hands[0].hand_value = 0;
              game1.dealer.hands[0].cards_shown = 1;
              var dealer_score = ReactDOM.unmountComponentAtNode(document.getElementById('dealer_score'))
              var left_score = ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
              var mid_score = ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
              var right_score = ReactDOM.unmountComponentAtNode(document.getElementById('right_score'))
              game1.deck.dealCards(2,0,'dealer');//(numberofCards,hand,dealer/player) hand 0=mid 1=left 2=right
              game1.deck.dealCards(2,0,'player');
              game1.dealer.hands[0].show_card(true);//true = dealers first cards, hide first card and show second only need to call once
              game1.player.hands[0].show_card();//call to show the next card that has not been shown
              game1.player.hands[0].show_card();
              game1.player.hands[0].update_score();
              game1.player.hands[0].check_split(game1.player.hands[0].cards.length);
              if(this.hands[0].hand_value == 22) {
                  this.hands[0].cards[0].cardValue = 1;
                  this.hands[0].hand_value -= 10;
                  var score = ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
                  score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[0].hand_value}),  document.getElementById('mid_score'))
              }
              game1.player.playing=true;
              game1.first_turn = true;
              if (game1.dealer.hands[0].check_blackjack() == true) {
                  game1.check_winner();
              }else if (game1.player.hands[0].check_blackjack() == true) {
                  game1.check_winner();
              }
              game1.first_turn = false;
          }
      }
  };



    this.select_hand = function(side) {

        switch(side) {
            case 'left':
                this.hand_selected = 1;
                var mid_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('mid_top'))
                var right_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('right_top'))
                var left_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('left_top'))
                left_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'visible',side:'left'}),  document.getElementById('left_top'))
                break;
            case 'mid':
                this.hand_selected = 0;
                var mid_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('mid_top'))
                var right_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('right_top'))
                var left_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('left_top'))
                mid_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'visible',side:'mid'}),  document.getElementById('mid_top'))
                break;
            case 'right':
                this.hand_selected = 2;
                var mid_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('mid_top'))
                var right_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('right_top'))
                var left_arrow = ReactDOM.unmountComponentAtNode(document.getElementById('left_top'))
                right_arrow = ReactDOM.render(React.createElement (Arrow,{visible:'visible',side:'right'}),  document.getElementById('right_top'))
                break;
        }
    }

    this.split_hand = function (side) {
      switch(this.split_count) {
          case 0:
                  if ( this.hands[0].cards[0].face == 'A' && this.hands[0].cards[1].face == 'A') {
                    this.hands[1].cards[0] = this.hands[0].cards.pop()
                    this.hands[0].cards_shown -= 1;
                    game1.deck.dealCards(1,0,'player');
                    game1.deck.dealCards(1,1,'player');
                    game1.player.hands[0].show_card();
                    game1.player.hands[1].show_card();
                    game1.player.hands[1].show_card();
                    game1.player.hands[0].update_score();
                    game1.player.hands[1].update_score();
                    this.hands[0].cards[0].cardValue = 11;
                    if(this.hands[0].hand_value == 22) {
                        this.hands[0].cards[0].cardValue = 1;
                        this.hands[0].hand_value -= 10;
                        var score = ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
                        score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[0].hand_value}),  document.getElementById('mid_score'))
                    }
                    if(this.hands[1].hand_value == 22) {
                        this.hands[1].cards[0].cardValue = 1;
                        this.hands[1].hand_value -= 10;
                        var score = ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
                        score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[1].hand_value}),  document.getElementById('left_score'))
                    }
                    this.hands[1].bet = this.hands[0].bet;
                    game1.player.total_bet += this.hands[1].bet;
                    game1.player.bank -= this.hands[1].bet
                    var bet = ReactDOM.unmountComponentAtNode(document.getElementById('left_bet'))

                    bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[1].bet}),  document.getElementById('left_bet'));

                    this.hands[1].chip_count =0;
                    for (var z=0;z<this.hands[0].chips.length;z++) {
                        var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[0].chips[z].chip_value,side:'left',position:z+1}),  document.getElementById("left_chip"+(z+1)));

                        var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[0].chips[z].chip_value,side:'left',position:z+1}),  document.getElementById("left_chip"+(z+1)));
                        this.hands[1].chips.push(this.hands[0].chips[z]);
                        this.hands[1].chip_count++;
                    };
                    var total_bet = ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
                    var total_bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                    var left_score = ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
                    total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                    total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
                    left_score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[1].hand_value}),  document.getElementById('left_score'))
                    game1.show_dealers_cards();
                }else {
                    this.hands[1].cards[0] = this.hands[0].cards.pop()
                    this.hands[0].cards_shown -= 1;
                    game1.deck.dealCards(1,0,'player');
                    game1.deck.dealCards(1,1,'player');
                    game1.player.hands[0].show_card();
                    game1.player.hands[1].show_card();
                    game1.player.hands[1].show_card();
                    game1.player.hands[0].update_score();
                    game1.player.hands[1].update_score();
                    game1.player.hands[0].check_split(game1.player.hands[0].cards.length);
                    game1.player.hands[1].check_split(game1.player.hands[1].cards.length);
                    if(this.hands[0].cards[0].cardValue == 1){
                        this.hands[0].cards[0].cardValue = 11
                    }
                    if(this.hands[0].hand_value == 22) {
                        this.hands[0].cards[0].cardValue = 1;
                        this.hands[0].hand_value -= 10;
                        var score = ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
                        score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[0].hand_value}),  document.getElementById('mid_score'))
                    }
                    if(this.hands[1].hand_value == 22) {
                        this.hands[1].cards[0].cardValue = 1;
                        this.hands[1].hand_value -= 10;
                        var score = ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
                        score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[1].hand_value}),  document.getElementById('left_score'))
                    }
                    this.hands[1].bet = this.hands[0].bet;
                    game1.player.total_bet += this.hands[1].bet;
                    game1.player.bank -= this.hands[1].bet
                    var bet = ReactDOM.unmountComponentAtNode(document.getElementById('left_bet'))

                    var bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[1].bet}),  document.getElementById('left_bet'));

                    this.hands[1].chip_count =0;
                    for (var z=0;z<this.hands[0].chips.length;z++) {
                        var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[0].chips[z].chip_value,side:'left',position:z+1}),  document.getElementById("left_chip"+(z+1)));

                        var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[0].chips[z].chip_value,side:'left',position:z+1}),  document.getElementById("left_chip"+(z+1)));
                        this.hands[1].chips.push(this.hands[0].chips[z]);
                        this.hands[1].chip_count++;
                    };
                    var total_bet = ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
                    var total_bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                    var left_score = ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
                    total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                    total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
                    left_score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[1].hand_value}),  document.getElementById('left_score'))
                    this.split_count++;
                }
                break;
          case 1:
                if (this.hands[side].cards[0].face == 'A' && this.hands[side].cards[1].face == 'A') {
                    this.hands[2].cards[0] = this.hands[side].cards.pop()
                    this.hands[side].cards_shown -= 1;
                    game1.deck.dealCards(1,side,'player');
                    game1.deck.dealCards(1,2,'player');
                    game1.player.hands[side].show_card();
                    game1.player.hands[2].show_card();
                    game1.player.hands[2].show_card();
                    game1.player.hands[2].update_score();
                    game1.player.hands[side].update_score();
                    this.hands[side].cards[0].cardValue = 11;
                    if(this.hands[2].hand_value == 22) {
                        this.hands[2].cards[0].cardValue = 1;
                        this.hands[2].hand_value -= 10;
                        var score = ReactDOM.unmountComponentAtNode(document.getElementById('right_score'))
                        score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[2].hand_value}),  document.getElementById('right_score'))
                    }
                    if(this.hands[side].hand_value == 22) {
                        this.hands[side].cards[0].cardValue = 1;
                        this.hands[side].hand_value -= 10;
                        var score = ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[side].hand_side+'_score'))
                        score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[side].hand_value}),  document.getElementById(this.hands[side].hand_side+'_score'))
                    }
                    this.hands[2].bet = this.hands[side].bet;
                    game1.player.total_bet += this.hands[2].bet;
                    game1.player.bank -= this.hands[2].bet
                    var bet = ReactDOM.unmountComponentAtNode(document.getElementById('right_bet'))


                    bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[2].bet}),  document.getElementById('right_bet'));

                    this.hands[2].chip_count =0;
                    for (var z=0;z<this.hands[side].chips.length;z++) {
                        var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[side].chips[z].chip_value,side:'right',position:z+1}),  document.getElementById("right_chip"+(z+1)));
                        this.hands[2].chips.push(this.hands[side].chips[z]);
                          this.hands[2].chip_count++;
                    };
                    var total_bet = ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
                    var total_bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                    total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                    total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
                    var split_button = ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                    split_button = ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
                    this.select_hand(this.hands[side].hand_side);
                    this.hold_hand();
                    this.select_hand(this.hands[2].hand_side);
                    this.hold_hand();

                }else {
                    if(this.hands[side].cards[0].face === this.hands[side].cards[1].face){
                        this.hands[2].cards[0] = this.hands[side].cards.pop()
                        this.hands[side].cards_shown -= 1;
                        game1.deck.dealCards(1,side,'player');
                        game1.deck.dealCards(1,2,'player');
                        game1.player.hands[side].show_card();
                        game1.player.hands[2].show_card();
                        game1.player.hands[2].show_card();
                        game1.player.hands[2].update_score();
                        game1.player.hands[side].update_score();
                        if(this.hands[side].cards[0].cardValue == 1){
                            this.hands[side].cards[0].cardValue = 11
                        }
                        if(this.hands[2].hand_value == 22) {
                            this.hands[2].cards[0].cardValue = 1;
                            this.hands[2].hand_value -= 10;
                            var score = ReactDOM.unmountComponentAtNode(document.getElementById('right_score'))
                            score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[2].hand_value}),  document.getElementById('right_score'))
                        }
                        if(this.hands[side].hand_value == 22) {
                            this.hands[side].cards[0].cardValue = 1;
                            this.hands[side].hand_value -= 10;
                            var score = ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[side].hand_side+'_score'))
                            score = ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[side].hand_value}),  document.getElementById(this.hands[side].hand_side+'_score'))
                        }
                        this.hands[2].bet = this.hands[side].bet;
                        game1.player.total_bet += this.hands[2].bet;
                        game1.player.bank -= this.hands[2].bet
                        var bet = ReactDOM.unmountComponentAtNode(document.getElementById('right_bet'))


                        bet = ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[2].bet}),  document.getElementById('right_bet'));

                        this.hands[2].chip_count =0;
                        for (var z=0;z<this.hands[side].chips.length;z++) {
                            var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[side].chips[z].chip_value,side:'right',position:z+1}),  document.getElementById("right_chip"+(z+1)));
                            this.hands[2].chips.push(this.hands[side].chips[z]);
                              this.hands[2].chip_count++;
                        };
                        var total_bet = ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
                        var total_bank = ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                        total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                        total_bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
                        var split_button = ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                        split_button = ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
                    }
                }

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
		this.chip_count = 0;
    this.cards_shown = 1
    this.chips = []
    this.held = false;

    this.show_card = function (first_turn) {

        if (first_turn) {

          var mid_card = ReactDOM.unmountComponentAtNode(document.getElementById('dealer_card1'))

          var mid_card = ReactDOM.unmountComponentAtNode(document.getElementById('dealer_card2'))


          var mid_card = ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:this.cards[0].cardNumber,side:'dealer',handPosition:1}),  document.getElementById('dealer_card1'))

          var mid_card = ReactDOM.render(React.createElement (Card,{visible: 'show',cardNumber:this.cards[1].cardNumber,side:'dealer',handPosition:2}),  document.getElementById('dealer_card2'))


        }else {
                var card = ReactDOM.unmountComponentAtNode(document.getElementById(this.hand_side+"_card"+this.cards_shown))

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
    this.check_split = function (number_of_cards) {
        if ((this.cards[0].face == this.cards[1].face) && (number_of_cards === 2 )) {
          console.log("number"+number_of_cards);
            var split = ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
            split = ReactDOM.render(React.createElement (Split_Button,{inactive:false}),  document.getElementById('split_button'))
        }else {
            var split = ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
            split = ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
        }
    }

    this.update_score = function () {
          this.hand_value = 0;
          var tempscore = 0;
      for (var x=0;x<this.cards.length;x++) {
          this.hand_value += this.cards[x].cardValue;
      }
      var score = ReactDOM.unmountComponentAtNode(document.getElementById(this.hand_side+'_score'))

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
          var score = ReactDOM.unmountComponentAtNode(document.getElementById(this.hand_side+'_score'))
          score = ReactDOM.render(React.createElement (Hand_Score,{score:this.hand_value}),  document.getElementById(this.hand_side+'_score'))
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
					var faces = ['A','2','2','2','2','2','7','8','9','10','J','Q','K'];
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




}
var game1 = new Game();
main();
