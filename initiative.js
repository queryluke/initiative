/**
 * Created by lukeluke on 6/4/15.
 */

(function($){
   $.fn.renderEditForm = function(players){
      var output = '';
      var playerArray = players.slice();
      if(playerArray.length == 0){
         playerArray.push({'id':1,'name':''});
      } else {
         playerArray.push({'id':players.length+1,'name':''});
      }
      $.each(playerArray,function(i,v){
         output += '<div class="player-input col-md-4"><div class="form-group"><label for="player-input-'+v.id+'">Player Name</label>';
         output += '<input type="text" class="form-control player-input" id="player-input-'+v.id+'" name="playerList[][name]" value="'+v.name+'"/>';
         output += '<input type="hidden" class="form-control player-input" id="player-id-'+v.id+'" name="playerList[][id]" value="'+v.id+'"/>'
         output += '</div></div>';
      });
      this.html(output);
      return this;
   };

   $.fn.renderCharacters = function(players){
      var output = '';
      $.each(players,function(i,v){
         var shakenActive = v.shaken == 'shaken' ? 'active' : '';
         var wound1Active = v.wound1 == 'wound1' ? 'active' : '';
         var wound2Active = v.wound2 == 'wound2' ? 'active' : '';
         var wound3Active = v.wound3 == 'wound3' ? 'active' : '';
         var wounds = wound3Active.length + wound2Active.length + wound1Active.length;
         var woundOutput = '';
         if(wounds == 18 ){
            var woundOutput = 'wound3';
         }
         if(wounds == 12 ){
            var woundOutput = 'wound2';
         }
         if(wounds == 6 ){
            var woundOutput = 'wound1';
         }
         output += '<div class="player col-md-4 well '+ v.shaken+' '+woundOutput+'" data-id="'+ v.id+'"><h4>'+v.card+': '+v.name+'</h4>';
         output += '<button type="button" class="btn btn-warning player-shaken '+shakenActive+'" data-toggle="button" aria-pressed="false" autocomplete="off">Shaken</button>';
         output += '<button type="button" class="btn btn-danger player-wound1 '+wound1Active+'" data-toggle="button" aria-pressed="false" autocomplete="off">Wound 1</button>';
         output += '<button type="button" class="btn btn-danger player-wound2 '+wound2Active+'" data-toggle="button" aria-pressed="false" autocomplete="off">Wound 2</button>';
         output += '<button type="button" class="btn btn-danger player-wound3 '+wound3Active+'" data-toggle="button" aria-pressed="false" autocomplete="off">Wound 3</button>';
         output += '</div></div>';
      });
      this.html(output);
      return this;
   };
})(jQuery);

$(function(){

   function Deck(){
      //Init functions
      this.cards = [];
      for (i = 1; i < 55; i++) {
         this.cards.push(i);
      }

      this.deal = function(){
         var key = Math.floor(Math.random() * this.cards.length);
         var card = this.cards[key];
         this.cards.splice(key,1);
         return card;
      }

      this.dealtCards = function(dealt){
         this.cards = dealt;
      }
   }

   function Player(id,name,shaken,wound1,wound2,wound3){
      this.id = id;
      this.name = name;
      this.shaken = shaken;
      this.wound1 = wound1;
      this.wound2 = wound2;
      this.wound3 = wound3;
      this.setCard = function(card){
         this.card = card;
      }
      this.setShaken = function(){
         this.shaken = 'shaken';
      }
      this.removeShaken = function(){
         this.shaken = '';
      }
      this.setWound1 = function(){
         this.wound1 = 'wound1';
      }
      this.removeWound1 = function(){
         this.wound1 = '';
      }
      this.setWound2 = function(){
         this.wound2 = 'wound2';
      }
      this.removeWound2 = function(){
         this.wound2 = '';
      }
      this.setWound3 = function(){
         this.wound3 = 'wound3';
      }
      this.removeWound3 = function(){
         this.wound3 = '';
      }
   }

   function sortInitiative(a,b){
      if (a.card > b.card) {
         return 1;
      }
      if (a.card < b.card) {
         return -1;
      }
      return 0;
   }

   /*Array.prototype.searchForPlayer = function(searchFor, property) {
      var retVal = -1;
      var self = this;
      for(var index=0; index < self.length; index++){
         var item = self[index];
         if (item.hasOwnProperty(property)) {
            if (item.property === searchFor) {
               retVal = index;
               return retVal;
            }
         }
      };
      return retVal;
   };*/

   Cookies.json = true;

   var deck = new Deck();

   if($.isEmptyObject(Cookies.get('deck')) == false){
      var dealtCards = Cookies.get('deck');
      deck.dealtCards(dealtCards.cards);
   }

   var players = [];

   if($.isEmptyObject(Cookies.get('players')) == false){
      jQuery.each(Cookies.get('players'),function(i,v){
         players.push(new Player(v.id, v.name, v.shaken, v.wound1, v.wound2, v.wound3));
      });
   }

   $('#player-list').renderEditForm(players);

   $('#remove-players').click(function(){
      Cookies.remove('players');
   });


   $('#player-form').submit(function(e){
      e.preventDefault();
      var playersViaForm = $(this).serializeJSON();
      players = [];
      jQuery.each(playersViaForm.playerList, function(i,player){
         if(player.name.length !== 0){
            players.push(new Player(player.id,player.name,player.shaken,player.wound1,player.wound2,player.wound3));
         }
      });
      $('#player-list').renderEditForm(players);
      Cookies.set('players',players);
   });


   $('#deal-cards').click(function(){
      if(deck.cards.length < players.length){
         $('#dealt-card-output').html('You need to reshuffle');
      } else {
         $.each(players,function(index,val) {
            val.setCard(deck.deal());
         });
         players.sort(sortInitiative);
         var output = '';
         $('#initiative-render').renderCharacters(players);
         var left = deck.cards.length;
         if(left < 1){
            $('#dealt-card-output').html('You need to reshuffle');
         } else {
            $('#dealt-card-output').html('Only '+left+' cards left.');
         }
         Cookies.set('deck',deck);
      }
   });

   $('#resuffle').click(function(e){
      e.preventDefault();
      var deck = new Deck();
      Cookies.set('deck',deck);
      window.location.reload();
   });

   //Player wounds and shaken statuses
      //SHAKEN
   $('body').on('click','.player-shaken',function(){
      //Need to get a better search function
      var playerID = $(this).parents('.player').data('id');
      var playerKey = '';
      $.each(players,function(i,v){
         if(v.id == playerID){
            playerKey = i;
         }
      });
      if($(this).hasClass('active')){
         players[playerKey].removeShaken();
      } else {
         players[playerKey].setShaken();
      }
      Cookies.set('players',players);
      $('#initiative-render').renderCharacters(players);
   });
      //WOUND 1
   $('body').on('click','.player-wound1',function(){
      //Need to get a better search function
      var playerID = $(this).parents('.player').data('id');
      var playerKey = '';
      $.each(players,function(i,v){
         if(v.id == playerID){
            playerKey = i;
         }
      });
      if($(this).hasClass('active')){
         players[playerKey].removeWound1();
      } else {
         players[playerKey].setWound1();
      }
      Cookies.set('players',players);
      $('#initiative-render').renderCharacters(players);
   });
      //WOUND 2
   $('body').on('click','.player-wound2',function(){
      //Need to get a better search function
      var playerID = $(this).parents('.player').data('id');
      var playerKey = '';
      $.each(players,function(i,v){
         if(v.id == playerID){
            playerKey = i;
         }
      });
      if($(this).hasClass('active')){
         players[playerKey].removeWound2();
      } else {
         players[playerKey].setWound2();
      }
      Cookies.set('players',players);
      $('#initiative-render').renderCharacters(players);
   });
      //WOUND 3
   $('body').on('click','.player-wound3',function(){
      //Need to get a better search function
      var playerID = $(this).parents('.player').data('id');
      var playerKey = '';
      $.each(players,function(i,v){
         if(v.id == playerID){
            playerKey = i;
         }
      });
      if($(this).hasClass('active')){
         players[playerKey].removeWound3();
      } else {
         players[playerKey].setWound3();
      }
      Cookies.set('players',players);
      $('#initiative-render').renderCharacters(players);
   });
   console.log(players);

});