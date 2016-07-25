//Preload all of the images
if (document.images) {
  var list = []
    for( var x = 1; x < 54; x++ ) {
        list[x] = new Image()
        var src_string = "static/images/cards/"+x+".png"
        list[x].src = src_string
    }
    list.length = 0;
    for( var x = 0; x < 35; x++ ) {
        list[x] = new Image()
    }
    list[0].src="static/images/buttons/win.png"
    list[1].src="static/images/buttons/lose.png"
    list[2].src="static/images/buttons/draw.png"
    list[3].src="static/images/buttons/busted.png"
    list[4].src="static/images/buttons/held.png"
    list[5].src="static/images/buttons/hitbuttondown.png"
    list[6].src="static/images/buttons/standbuttondown.png"
    list[7].src="static/images/buttons/split.png"
    list[8].src="static/images/buttons/splitdown.png"
    list[9].src="static/images/buttons/double.png"
    list[10].src="static/images/buttons/doubledown.png"
    list[11].src="static/images/buttons/blackjack.png"
    list[12].src="static/images/numbers/0.png"
    list[13].src="static/images/numbers/0red.png"
    list[14].src="static/images/numbers/1.png"
    list[15].src="static/images/numbers/1red.png"
    list[16].src="static/images/numbers/2.png"
    list[17].src="static/images/numbers/2red.png"
    list[18].src="static/images/numbers/3.png"
    list[19].src="static/images/numbers/3red.png"
    list[20].src="static/images/numbers/4.png"
    list[21].src="static/images/numbers/4red.png"
    list[22].src="static/images/numbers/5.png"
    list[23].src="static/images/numbers/5red.png"
    list[24].src="static/images/numbers/6.png"
    list[25].src="static/images/numbers/6red.png"
    list[26].src="static/images/numbers/7.png"
    list[27].src="static/images/numbers/7red.png"
    list[28].src="static/images/numbers/8.png"
    list[29].src="static/images/numbers/8red.png"
    list[30].src="static/images/numbers/9.png"
    list[31].src="static/images/numbers/9red.png"
    list[32].src="static/images/numbers/blank.png"
    list[33].src="static/images/numbers/money.png"
    list[34].src="static/images/numbers/moneyred.png"

}
window.onload = function() {
    document.getElementById("loadingtext").style.display = "none";
    document.getElementById("preloader").style.display = "none";
    document.getElementById("blackback").style.display = "none";
    new FastClick(document.body);
};

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
        return <img onMouseDown={this.onMouseDownHandler} src={"static/images/cards/"+this.props.cardNumber+".png"} className={this.props.side+"_card"+this.props.handPosition} />
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
        if (this.props.visible==='hidden') {
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
      if(game1.player.playing){
          Alert.render('You may only bet at the beginning of the round!',"Betting Not Allowed!")
      }else{
          game1.player.bet_chip(this.props.chipNumber,500);
      }
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
    return <img onMouseDown={this.onMouseDownHandler} onMouseLeave={this.onMouseUpHandler} onMouseUp={this.onMouseUpHandler} src={"static/images/chips/"+downpic} className={"chip"+this.props.chipNumber} />

    }
});


var Winner = React.createClass ({

    render: function() {
      return <img className="winner" src="static/images/buttons/win.png" />
  }
});
var Lose = React.createClass ({

    render: function() {
      return <img className="loser" src="static/images/buttons/lose.png" />
  }
});
var Draw = React.createClass ({

    render: function() {
      return <img className="draw" src="static/images/buttons/draw.png" />
  }
});


var Busted = React.createClass ({
    render: function() {
      return <img className="busted" src="static/images/buttons/busted.png" />
  }
});

var Held = React.createClass ({

    render: function() {
    return <img className="held" src="static/images/buttons/held.png" />
  }
});

var Hit_Button = React.createClass ({
     getInitialState: function() {
     return {
         hover: false,
         down: this.props.down,
         active : this.props.active
     };
 },
 onMouseDownHandler: function() {
     if (this.state.active){
         this.setState({
             down: true,
             active: false

         });
         if (game1.player.hands[0].bet > 0){
              game1.player.hit_card();
         }else {
              Alert.render('You need to place a bet before starting the round.','Place A Bet!')
              this.setState({
                  down: false,
                  active: true

              });
         }
     }
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
      return <img onKeyDown = {this.keyDown} onMouseEnter={this.onMouseUpHandler} onMouseLeave={this.onMouseUpHandler} onMouseDown={this.onMouseDownHandler} onMouseUp={this.onMouseUpHandler} className={"hit_button"} src={"static/images/buttons/"+hoverpic} />
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
      return <img onMouseDown={this.onMouseDownHandler} onMouseEnter={this.onMouseUpHandler} onMouseLeave={this.onMouseUpHandler} onMouseUp={this.onMouseUpHandler} className="stand_button" src={"static/images/buttons/"+hoverpic} />
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
      return <img onMouseDown={this.onMouseDownHandler} onMouseEnter={this.onMouseUpHandler} onMouseLeave={this.onMouseUpHandler} onMouseUp={this.onMouseUpHandler} className="split_button" src={"static/images/buttons/"+hoverpic} />
  }
});

var Double_Button = React.createClass ({
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
          game1.player.double_down(game1.player.hand_selected);
        }
    },
 onMouseUpHandler: function() {
     this.setState({
         down: false
     });
 },
    render: function() {
      var hoverpic = "double.png"
      if (this.state.down){
        hoverpic="doubledown.png"
      }
      if (this.state.inactive) {
        hoverpic="doubledisabled.png"
      }
      return <img onMouseDown={this.onMouseDownHandler} onMouseEnter={this.onMouseUpHandler} onMouseLeave={this.onMouseUpHandler} onMouseUp={this.onMouseUpHandler} className="double_button" src={"static/images/buttons/"+hoverpic} />
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
      return <img className="blackjack" src="static/images/buttons/blackjack.png" />

  }
});

var Money = React.createClass ({
  getInitialState: function() {
     return {
       money_sign: this.props.money_sign,
       thous_place:this.props.thous_place,
       hunds_place:this.props.hunds_place,
       tens_place:this.props.tens_place,
       ones_place:this.props.ones_place,
       side:this.props.side,
       total:this.props.total
     };
 },


  render: function() {
    return <div className={this.props.side+"_money"}> <img src={"static/images/numbers/"+this.props.money_sign} /><img src={"static/images/numbers/"+this.props.thous_place} />
    <img src={"static/images/numbers/"+this.props.hunds_place} /><img src={"static/images/numbers/"+this.props.tens_place} />
    <img src={"static/images/numbers/"+this.props.ones_place} />
    </div>
}
})

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

var hit = ReactDOM.render(React.createElement (Hit_Button,{active:true,down:false}),  document.getElementById('hit_button'))

function inject_objects() {
var total_bank = ReactDOM.render(React.createElement (Bank,{bank:'$10000'}),  document.getElementById('total_bank'))
var total_bet = ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$0'}),  document.getElementById('total_bet'))
var total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$0'}),  document.getElementById('total_win'))
var stand_button= ReactDOM.render(React.createElement (Stand_Button),  document.getElementById('stand_button'))
var split_button=ReactDOM.render(React.createElement (Split_Button,{inactive:true}), document.getElementById('split_button'))
var double_button=ReactDOM.render(React.createElement (Double_Button,{inactive:true}), document.getElementById('double_button'))

var dealer_score = ReactDOM.render(React.createElement (Hand_Score,{score:''}),  document.getElementById('dealer_score'))
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
	this.player = new Player("Andrew",10000);
  this.dealer = new Player("Dealer",0);
  this.blackjack = false;
	this.deck = new Deck();
  this.game_over = false;
  this.first_turn = true;

  this.reset_deck = function (numberOfDecks) {
    this.deck = new Deck();
    this.deck.makeNewDeck(numberOfDecks);
    this.deck.shuffleDeck();
  }

  this.show_dealers_cards = function (initial,time) {
    var time = time;
      console.log("showing dealers cards");
      if(initial){
        ReactDOM.unmountComponentAtNode(document.getElementById('dealer_card1'))
        ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:this.dealer.hands[0].cards[0].cardNumber,side:'dealer',handPosition:1}),  document.getElementById('dealer_card1'))
          this.dealer.hands[0].update_score();
          if(this.dealer.hands[0].hand_value === 22) {
              this.dealer.hands[0].cards[0].cardValue = 1;
              this.dealer.hands[0].hand_value -= 10;
              console.log("hand_score"+this.dealer.hands[0].hand_value);
              ReactDOM.unmountComponentAtNode(document.getElementById('dealer_score'))
              ReactDOM.render(React.createElement (Hand_Score,{score:this.dealer.hands[0].hand_value}),  document.getElementById('dealer_score'))
          }

          if(this.dealer.hands[0].hand_value <= 16) {
              console.log("dealer under 16, hitting card");
              setTimeout(function(){
                game1.show_dealers_cards(false,time+475)
              },time)
          }else if(this.dealer.hands[0].hand_value <= 21 && this.dealer.hands[0].hand_value >= 17 ) {
              console.log(this.dealer.hands[0].hand_value);
              this.round_completed();
          }
      }else {
          this.deck.dealCards(1,0,'dealer');
          this.dealer.hands[0].show_card();
          this.dealer.hands[0].update_score();
          if ( this.dealer.hands[0].check_bust() === true ) {
              this.dealer.hands[0].win = 'bust';
          }
          if(this.dealer.hands[0].hand_value <= 16) {
              console.log("dealer under 16, hitting card");
              setTimeout(function(){
                game1.show_dealers_cards(false,time+475)
              },time)
          }else if(this.dealer.hands[0].hand_value <= 21 && this.dealer.hands[0].hand_value >= 17 ) {
              console.log(this.dealer.hands[0].hand_value);
              this.round_completed();
          }else if(this.dealer.hands[0].hand_value > 21) {
                  this.round_completed()
          }else {
            setTimeout(function(){
              game1.show_dealers_cards(false,time+475)
            },time)
          }
      }
  };
  /*Called once at first draw and then when hold button is placed on all hands */
  this.round_completed = function() {
    if(this.first_turn === true) {
        console.log("first turn");
        if (this.player.hands[0].check_blackjack()===true) {
            this.player.hands[0].win = 'blackjack';
            this.blackjack = true;
            ReactDOM.render(React.createElement (Blackjack),  document.getElementById("mid_player_messages"))

        } if(this.dealer.hands[0].check_blackjack()===true) {
          console.log("dealerbj");
          ReactDOM.render(React.createElement (Blackjack),  document.getElementById("mid_dealer_messages"))
          ReactDOM.render(React.createElement (Lose),  document.getElementById("mid_player_messages"))

            this.player.hands[0].win = 'bust';
            this.blackjack = true;

        }if(this.player.hands[0].check_blackjack()===true && this.dealer.hands[0].check_blackjack()===true) {
          console.log("tie");
            this.player.hands[0].win="draw";
            ReactDOM.render(React.createElement (Draw,{visible:'show'}),  document.getElementById("mid_dealer_messages"))
            ReactDOM.render(React.createElement (Draw,{visible:'show'}),  document.getElementById("mid_player_messages"))

            this.blackjack = true;
        }
        this.first_turn = false;
    }else {
          for (var x=0;x<this.player.hands.length;x++) {
              if (this.player.hands[x].hand_value > 21 && this.player.hands[x].cards.length>1) {
                  for(var y=0; y < this.player.hands[x].cards;y++ ) {
                      if (this.player.hands[x].cards[y].cardValue === 11) {
                          this.player.hands[x].cards[y].cardValue = 1;
                          this.player.hands[x].hand_value -= 10;
                      }
                  }
                  ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+'_score'))
                  ReactDOM.render(React.createElement (Hand_Score,{score:this.player.hands[x].hand_value}),  document.getElementById(this.player.hands[x].hand_side+'_score'))
                  if (this.player.hands[x].hand_value > 21 && this.player.hands[x].cards.length>1) {
                      this.player.hands[x].win='bust';
                      ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_player_messages"))
                      this.print_win_loss(this.player.hands[x].bet*-1,this.player.hands[x].hand_side)
                  }
              }else if (this.player.hands[x].hand_value > this.dealer.hands[0].hand_value && this.player.hands[x].cards.length>1) {
                    if (this.player.hands[x].hand_value > 21) {
                        this.player.hands[x].win='bust';
                        ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_player_messages"))
                        this.print_win_loss(this.player.hands[x].bet*-1,this.player.hands[x].hand_side)
                    }else {
                        this.player.hands[x].win='true';
                        ReactDOM.render(React.createElement (Winner,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_player_messages"))
                        this.print_win_loss(this.player.hands[x].bet,this.player.hands[x].hand_side)
                    }
            }else if (this.dealer.hands[0].hand_value > 21) {
                      ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById("mid_dealer_messages"))
                  if (this.player.hands[x].hand_value > 21) {
                      this.player.hands[x].win='bust';
                      ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_player_messages"))
                      this.print_win_loss(this.player.hands[x].bet*-1,this.player.hands[x].hand_side)
                  }else if(this.player.hands[x].cards.length>1) {
                      ReactDOM.render(React.createElement (Winner,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_player_messages"))
                      this.player.hands[x].win='true';
                      this.print_win_loss(this.player.hands[x].bet,this.player.hands[x].hand_side)
                  }
              }else if (this.dealer.hands[0].hand_value === this.player.hands[x].hand_value && this.player.hands[x].cards.length>1 ) {
                      ReactDOM.render(React.createElement (Draw,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_player_messages"))
                      this.player.hands[x].win='draw';
              }else if (this.dealer.hands[0].hand_value > this.player.hands[x].hand_value && this.player.hands[x].cards.length >1) {
                      this.player.hands[x].win='bust'
                      ReactDOM.render(React.createElement (Lose,{visible:'show'}),  document.getElementById(this.player.hands[x].hand_side+"_player_messages"))
                      this.print_win_loss(this.player.hands[x].bet*-1,this.player.hands[x].hand_side)
              }else {
                      this.player.hands[x].win='bust'

              }
          }
    }
    this.calculate_win()
  };
  this.calculate_win = function () {
      ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
      ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
      if (this.blackjack) {
          console.log("blackjack=true");
          switch (this.player.hands[0].win) {
              case 'blackjack':
                  this.player.total_won += (this.player.hands[0].bet * 1.5);
                  this.player.bank += this.player.hands[0].bet + this.player.total_won;
                  var msg = "YOU GOT A BLACKJACK! YOU WON $"+this.player.total_won+"!";
                  console.log(msg);
                  ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
                  ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                  ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
                  ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
                  this.print_win_loss(this.player.hands[0].bet,'mid')
                  this.reset_game(true);
                  break;

              case 'bust':
                  this.player.total_won = 0;
                  this.player.total_won -= (this.player.hands[0].bet);
                  var msg = "DEALER GOT A BLACKJACK. YOU LOSE $"+(this.player.total_won*-1)+"!";
                  console.log(msg);
                  var total_win = ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
                  total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
                  this.print_win_loss(this.player.hands[0].bet*-1,this.player.hands[0].hand_side)
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
                      this.player.total_won += (this.player.hands[x].bet);
                      this.player.bank += this.player.hands[x].bet*2;
                      console.log("total_win"+ this.player.total_won)
                      break;
                  case 'bust':
                      console.log("bust!!");
                      this.player.total_won -= (this.player.hands[x].bet);
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
              ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
              ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
              total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
              bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))

              this.reset_game(true);
          }else {
              var msg = "YOU LOST $"+this.player.total_won*-1+"!";
              console.log(msg);
              ReactDOM.unmountComponentAtNode(document.getElementById('total_win'))
              ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
              total_win = ReactDOM.render(React.createElement (Win,{win_amount:'$'+this.player.total_won}),  document.getElementById('total_win'))
              bank = ReactDOM.render(React.createElement (Bank,{bank:"$"+this.player.bank}),  document.getElementById('total_bank'))
              this.reset_game(false);
          }

      }
  };

  this.print_win_loss = function(total,side) {
      var money, thous, hunds, tens, ones
      if(total > 0) {
          var total = total.toString()
          switch(total.length) {
              case 4:money = "money.png"
              thous = total[0] + ".png"
              hunds = total[1] + ".png"
              tens = total[2] + ".png"
              ones = total[3] + ".png"
              break;
              case 3:money = "blank.png"
              thous = "money.png"
              hunds = total[0] + ".png"
              tens = total[1] + ".png"
              ones = total[2] + ".png"
              break;
              case 2:money = "blank.png"
              thous = "money.png"
              hunds = total[0] + ".png"
              tens = total[1] + ".png"
              ones = "blank.png"
              break;
              case 1:money = "blank.png"
              thous = "money.png"
              hunds = total[0] + ".png"
              tens = "blank.png"
              ones = "blank.png"
              break;
        }
        ReactDOM.render(React.createElement (Money,{money_sign:money,thous_place:thous,hunds_place:hunds,tens_place:tens,ones_place:ones,side:side}),  document.getElementById(side+'_money'))
      }else if(total < 0) {
          var total = total * -1
          total = total.toString()
          switch(total.length) {
              case 4:money = "moneyred.png"
              thous = total[0]+"red.png"
              hunds = total[1]+"red.png"
              tens = total[2]+"red.png"
              ones = total[3]+"red.png"
              break;
              case 3:money = "blank.png"
              thous = "moneyred.png"
              hunds = total[0]+"red.png"
              tens = total[1]+"red.png"
              ones = total[2]+"red.png"
              break;
              case 2:money = "blank.png"
              thous = "moneyred.png"
              hunds = total[0]+"red.png"
              tens = total[1]+"red.png"
              ones = "blank.png"
              break;
              case 1:money = "blank.png"
              thous = "moneyred.png"
              hunds = total[0]+"red.png"
              tens = "blank.png"
              ones = "blank.png"
              break;
          }
      ReactDOM.render(React.createElement (Money,{money_sign:money,thous_place:thous,hunds_place:hunds,tens_place:tens,ones_place:ones,side:side}),  document.getElementById(side+'_money'))
    }else{

    }
  }

    this.unmount_chips = function (side) {
        side.map(function(x){
          console.log(x);
              for(var z=0; z < game1.player.hands[x].chips.length; z++) {
                  ReactDOM.unmountComponentAtNode(document.getElementById(game1.player.hands[x].hand_side+'_chip'+(z+1)));
              }
              game1.player.hands[x].chip_count = 0;
              game1.player.hands[x].chips.length = 0;
              game1.game_over = false;
        })
    }

  this.unmount_cards = function () {
    for(var x=0;x<this.player.hands.length;x++) {
        for(var y=0;y<this.player.hands[x].cards.length;y++){
            ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+"_card"+(y+1)));
            ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+"_money"));
        }
        this.player.hands[x].cards.length=0;
        this.player.hands[x].held = false;
        this.player.hands[x].win=false;
        this.player.hands[x].hand_value = 0;
        this.player.hands[x].cards_shown = 1;
        ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+"_dealer_messages"))
        ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+"_player_messages"))
    }
    for(var a=0; a < this.dealer.hands[0].cards.length; a++) {
        ReactDOM.unmountComponentAtNode(document.getElementById("dealer_card"+(a+1)));
    }
    this.dealer.hands[0].cards.length = 0;
    this.dealer.hands[0].hand_value = 0;
    this.dealer.hands[0].cards_shown = 1;
    ReactDOM.unmountComponentAtNode(document.getElementById("left_bet"))
    ReactDOM.unmountComponentAtNode(document.getElementById("right_bet"))
    ReactDOM.unmountComponentAtNode(document.getElementById("mid_bet"))
    ReactDOM.unmountComponentAtNode(document.getElementById('dealer_score'))
    ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
    ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
    ReactDOM.unmountComponentAtNode(document.getElementById('right_score'))
  }

  this.deal_first_hand = function () {
      this.player.select_hand('mid');
      ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.player.hands[0].bet}),  document.getElementById('mid_bet'))
      this.deck.dealCards(2,0,'dealer');//(numberofCards,hand,dealer/player) hand 0=mid 1=left 2=right
      this.deck.dealCards(2,0,'player');
      this.show_first_hand(0);
      setTimeout(function(){
          game1.player.hands[0].update_score();
          game1.player.hands[0].check_split();
          if(game1.player.hands[0].hand_value === 22) {
              game1.player.hands[0].cards[0].cardValue = 1;
              game1.player.hands[0].hand_value -= 10;
              ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
              ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[0].hand_value}),  document.getElementById('mid_score'))
          }
          game1.player.playing=true;
          game1.first_turn = true;
          switch(true) {
            case (game1.dealer.hands[0].check_blackjack()):
                ReactDOM.unmountComponentAtNode(document.getElementById('dealer_card1'))
                ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:game1.dealer.hands[0].cards[0].cardNumber,side:'dealer',handPosition:1}),  document.getElementById('dealer_card1'))
                game1.dealer.hands[0].update_score();
                game1.round_completed();
                break;
            case (game1.player.hands[0].check_blackjack()):
                ReactDOM.unmountComponentAtNode(document.getElementById('dealer_card1'))
                ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:game1.dealer.hands[0].cards[0].cardNumber,side:'dealer',handPosition:1}),  document.getElementById('dealer_card1'))
                game1.dealer.hands[0].update_score();
                game1.round_completed();
                break;
            default:
                game1.first_turn = false;
                game1.player.hands[0].check_double_down();
          }
          game1.activate_hit_button();
      },2100)
  }

  this.show_first_hand = function(delay) {
      setTimeout(function(){
          game1.player.hands[0].show_card();
      },delay)
      delay += 700
      setTimeout(function(){
          game1.dealer.hands[0].show_card(true);
      },delay)
      delay += 700
      setTimeout(function(){
          game1.player.hands[0].show_card();
      },delay)
      delay += 700
      setTimeout(function(){
          game1.dealer.hands[0].show_card();
      },delay)
  }

  this.check_hold_count = function () {
        var hand_count = 0;
        var held_count = this.player.hands.map(function(x){
        var length = x.cards.length
        if(length !== 0) {
          hand_count++
        }
        var win = x.win
        var held = x.held
        return {
          win: win,
          held: held
        }
      }).filter(function(x){
          return ((x.win === 'bust') || (x.held === true))
      })

      if (held_count.length === hand_count) {
          this.show_dealers_cards(true,500)
      }

  }

  this.activate_hit_button = function () {
      ReactDOM.unmountComponentAtNode(document.getElementById('hit_button'))
      hit = ReactDOM.render(React.createElement (Hit_Button,{active:true,down:false}),  document.getElementById('hit_button'))
  }

  this.reset_game = function(win) {
      this.player.total_won = 0;
      this.player.playing = false;
      this.blackjack = false;
      this.first_turn = true;
      this.player.split_count = 0;
      this.player.total_bet = 0;
      this.activate_hit_button();
      this.player.hands[0].check_double_down();
      for(var x=0;x<this.player.hands.length;x++) {
          game1.player.hands[x].bet = 0;
          ReactDOM.unmountComponentAtNode(document.getElementById(this.player.hands[x].hand_side+"_bet"))
          for(var z = 0; z < this.player.hands[x].chips.length; z++) {
              if(win === true) {
                  document.querySelector("."+this.player.hands[x].hand_side+'_chip'+(z+1)).className = 'mid_chip_win';
              }else {
                  document.querySelector("."+this.player.hands[x].hand_side+'_chip'+(z+1)).className = 'mid_chip_lose';
              }
            //var newchip = ReactDOM.render(React.createElement (Chip_Hand,{visible:'hidden', chipNumber:'5',side:this.player.hands[x].hand_side,position:z+1}),  document.getElementById(this.player.hands[x].hand_side+'_chip'+(z+1)))
          }
      }
      setTimeout(function(){
          game1.unmount_chips([0,1,2]);
      },500);
      this.player.select_hand('none');
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
    this.hand_selected = 0; //0===mid  1===left  2===right
    this.bet_chip_combined = function(chip_amount) {
        var bet = parseInt(chip_amount);
        this.hands[this.hand_selected].bet += bet;
        this.hands[this.hand_selected].chips.push(new Chip(bet))
        var empty_chip_slot = this.hands[this.hand_selected].hand_side+"_chip"+(this.hands[this.hand_selected].chip_count+1);
        var current_position = (this.hands[this.hand_selected].chip_count+1);
        var empty_chip_slot = ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:chip_amount,side:this.hands[this.hand_selected].hand_side,position:current_position}),  document.getElementById(empty_chip_slot))
        this.hands[this.hand_selected].chip_count++;
    }
	  this.bet_chip = function(chip_amount,max) {
        var bet = parseInt(chip_amount);
        if(this.playing===false){
            this.hands.map(function(x){
            ReactDOM.unmountComponentAtNode(document.getElementById(x.hand_side+"_dealer_messages"))
            ReactDOM.unmountComponentAtNode(document.getElementById(x.hand_side+"_player_messages"))
            ReactDOM.unmountComponentAtNode(document.getElementById(x.hand_side+"_money"))

            })
            if (this.hands[this.hand_selected].bet + bet <= max && bet <= this.bank ) {
                this.hands[this.hand_selected].bet += bet;
                this.total_bet +=bet;
                this.bank -= bet;
                ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
                ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+this.total_bet}),  document.getElementById('total_bet'))
                ReactDOM.render(React.createElement (Bank,{bank:"$"+this.bank}),  document.getElementById('total_bank'))
                this.hands[this.hand_selected].chips.push(new Chip(bet))
                var empty_chip_slot = this.hands[this.hand_selected].hand_side+"_chip"+(this.hands[this.hand_selected].chip_count+1);
                var current_position = (this.hands[this.hand_selected].chip_count+1);
                ReactDOM.unmountComponentAtNode(document.getElementById(empty_chip_slot))
                ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:chip_amount,side:this.hands[this.hand_selected].hand_side,position:current_position}),  document.getElementById(empty_chip_slot))
                this.hands[this.hand_selected].chip_count++;
                ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[this.hand_selected].hand_side+'_bet'))
                ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[this.hand_selected].bet}),  document.getElementById(this.hands[this.hand_selected].hand_side+'_bet'))

            }else if(bet > this.bank){
                console.log("Hey! You Are Broke!");
            }else if((this.hands[this.hand_selected].bet + bet > max) && (this.hands[this.hand_selected].bet !== max)) {
                var bet_diff = max - this.hands[this.hand_selected].bet
                this.bet_max(bet_diff)
            }
            if(this.hands[this.hand_selected].chip_count>10){
                this.hands[this.hand_selected].combine_chips();
            }
        }
    };

    this.bet_max = function(diff) {
        if (diff > 0) {
            switch(true) {
                case diff>= 50:
                    diff = diff % 50
                    game1.player.bet_chip(50,500)
                    break;
                case diff>= 25:
                    diff = diff % 25
                    game1.player.bet_chip(25,500)
                    break;
                case diff >= 10:
                    diff = diff % 10
                    game1.player.bet_chip(10,500)
                case diff >= 5:
                    diff = diff % 5
                    game1.player.bet_chip(5,500)
                default:
                    diff -= 1
                    game1.player.bet_chip(1,500)
                    break;
            }
            this.bet_max(diff);
        }

    }




    /*Player may remove chips if the game has not started yet*/
    this.remove_chip = function() {
        if (this.playing === false) {
            var top_chip_slot = this.hands[this.hand_selected].hand_side+"_chip"+(this.hands[this.hand_selected].chip_count);
            if (this.hands[this.hand_selected].chip_count>0) {
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
        if(this.playing === true) {
            this.hands[this.hand_selected].held = true;
            var held = ReactDOM.render(React.createElement (Held,{visible:'show'}),  document.getElementById(game1.player.hands[game1.player.hand_selected].hand_side+"_player_messages"))
            game1.check_hold_count();
        }
    };

  	this.hit_card = function (){
        if(game1.game_over === false) {
            if( game1.deck.cards.length <= 4 ) {
                game1.reset_deck(5);
            }
            if (this.playing) {
                if(this.name === 'dealer') {
                    game1.deck.dealCards(1, 0, 'dealer');
                } else {
                      if ((this.hands[this.hand_selected].held != true) && (this.hands[this.hand_selected].win != 'bust'))  {
                          game1.deck.dealCards(1,this.hand_selected, 'player');
                          game1.player.hands[this.hand_selected].check_split();
                          this.hands[this.hand_selected].show_card();
                          this.hands[this.hand_selected].update_score();
                            //check if the new card busted the hand
                          if ( this.hands[this.hand_selected].check_bust() ) {
                              this.hands[this.hand_selected].win = 'bust';
                              game1.unmount_chips([this.hand_selected]);
                              ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[this.hand_selected].hand_side+"_bet"))
                              //check if all of the player's hands are busted including possible split hands
                              game1.check_hold_count(this.hands[this.hand_selected]);
                          }
                              game1.player.hands[this.hand_selected].check_double_down();
                      }
                      game1.activate_hit_button();
                  }
            }else {
                game1.unmount_cards();
                game1.deal_first_hand();
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
            default:
                this.hand_selected = 0;
                ReactDOM.unmountComponentAtNode(document.getElementById('mid_top'))
                ReactDOM.unmountComponentAtNode(document.getElementById('right_top'))
                ReactDOM.unmountComponentAtNode(document.getElementById('left_top'))
                break;
        }
        this.hands[this.hand_selected].check_double_down();
    }

    this.split_hand = function (side) {
        switch(this.split_count) {
            case 0:
                    if ( this.hands[0].cards[0].face === 'A' && this.hands[0].cards[1].face === 'A') {
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

                      if(this.hands[0].hand_value === 22) {
                          this.hands[0].cards[0].cardValue = 1;
                          this.hands[0].hand_value -= 10;
                          ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
                          ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[0].hand_value}),  document.getElementById('mid_score'))
                      }
                      if(this.hands[1].hand_value === 22) {
                          this.hands[1].cards[0].cardValue = 1;
                          this.hands[1].hand_value -= 10;
                          ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
                          ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[1].hand_value}),  document.getElementById('left_score'))
                      }
                      this.hands[1].bet = this.hands[0].bet;
                      game1.player.total_bet += this.hands[1].bet;
                      game1.player.bank -= this.hands[1].bet
                      ReactDOM.unmountComponentAtNode(document.getElementById('left_bet'))
                      ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[1].bet}),  document.getElementById('left_bet'));
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
                      this.playing === false
                      game1.show_dealers_cards(true,500);
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
                        game1.player.hands[0].check_split();
                        game1.player.hands[1].check_split();
                        if(this.hands[0].cards[0].cardValue === 1){
                            this.hands[0].cards[0].cardValue = 11
                        }
                        if(this.hands[0].hand_value === 22) {
                            this.hands[0].cards[0].cardValue = 1;
                            this.hands[0].hand_value -= 10;
                            ReactDOM.unmountComponentAtNode(document.getElementById('mid_score'))
                            ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[0].hand_value}),  document.getElementById('mid_score'))
                        }
                        if(this.hands[1].hand_value === 22) {
                            this.hands[1].cards[0].cardValue = 1;
                            this.hands[1].hand_value -= 10;
                            ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
                            ReactDOM.render(React.createElement (Hand_Score,{score:this.hands[1].hand_value}),  document.getElementById('left_score'))
                        }
                        this.hands[1].bet = this.hands[0].bet;
                        game1.player.total_bet += this.hands[1].bet;
                        game1.player.bank -= this.hands[1].bet
                        ReactDOM.unmountComponentAtNode(document.getElementById('left_bet'))
                        ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[1].bet}),  document.getElementById('left_bet'));
                        this.hands[1].chip_count =0;
                        for (var z=0;z<this.hands[0].chips.length;z++) {
                            ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[0].chips[z].chip_value,side:'left',position:z+1}),  document.getElementById("left_chip"+(z+1)));
                            ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[0].chips[z].chip_value,side:'left',position:z+1}),  document.getElementById("left_chip"+(z+1)));
                            this.hands[1].chips.push(this.hands[0].chips[z]);
                            this.hands[1].chip_count++;
                        };
                        ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
                        ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                        ReactDOM.unmountComponentAtNode(document.getElementById('left_score'))
                        ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                        ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
                        ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[1].hand_value}),  document.getElementById('left_score'))
                        this.split_count++;
                    }
                    break;
          case 1:
              if(this.hands[side].cards.length === 2) {
                  if (this.hands[side].cards[0].face === 'A' && this.hands[side].cards[1].face === 'A') {
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
                      if(this.hands[2].hand_value === 22) {
                          this.hands[2].cards[0].cardValue = 1;
                          this.hands[2].hand_value -= 10;
                          ReactDOM.unmountComponentAtNode(document.getElementById('right_score'))
                          ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[2].hand_value}),  document.getElementById('right_score'))
                      }
                      if(this.hands[side].hand_value === 22) {
                          this.hands[side].cards[0].cardValue = 1;
                          this.hands[side].hand_value -= 10;
                          ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[side].hand_side+'_score'))
                          ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[side].hand_value}),  document.getElementById(this.hands[side].hand_side+'_score'))
                      }
                      this.hands[2].bet = this.hands[side].bet;
                      game1.player.total_bet += this.hands[2].bet;
                      game1.player.bank -= this.hands[2].bet
                      ReactDOM.unmountComponentAtNode(document.getElementById('right_bet'))
                      ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[2].bet}),  document.getElementById('right_bet'));
                      this.hands[2].chip_count =0;
                      for (var z = 0; z < this.hands[side].chips.length; z++) {
                          ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[side].chips[z].chip_value,side:'right',position:z+1}),  document.getElementById("right_chip"+(z+1)));
                          this.hands[2].chips.push(this.hands[side].chips[z]);
                            this.hands[2].chip_count++;
                      };
                      ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
                      ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                      ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                      ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
                      ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                      ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
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
                          if(this.hands[side].cards[0].cardValue === 1){
                              this.hands[side].cards[0].cardValue = 11
                          }
                          if(this.hands[2].hand_value === 22) {
                              this.hands[2].cards[0].cardValue = 1;
                              this.hands[2].hand_value -= 10;
                              ReactDOM.unmountComponentAtNode(document.getElementById('right_score'))
                              ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[2].hand_value}),  document.getElementById('right_score'))
                          }
                          if(this.hands[side].hand_value === 22) {
                              this.hands[side].cards[0].cardValue = 1;
                              this.hands[side].hand_value -= 10;
                              ReactDOM.unmountComponentAtNode(document.getElementById(this.hands[side].hand_side+'_score'))
                              ReactDOM.render(React.createElement (Hand_Score,{score:game1.player.hands[side].hand_value}),  document.getElementById(this.hands[side].hand_side+'_score'))
                          }
                          this.hands[2].bet = this.hands[side].bet;
                          game1.player.total_bet += this.hands[2].bet;
                          game1.player.bank -= this.hands[2].bet
                          ReactDOM.unmountComponentAtNode(document.getElementById('right_bet'))
                          ReactDOM.render(React.createElement (Hand_Bet,{bet:'$'+this.hands[2].bet}),  document.getElementById('right_bet'));

                          this.hands[2].chip_count =0;
                          for (var z = 0; z < this.hands[side].chips.length; z++) {
                              ReactDOM.render(React.createElement (Chip_Hand,{chipNumber:this.hands[side].chips[z].chip_value,side:'right',position:z+1}),  document.getElementById("right_chip"+(z+1)));
                              this.hands[2].chips.push(this.hands[side].chips[z]);
                              this.hands[2].chip_count++;
                          }
                          ReactDOM.unmountComponentAtNode(document.getElementById('total_bet'))
                          ReactDOM.unmountComponentAtNode(document.getElementById('total_bank'))
                          ReactDOM.render(React.createElement (Bet_Total,{total_bet:'$'+game1.player.total_bet}),  document.getElementById('total_bet'))
                          ReactDOM.render(React.createElement (Bank,{bank:"$"+game1.player.bank}),  document.getElementById('total_bank'))
                          ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                          ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
                      }
                  }
              }
              break;
        }
    }

    this.double_down = function(side) {
        if(this.hands[side].bet <= this.bank) {
            this.playing = false;
            this.hands[side].chips.map(function(x){
                game1.player.bet_chip(x.chip_value,1001)
            })
            this.playing = true;
        this.hit_card();
        this.hold_hand();
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
    this.combined_chips = []
    this.held = false;

    this.show_card = function ( first_turn ) {
        if (first_turn) {
            ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:53,side:'dealer',handPosition:1}),  document.getElementById('dealer_card1'))
            this.cards_shown ++;
        }else {
            ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:this.cards[this.cards_shown-1].cardNumber,side:this.hand_side,handPosition:this.cards_shown}),  document.getElementById(this.hand_side+"_card"+this.cards_shown))
            this.cards_shown ++;
            }
        }

    this.check_blackjack = function () {
        var total_value = 0;
        for ( var x = 0;  x < this.cards.length;  x++) {
            total_value += this.cards[x].cardValue;
        }
        if (  total_value === 21 ) {
            return true;
        }
    }

    this.check_split = function () {
        var hand_count = game1.player.hands.map(function(x){
            return x
        }).filter(function(x){
            return x.cards.length > 0
        })
        switch(hand_count.length) {
            case 1:
                if ((hand_count[0].cards[0].face === hand_count[0].cards[1].face) && (hand_count[0].cards.length === 2)) {
                    ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                    ReactDOM.render(React.createElement (Split_Button,{inactive:false}),  document.getElementById('split_button'))
                }else {
                    ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                    ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
                }
                break;
            case 2:
                if (hand_count[0].cards[0].face === hand_count[0].cards[1].face && hand_count[0].cards.length === 2) {
                    ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                    ReactDOM.render(React.createElement (Split_Button,{inactive:false}),  document.getElementById('split_button'))
                }else if (hand_count[1].cards[0].face === hand_count[1].cards[1].face && hand_count[1].cards.length === 2){
                    ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                    ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
                }else {
                    ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                    ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))
                }
                break;
            case 3:
                    ReactDOM.unmountComponentAtNode(document.getElementById('split_button'))
                    ReactDOM.render(React.createElement (Split_Button,{inactive:true}),  document.getElementById('split_button'))

        }
    }

    this.check_double_down = function () {
        if((this.cards.length === 2) && (game1.player.playing === true)){
            ReactDOM.unmountComponentAtNode(document.getElementById('double_button'))
            ReactDOM.render(React.createElement (Double_Button,{inactive:false}),  document.getElementById('double_button'))
        }else {
            ReactDOM.unmountComponentAtNode(document.getElementById('double_button'))
             ReactDOM.render(React.createElement (Double_Button,{inactive:true}),  document.getElementById('double_button'))
        }
    }
    this.combine_chips = function () {
        var total = this.bet
        var chip_list = [100,50,25,10,5,1]
        chip_list.map(function(x){
            var number_of_chips = Math.floor(total/x)
            game1.player.hands[game1.player.hand_selected].combined_chips.push({
            chip_value:x,
            chip_count:number_of_chips
            })
        total -= number_of_chips * x
        })
        game1.unmount_chips([game1.player.hand_selected]);
        this.bet = 0;
        game1.player.hands[game1.player.hand_selected].combined_chips.map(function(x){
            for( var y = 0; y < x.chip_count; y++ ) {

                game1.player.bet_chip_combined(x.chip_value)
            }
        })
        game1.player.hands[game1.player.hand_selected].combined_chips.length = 0;
    }



    this.update_score = function () {
        this.hand_value = 0;
        var tempscore = 0;
        for (var x=0;x<this.cards.length;x++) {
            this.hand_value += this.cards[x].cardValue;
        }
        ReactDOM.unmountComponentAtNode(document.getElementById(this.hand_side+'_score'))
        ReactDOM.render(React.createElement (Hand_Score,{score:this.hand_value}),  document.getElementById(this.hand_side+'_score'))

    }

    this.check_bust = function() {
        if(this.hand_value > 21) {
            for( var x= 0; x < this.cards.length; x++ ) {
                if (this.cards[x].cardValue === 11) {
                    this.cards[x].cardValue === 1;
                    this.hand_value -= 10;
                    if (this.hand_value <= 21) {
                        break;
                    }
                }
            }
            ReactDOM.unmountComponentAtNode(document.getElementById(this.hand_side+'_score'))
            ReactDOM.render(React.createElement (Hand_Score,{score:this.hand_value}),  document.getElementById(this.hand_side+'_score'))
        }
        if(this.hand_value > 21) {
            if(this.hand_side === 'dealer'){
                ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById("mid_dealer_messages"))
            }else {
                ReactDOM.render(React.createElement (Busted,{visible:'show'}),  document.getElementById(this.hand_side+"_player_messages"))

            }
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

function CustomAlert(){
    this.render = function(dialog,title){
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.visibility = "visible";
        dialogbox.style.visibility = "visible";
        document.getElementById('dialogboxhead').innerHTML = title;
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button id="close_alert">OK</button>';
        document.getElementById('close_alert').addEventListener('click',function(){
            Alert.ok();
        })
    }
  	this.ok = function(){
  		  document.getElementById('dialogbox').style.visibility = "hidden";
  		  document.getElementById('dialogoverlay').style.visibility = "hidden";
    }
}
var Alert = new CustomAlert();
function keyDown(e) {
    switch(e.keyCode) {
        case 32:
            if (game1.player.hands[0].bet > 0){
                 Hit_Button.MouseDownHandler();
            }else {
                 Alert.render('You need to place a bet before starting the round.','Place A Bet!')
            }

            break;
        case 49:
            if(game1.player.playing){
                Alert.render('You may only bet at the beginning of the round!',"Betting Not Allowed!")
            }else{
              game1.player.bet_chip(1,500);
            }
            break;
        case 50:
            if(game1.player.playing){
                Alert.render('You may only bet at the beginning of the round!',"Betting Not Allowed!")
            }else{
              game1.player.bet_chip(5,500);
            }
            break;
        case 51:
            if(game1.player.playing){
                Alert.render('You may only bet at the beginning of the round!',"Betting Not Allowed!")
            }else{
              game1.player.bet_chip(10,500);
            }
            break;
        case 52:
            if(game1.player.playing){
                Alert.render('You may only bet at the beginning of the round!',"Betting Not Allowed!")
            }else{
              game1.player.bet_chip(25,500);
            }
            break;
        case 53:
            if(game1.player.playing){
                Alert.render('You may only bet at the beginning of the round!',"Betting Not Allowed!")
            }else{
              game1.player.bet_chip(50,500);
            }
            break;
        case 54:
            if(game1.player.playing){
                Alert.render('You may only bet at the beginning of the round!',"Betting Not Allowed!")
            }else{
                game1.player.bet_chip(100,500);
            }
            break;
        case 13:
            if(document.getElementById('dialogbox').style.visibility === "visible") {
                Alert.ok();
            }
            break;
        case 55:
        ReactDOM.unmountComponentAtNode(document.getElementById(this.hand_side+"_card"+this.cards_shown))
        ReactDOM.render(React.createElement (Card,{visible:'show',cardNumber:this.cards[this.cards_shown-1].cardNumber,side:this.hand_side,handPosition:this.cards_shown}),  document.getElementById(this.hand_side+"_card"+this.cards_shown))
        this.cards_shown ++;


    }
}

function main() {
    inject_objects();
    game1.reset_deck(5);
    game1.dealer.hands.push(new Hand('dealer'));
    game1.player.hands.push(new Hand('mid'),new Hand('left'),new Hand('right'));
}
var game1 = new Game();
main();
window.addEventListener("keydown", keyDown, true);
