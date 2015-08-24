/**
 * Created by lukeluke on 6/4/15.
 */

(function($){
<<<<<<< HEAD
   $.fn.renderEditForm = function(players){
      var output = '';
      var playerArray = players.slice();
      if(playerArray.length == 0){
         playerArray.push({'id':1,'name':'','toughness':'0/0','parry':0});
      } else {
         playerArray.push({'id':players.length+1,'name':'','toughness':'0/0','parry':0});
      }
      $.each(playerArray,function(i,v){
         output += '<div class="player-input col-md-4 well player" data-id="'+ v.id+'">';
            if(v.name != ''){
               output += '<div class="col-sm-12"><button class="btn btn-danger player-remove pull-right btn-sm"><i class="fa fa-remove"></i></button></div>';
            }
            output += '<div class="form-group"><label for="player-input-'+v.id+'">Player Name</label>';
               output += '<input type="text" class="form-control player-input" id="player-input-'+v.id+'" name="playerList[][name]" value="'+v.name+'"/>';
               output += '<input type="hidden" class="form-control player-input" id="player-id-'+v.id+'" name="playerList[][id]" value="'+v.id+'"/>'
            output += '</div>';
            output += '<div class="form-group"><label for="toughness-input-'+v.id+'">Toughness</label>';
               output += '<input type="text" class="form-control player-input" id="toughness-input-'+v.id+'" name="playerList[][toughness]" value="'+v.toughness+'"/>';
            output += '</div>';
            output += '<div class="form-group"><label for="parry-input-'+v.id+'">Parry</label>';
               output += '<input type="text" class="form-control player-input" id="parry-input-'+v.id+'" name="playerList[][parry]" value="'+v.parry+'"/>';
            output += '</div>';
            output += '<div class="checkbox"><label>';
               var checked = v.quick == 1 ? 'checked' : '';
               output += '<input type="checkbox" id="quick-input-'+v.id+'" name="playerList[][quick]" value="1" '+checked+'/>Quick';
            output += '</label></div>';
         output += '</div>';
=======
   $.fn.renderEditForm = function(players,type){
      var typeName = type == 1 ? 'Player' : 'NPC';
      var output = '';
      var playerArray = players.slice();
      if(playerArray.length == 0){
         playerArray.push({'id':1,'name':'','toughness':'0/0','parry':0,'type':type});
      } else {
         playerArray.push({'id':players.length+1,'name':'','toughness':'0/0','parry':0,'type':type});
      }
      $.each(playerArray,function(i,v){
         if(v.type == type){
            output += '<div class="player-input col-md-4 well player" data-id="'+ v.id+'">';
               if(v.name != ''){
                  output += '<div class="col-sm-12"><button class="btn btn-danger player-remove pull-right btn-sm"><i class="fa fa-remove"></i></button></div>';
               }
               output += '<div class="form-group"><label for="player-input-'+v.id+'">'+typeName+' Name</label>';
                  output += '<input type="text" class="form-control player-input" id="player-input-'+v.id+'" name="playerList[][name]" value="'+v.name+'"/>';
                  output += '<input type="hidden" class="form-control player-input" id="player-id-'+v.id+'" name="playerList[][id]" value="'+v.id+'"/>'
               output += '</div>';
               output += '<div class="form-group"><label for="toughness-input-'+v.id+'">Toughness</label>';
                  output += '<input type="text" class="form-control player-input" id="toughness-input-'+v.id+'" name="playerList[][toughness]" value="'+v.toughness+'"/>';
               output += '</div>';
               output += '<div class="form-group"><label for="parry-input-'+v.id+'">Parry</label>';
                  output += '<input type="text" class="form-control player-input" id="parry-input-'+v.id+'" name="playerList[][parry]" value="'+v.parry+'"/>';
               output += '</div>';
               output += '<div class="checkbox"><label>';
                  var checked = v.quick == 1 ? 'checked' : '';
                  output += '<input type="checkbox" id="quick-input-'+v.id+'" name="playerList[][quick]" value="1" '+checked+'/>Quick';
               output += '</label></div>';
               output += '<input type="hidden" class="form-control player-input" id="type-input-'+v.id+'" name="playerList[][type]" value="'+type+'"/>';
            output += '</div>';
         }
>>>>>>> master
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
<<<<<<< HEAD
         output += '<div class="player col-md-4 well '+ v.shaken+' '+woundOutput+'" data-id="'+ v.id+'">';
         output += '<div class="row"><div class="col-sm-12"><button class="btn btn-danger player-remove pull-right btn-sm"><i class="fa fa-remove"></i></button></div></div>';
         output += '<div class="row"><div class="col-sm-8"><h4>'+v.card+': '+v.name+'</h4></div><div class="col-sm-4">';
=======
         var joker = v.card < 3 ? '(joker)' : '';
         var jokerTitle = v.card < 3 ? 'joker-title' : '';
         output += '<div class="player col-md-4 well '+ v.shaken+' '+woundOutput+'" data-id="'+ v.id+'">';
         output += '<div class="row"><div class="col-sm-12"><button class="btn btn-danger player-remove pull-right btn-sm"><i class="fa fa-remove"></i></button></div></div>';
         output += '<div class="row"><div class="col-sm-8"><h4 class="'+jokerTitle+'">'+v.card+': '+v.name+' '+joker+'</h4></div><div class="col-sm-4">';
>>>>>>> master
         if(v.quick == 1 && v.card > 34){
            output += '<button type="button" class="btn btn-info btn-sm discard"><i class="fa fa-repeat"></i> Discard</button>';
         }
         output += '</div></div><div class="row">';
         output += '<div class="col-sm-4"><dl><dt>Toughness:</dt><dd>'+ v.toughness+'</dd></dl></div>';
         output += '<div class="col-sm-4"><dl><dt>Parry:</dt><dd>'+ v.parry+'</dd></dl></div>';
         output += '<div class="col-sm-4"><button type="button" class="btn btn-warning btn-sm pull-right player-shaken '+shakenActive+'" data-toggle="button" aria-pressed="false" autocomplete="off"><i class="fa fa-heartbeat"></i> Shaken</button></div>';
         output += '</div><div class="row">';
         output += '<button type="button" class="btn btn-danger player-wound1 '+wound1Active+'" data-toggle="button" aria-pressed="false" autocomplete="off">Wound 1</button>';
         output += '<button type="button" class="btn btn-danger player-wound2 '+wound2Active+'" data-toggle="button" aria-pressed="false" autocomplete="off">Wound 2</button>';
         output += '<button type="button" class="btn btn-danger player-wound3 '+wound3Active+'" data-toggle="button" aria-pressed="false" autocomplete="off">Wound 3</button>';
         output += '</div></div></div>';
      });
      this.html(output);
      return this;
   };
})(jQuery);

$(function(){

   function Deck(){
      //Init functions
      this.cards = [];
      for (i = 1; i <= 54; i++) {
         this.cards.push(i);
      }

      this.deal = function(){
         //IF Quickness were not a choice
         /*if(quickness == 1){
            var card = 54;
            while(card > 34){
               var key = Math.floor(Math.random() * this.cards.length);
               card = this.cards[key];
               console.log(card+' '+key);
            }
         } else {
            var key = Math.floor(Math.random() * this.cards.length);
            var card = this.cards[key];
         }*/
         var key = Math.floor(Math.random() * this.cards.length);
         var card = this.cards[key];
         this.cards.splice(key,1);
         return card;
      }

      this.dealtCards = function(dealt){
         this.cards = dealt;
      }
   }

<<<<<<< HEAD
   function Player(id,name,toughness,parry,quick,shaken,wound1,wound2,wound3){
=======
   function Player(id,name,toughness,parry,quick,shaken,wound1,wound2,wound3,type){
>>>>>>> master
      this.id = id;
      this.name = name;
      this.toughness = toughness;
      this.parry = parry;
      this.quick = quick;
      this.shaken = shaken;
      this.wound1 = wound1;
      this.wound2 = wound2;
      this.wound3 = wound3;
<<<<<<< HEAD
=======
      this.type = type;
>>>>>>> master
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
<<<<<<< HEAD
         players.push(new Player(v.id, v.name, v.toughness, v.parry, v.quick, v.shaken, v.wound1, v.wound2, v.wound3));
      });
   }

   $('#player-list').renderEditForm(players);

   $('#remove-players').click(function(){
      Cookies.remove('players');
   });

=======
         players.push(new Player(v.id, v.name, v.toughness, v.parry, v.quick, v.shaken, v.wound1, v.wound2, v.wound3,v.type));
      });
   }

   $('#player-list').renderEditForm(players,1);
   $('#npc-list').renderEditForm(players,2);

   /*$('#remove-players').click(function(){
      Cookies.remove('players');
   });*/
>>>>>>> master

   $('#player-form').submit(function(e){
      e.preventDefault();
      var playersViaForm = $(this).serializeJSON();
<<<<<<< HEAD
=======
      var npcsViaForm = $('#npc-form').serializeJSON();
>>>>>>> master
      players = [];
      console.log(playersViaForm);
      jQuery.each(playersViaForm.playerList, function(i,player){
         if(player.name.length !== 0){
<<<<<<< HEAD
            players.push(new Player(player.id,player.name,player.toughness,player.parry,player.quick,player.shaken,player.wound1,player.wound2,player.wound3));
         }
      });
      Cookies.set('players',players);
      $('#player-list').renderEditForm(players);
=======
            players.push(new Player(player.id,player.name,player.toughness,player.parry,player.quick,player.shaken,player.wound1,player.wound2,player.wound3,player.type));
         }
      });
      jQuery.each(npcsViaForm.playerList, function(i,player){
         if(player.name.length !== 0){
            players.push(new Player(player.id,player.name,player.toughness,player.parry,player.quick,player.shaken,player.wound1,player.wound2,player.wound3,player.type));
         }
      });
      Cookies.set('players',players);
      $('#player-list').renderEditForm(players,1);
>>>>>>> master
   });

   $('#add-player').click(function(e){
      e.preventDefault();
      $('#player-form').submit();
<<<<<<< HEAD
      $('#player-list').renderEditForm(players);
=======
      $('#player-list').renderEditForm(players,1);
   });

   $('#npc-form').submit(function(e){
      e.preventDefault();
      var playersViaForm = $('#player-form').serializeJSON();
      var npcsViaForm = $(this).serializeJSON();
      players = [];
      console.log(playersViaForm);
      jQuery.each(playersViaForm.playerList, function(i,player){
         if(player.name.length !== 0){
            players.push(new Player(player.id,player.name,player.toughness,player.parry,player.quick,player.shaken,player.wound1,player.wound2,player.wound3,player.type));
         }
      });
      jQuery.each(npcsViaForm.playerList, function(i,player){
         if(player.name.length !== 0){
            players.push(new Player(player.id,player.name,player.toughness,player.parry,player.quick,player.shaken,player.wound1,player.wound2,player.wound3,player.type));
         }
      });
      Cookies.set('players',players);
      $('#npc-list').renderEditForm(players,2);
   });

   $('#add-npc').click(function(e){
      e.preventDefault();
      $('#npc-form').submit();
      $('#npc-list').renderEditForm(players,2);
>>>>>>> master
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
         if(left < players.length){
            $('#dealt-card-output').html('You need to reshuffle');
         } else {
            $('#dealt-card-output').html('Only '+left+' cards left.');
         }
         Cookies.set('deck',deck);
      }
   });

<<<<<<< HEAD
   $('#resuffle').click(function(e){
=======
   $('#reshuffle').click(function(e){
>>>>>>> master
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

   //Discard for quickness characters
   //What happens when a player discards the last card???
   //How to reshuffle but keep current initiative
   $('body').on('click','.discard',function(){
      //Need to get a better search function
      var playerID = $(this).parents('.player').data('id');
      var playerKey = '';
      $.each(players,function(i,v){
         if(v.id == playerID){
            playerKey = i;
         }
      });
      var left = deck.cards.length;
      if(left < 1){
         $('#dealt-card-output').html('You need to reshuffle');
      } else {
         players[playerKey].setCard(deck.deal());
         left = deck.cards.length;
         Cookies.set('deck',deck);
         players.sort(sortInitiative);
         $('#initiative-render').renderCharacters(players);
         $('#dealt-card-output').html('Only '+left+' cards left.');
      }
   });

   //Remove
   $('body').on('click','.player-remove',function(){
      //Need to get a better search function
      var playerID = $(this).parents('.player').data('id');
      var playerKey = '';
<<<<<<< HEAD
      $.each(players,function(i,v){
         if(v.id == playerID){
            playerKey = i;
=======
      var playerType = '';
      $.each(players,function(i,v){
         if(v.id == playerID){
            playerKey = i;
            playerType = v.type;
>>>>>>> master
         }
      });
      players.splice(playerKey,1);
      Cookies.set('players',players);
      $('#initiative-render').renderCharacters(players);
<<<<<<< HEAD
      $('#player-list').renderEditForm(players);
=======
      $('#player-list').renderEditForm(players,1);
      $('#npc-list').renderEditForm(players,2);
>>>>>>> master
   });

   console.log(players);

});