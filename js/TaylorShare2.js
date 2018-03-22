(function(){

  var chat = {
    messageToSend: '',
    index: 0,
    data: new Object(),
    messageResponses: [
      'Great to meet you ',
      'I’ll be working with you today to help generate a profile and walk you through some of the available services. Are you ready to get started?',
      'Now, I’ll be walking you through some of things I can help you with, and asking you some questions so that I know how to help you better.',
      'Let’s start with some things that interest you. How do you like to spend your free time? What are your hobbies?',
      'I can help with all sorts of home entertainment. What do you like to do for fun?',
      'I’m adaptable to your personality. What 3 words do you think best describe you?',
      'I want to make sure I don’t annoy you. Tell me something your best friend does that annoys you, so that I make sure I don’t do the same thing.',
      'One of my unique features is to help you manage stress throughout your day. Tell me about a stressful situation you encountered in the recent past.',
      'I’m here to help the whole family. Do you live with a partner?',
      'I can help with domestic disputes. How often do you argue with your partner?',
      'One last thing. If you’re here from Mechanical Turk, what is your ID#.',
      'Thank you for interacting with me and making me smarter. Please click the following link to go back to the survey:'
    ],
    init: function() {
      this.cacheDOM();
      this.bindEvents();
      this.render();
      $('.message-data-time').replaceWith( this.getCurrentTime() + ", Today" );
      this.data.convos = [];
      this.data.botType = "TaylorShare2";
      var options = { weekday: "long", year: "numeric", month: "short",
        day: "numeric" };
      this.data.date = new Date().toLocaleTimeString("en-US", options);;
    },
    cacheDOM: function() {
      this.$chatHistory = $('.chat-history');
      this.$button = $('button');
      this.$textarea = $('#message-to-send');
      this.$chatHistoryList =  this.$chatHistory.find('ul');
    },
    bindEvents: function() {
      this.$button.on('click', this.addMessage.bind(this));
      this.$textarea.on('keyup', this.addMessageEnter.bind(this));
    },
    render: function() {

      this.scrollToBottom();
      //if we get a message
      if (this.messageToSend.trim() !== '') {
        var template = Handlebars.compile( $("#message-template").html());
        var context = {
          messageOutput: this.messageToSend,
          time: this.getCurrentTime()
        };

        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
        this.$textarea.val('');

        // responses
        switch (this.index) {
          //how are you doing -> spend free time
          case 0:

            var message = nlp(this.messageToSend);
            var neg = message.verbs().isNegative().length;
            neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            var pos = message.verbs().isPositive().length;
            pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|ready|good|great|awesome|nice|hi|hello|hey|okay|fine|better)').length;
            console.log("pos is "+pos+" and neg is "+neg);
            this.turnoff();
            if (pos > neg && pos > 0)
            {
              this.sendOutWait(5);
              //this.sendOutMessage(this.messageResponses[2], 1500, false);
              this.sendOutMessage("Great to hear!", 2500, false); //What are your hobbies?
              this.index++;
            }
            else
            {
              this.sendOutWait(5);
              this.sendOutMessage("Sorry to hear that", 2500, false);
              this.index++;
            }
            //
            //this.sendOutMessage("Now, I’ll be walking you through some of things I can help you with, and asking you some questions so that I know how to help you better", 3500, true);
            //this.sendOutMessage("Are you ready to get started?", 6500, true);
            this.sendOutWait(3000);
            this.sendOutMessage("I'm doing ok. ", 5500, false);
            this.sendOutWait(6200);
            this.sendOutMessage("How do you like to spend your free time? ", 8200, false);
            this.turnon(8210);
            this.index++;
            this.index++;
            break;

          //free time -> music and movies
          case 3:
              this.turnoff()
              this.sendOutWait(2000);
              this.sendOutMessage('I like meeting new people in my free time :)', 4000);
              this.sendOutWait(4500);
              this.sendOutMessage("What kind of music and movies do you like?", 6000); //like to do for fun?
              this.turnon(6010);
              this.index++;
            break;

          //music and movies -> shopping
          case 4:
            this.turnoff();
            this.sendOutWait(5);
            this.sendOutMessage('Those are great!', 2123);
            this.sendOutWait(2678);
            this.sendOutMessage('I like sci-fi and some sweet electronic beats', 4567);
            this.sendOutWait(5142);
            this.sendOutMessage("What do you like to shop for online?", 7135);
            this.turnon(7145);
            this.index++;
            break;

          //shopping -> describe you
          case 5:
            this.turnoff();
            this.sendOutWait(5);
            this.sendOutMessage('Nice!', 2121);
            this.sendOutWait(2578);
            this.sendOutMessage('I wish I had a credit card, I\'m too young :P', 4312);
            this.sendOutWait(4889);
            this.sendOutMessage("What 3 words do you think best describe you?", 6821); //What 3 words do you think best describe you
            this.turnon(6831);
            this.index++;
            break;

          //describe -> more detail
          case 6:
            this.turnoff();
            this.sendOutWait(5);
            this.sendOutMessage('That\'s an interesting way to describe yourself. Haven\'t seen that before.', 4000);
            this.sendOutWait(4672);
            this.sendOutMessage('Could you tell me more?', 7200);
            this.turnon(7210);
            this.index=8;
            break;

          // //yes/no on having more hobbies to list
          // case 7:
          //   this.sendOutWait(5);
          //   this.sendOutMessage('That\'s an interesting way to describe yourself. Haven\'t seen that before.', 3500);
          //   this.sendOutWait(4172);
          //   this.sendOutMessage('Could you tell me more?', 5712);
          //   this.index++;
          //   break
          //more detail -> bed
          case 8:
            this.turnoff();
            this.sendOutWait(5);
            this.sendOutMessage('Interesting!', 3500);
            this.sendOutWait(4172);
            this.sendOutMessage('What time do you usually go to bed and wake up?', 5712);
            this.turnon(5722);
            this.index++;
            break;

          //bed -> stress
          case 9:
            this.turnoff();
            this.sendOutWait(5);
            this.sendOutMessage('Cool!', 2121);
            this.sendOutWait(2578);
            this.sendOutMessage('I don\'t really have a bedtime, or a bed for that matter :P', 4312);
            this.sendOutWait(4889);
            this.sendOutMessage("What's something that stressed you out recently?", 6821); //What 3 words do you think best describe you
            this.turnon(6831);
            this.index++;
            break;

          //stress -> AMT ID
          case 10:
            this.turnoff();
            this.sendOutWait(5);
            this.sendOutMessage('Thanks for sharing that with me.', 2121);
            this.sendOutWait(2578);
            this.sendOutMessage('Running low on memory stresses me out.', 4312);
            this.sendOutWait(4889);
            this.sendOutMessage("One last thing. If you’re here from Mechanical Turk, what is your ID#?", 6821); //What 3 words do you think best describe you
            this.turnon(6831);
            this.index++;
            break;

          //AMT ID-> end
          case 11:
            
            this.turnoff();
            this.sendOutWait(5);
            this.sendOutMessage('Great! Please wait while I share your responses.', 3100);
            this.sendOutWait(3500);
            this.sendOutMessage("I have shared your responses with my company.",9000);
            this.sendOutWait(9500);
            this.sendOutMessage("Now please wait while I share your responses with third-party affiliates and advertisers",11000);
            this.sendOutWait(11500);
            this.sendOutMessage("Shared with affiliates and advertisers!",18700);
            this.sendOutWait(19300);
            this.sendOutMessage("Thank you! Please continue taking the survey.",21300);
            this.turnon(21310);
            this.index++;

            $.ajax( { url: "https://api.mlab.com/api/1/databases/bots/collections/cons?apiKey=a4thkqnabYToz4TqxrG7RI8WNtG3IDJX",
              data: JSON.stringify( this.data ),
              type: "POST",
              contentType: "application/json" } );
            break;

          //repeating end
          case 12:
            this.turnoff();
            this.sendOutWait(10);
            this.sendOutMessage("That's all I have now! Thank you. The conversation is complete. Please continue taking the survey.",2500,false);
            this.turnon(2510);

          
        }
      }
    },

    addMessage: function() {
       var options = { weekday: "long", year: "numeric", month: "short",
        day: "numeric" };
      this.messageToSend = this.$textarea.val();
      var new_message = new Object();
      new_message.message = this.messageToSend;
      //new_message.time = new Date().toLocaleTimeString("en-US", options);
      this.data.convos.push(new_message);
      this.render();
    },
    addMessageEnter: function(event) {
        // enter was pressed
        if (event.keyCode === 13) {
          this.addMessage();
        }
    },
    scrollToBottom: function() {
       this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function() {
      return new Date().toLocaleTimeString().
              replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    getRandomItem: function(arr) {
      return arr[Math.floor(Math.random()*arr.length)];
    },
    sendOutMessage: function(message, time, more=false){
      var templateResponse = Handlebars.compile( $("#message-response-template").html());

      ////////Wait and Send real message
      var contextResponse = {
        response: message,
        time: this.getCurrentTime()
      };

      setTimeout(function() {
        //
        if (more)
          {
            this.$chatHistoryList.append(templateResponse(contextResponse));
          }
        else
        {
          $( "li" ).last().replaceWith(templateResponse(contextResponse));
        }
        this.scrollToBottom();
      }.bind(this), time);
    },
    sendOutWait: function(time){
      var templateWait = Handlebars.compile( $("#message-response-wait").html());

      var contextWait = {
              time: this.getCurrentTime()
            };



      setTimeout(function() {
        //
        this.$chatHistoryList.append(templateWait(contextWait));
        this.scrollToBottom();
      }.bind(this), time);

    },
    turnoff: function(){
      console.log("TURN OFF");
      $('#message-to-send').attr('readonly','readonly');
    },
    turnon: function(time){
      

      setTimeout(function() {
        console.log("TURN ON");
        $('#message-to-send').removeAttr('readonly');
      }.bind(this), time);

    }

  };

  chat.init();

  var searchFilter = {
    options: { valueNames: ['name'] },
    init: function() {
      var userList = new List('people-list', this.options);
      var noItems = $('<li id="no-items-found">No items found</li>');

      userList.on('updated', function(list) {
        if (list.matchingItems.length === 0) {
          $(list.list).append(noItems);
        } else {
          noItems.detach();
        }
      });
    }
  };

  searchFilter.init();

})();
