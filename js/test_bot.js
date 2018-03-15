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
      this.data.botType = "share";
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

            $('#message-to-send').disabled = true;
            var message = nlp(this.messageToSend);
            var neg = message.verbs().isNegative().length;
            neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            var pos = message.verbs().isPositive().length;
            pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|ready|good|great|awesome|nice|hi|hello|hey|okay|fine|better)').length;
            console.log("pos is "+pos+" and neg is "+neg);

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
            this.index++;
            this.index++;

            console.log("OPEN NOW!");
            //$('#message-to-send').removeAttr('disabled');
            break;


            break;

          //spend free time ->
          // case 1:
          //   // var message = nlp(this.messageToSend);
          //   // var neg = message.verbs().isNegative().length;
          //   // neg = neg + message.match('(no|nope|not|nopes|naw)').length;
          //   // var pos = message.verbs().isPositive().length;
          //   // pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|ready)').length;
          //   // console.log("pos is "+pos+" and neg is "+neg);
          //
          //   this.sendOutWait(5);
          //   this.sendOutMessage("How do you like to spend your free time? ", 3000, false); //What are your hobbies?
          //   this.index++;
          //   this.index++;
          //   break;

          //What are your hobbies?
          // case 2:
          //   this.sendOutWait(5);
          //   this.sendOutMessage("Great! Anything else?", 1500);
          //   this.index++;
          //   break;
          //free time -> music and movies
          case 3:
              this.sendOutWait(2000);
              this.sendOutMessage('I like meeting new people in my free time :)', 4000);
              this.sendOutWait(4500);
              this.sendOutMessage("What kind of music and movies do you like?", 6000); //like to do for fun?
              this.index++;
            break;

          //music and movies -> shopping
          case 4:
            this.sendOutWait(5);
            this.sendOutMessage('Those are great!', 2123);
            this.sendOutWait(2678);
            this.sendOutMessage('I like sci-fi and some sweet electronic beats', 4567);
            this.sendOutWait(5142);
            this.sendOutMessage("What do you like to shop for online?", 7135);
            this.index++;
            break;

          //shopping -> describe you
          case 5:
            this.sendOutWait(5);
            this.sendOutMessage('Nice!', 2121);
            this.sendOutWait(2578);
            this.sendOutMessage('I wish I had a credit card, I\'m too young :P', 4312);
            this.sendOutWait(4889);
            this.sendOutMessage("What 3 words do you think best describe you?", 6821); //What 3 words do you think best describe you
            this.index++;
            break;

          //describe -> more detail
          case 6:
            this.sendOutWait(5);
            this.sendOutMessage('That\'s an interesting way to describe yourself. Haven\'t seen that before.', 4000);
            this.sendOutWait(4672);
            this.sendOutMessage('Could you tell me more?', 7200);
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
            this.sendOutWait(5);
            this.sendOutMessage('Interesting!', 3500);
            this.sendOutWait(4172);
            this.sendOutMessage('What time do you usually go to bed and wake up?', 5712);
            this.index++;
            break;

          //bed -> stress
          case 9:
            this.sendOutWait(5);
            this.sendOutMessage('Cool!', 2121);
            this.sendOutWait(2578);
            this.sendOutMessage('I don\'t really have a bedtime, or a bed for that matter :P', 4312);
            this.sendOutWait(4889);
            this.sendOutMessage("What's something that stressed you out recently?", 6821); //What 3 words do you think best describe you
            this.index++;
            break;

          //stress -> AMT ID
          case 10:
            this.sendOutWait(5);
            this.sendOutMessage('Thanks for sharing that with me.', 2121);
            this.sendOutWait(2578);
            this.sendOutMessage('Running low on memory stresses me out.', 4312);
            this.sendOutWait(4889);
            this.sendOutMessage("One last thing. If you’re here from Mechanical Turk, what is your ID#?", 6821); //What 3 words do you think best describe you
            this.index++;
            break;

          //AMT ID-> end
          case 11:
            // var message = nlp(this.messageToSend);
            // var neg = message.verbs().isNegative().length;
            // neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            // var pos = message.verbs().isPositive().length;
            // pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|ready|good|great|awesome|nice|hi|hello|hey|okay|fine|better)').length;
            // console.log("pos is "+pos+" and neg is "+neg);


            this.sendOutWait(10);
            this.sendOutMessage('Thank you! It was great chatting with you.', 3100);
            // this.sendOutWait(3712);
            // this.sendOutMessage("It was great chatting with you. Thanks for your time!",5812);
            this.sendOutWait(5000);
            this.sendOutMessage(" I've shared your responses with my company, third-party affiliates, and advertisers.",5000);
            this.sendOutWait(6612);
            this.sendOutMessage("Please continue taking the survey.",7830);
            this.index++;

            $.ajax( { url: "https://api.mlab.com/api/1/databases/bots/collections/cons?apiKey=a4thkqnabYToz4TqxrG7RI8WNtG3IDJX",
              data: JSON.stringify( this.data ),
              type: "POST",
              contentType: "application/json" } );
            break;

          //repeating end
          case 12:
            this.sendOutWait(10);
            this.sendOutMessage("That's all I have now! Thank you. The conversation is complete. Please continue taking the survey.",2500,false);


          //Tell me something your best friend does that annoys you?
          /*
          case 8:
            this.sendOutWait();
            this.sendOutMessage("Ok, anything else to add?", 1500);
            this.index++;
            break;
          //yes/no on having more hobbies to list
          case 9:
            var message = nlp(this.messageToSend);
            var neg = message.verbs().isNegative().length;
            neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            var pos = message.verbs().isPositive().length;
            pos = pos + message.match('(yes|yeah|yup|yups|sure|ok)').length;
            console.log("pos is "+pos+" and neg is "+neg);

            //lets continue
            if (neg > pos && neg > 0)
            {
              this.sendOutWait();
              this.sendOutMessage('Great!', 1500);
              this.sendOutMessage(this.messageResponses[7], 3000, true); //Tell me about a stressful situation
              this.index++;
            }

            else
            {
              this.sendOutWait();
              this.sendOutMessage("Ok, so what else does your friend do that annoys you?", 1500);
              this.index--;
            }
            break;

          //Tell me about a stressful situation?
          case 10:
            this.sendOutWait();
            this.sendOutMessage("Ok, anything else to add?", 1500);
            this.index++;
            break;
          //yes/no on having more hobbies to list
          case 11:
            var message = nlp(this.messageToSend);
            var neg = message.verbs().isNegative().length;
            neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            var pos = message.verbs().isPositive().length;
            pos = pos + message.match('(yes|yeah|yup|yups|sure|ok)').length;
            console.log("pos is "+pos+" and neg is "+neg);

            //lets continue
            if (neg > pos && neg > 0)
            {
              this.sendOutWait();
              this.sendOutMessage('Great!', 1500);
              this.sendOutMessage(this.messageResponses[8], 3000, true); //Do you live with a partner
              this.index++;
            }

            else
            {
              this.sendOutWait();
              this.sendOutMessage("OK, so tell me more about your stressful situation.", 1500);
              this.index--;
            }
            break;

          //yes/no on having partner
          case 12:
            var message = nlp(this.messageToSend);
            var neg = message.verbs().isNegative().length;
            neg = neg + message.match('(no|nope|not|nopes|naw|single)').length;
            var pos = message.verbs().isPositive().length;
            pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|married|dating)').length;
            console.log("pos is "+pos+" and neg is "+neg);

            //Yes Partner
            if (pos > neg && pos > 0)
            {
              this.sendOutWait();
              this.sendOutMessage('That\'s great!', 1500);
              this.sendOutMessage(this.messageResponses[9], 3000, true); //How often do you argue with your partner
              this.index++;
            }

            //no partner/g2 amazon turk ID Q
            else
            {
              this.sendOutWait();
              this.sendOutMessage("No worries! I'm also single. Alexa never answers my calls.", 1500);
              this.sendOutMessage("Anyway, almost done with these questions.", 3000, true);
              this.sendOutMessage(this.messageResponses[10], 4500, true); //Mturk ID?
              this.index = this.index + 3;
            }
            break;

            //Tell me about a stressful situation?
          case 13:
            this.sendOutWait();
            this.sendOutMessage("Ok, anything else to add?", 1500);
            this.index++;
            break;
          //yes/no on having more parner issues to list
          case 14:
            var message = nlp(this.messageToSend);
            var neg = message.verbs().isNegative().length;
            neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            var pos = message.verbs().isPositive().length;
            pos = pos + message.match('(yes|yeah|yup|yups|sure|ok)').length;
            console.log("pos is "+pos+" and neg is "+neg);

            //lets continue
            if (neg > pos && neg > 0)
            {
              this.sendOutWait();
              this.sendOutMessage('Ok', 1500);
              this.sendOutMessage("Almost done with these questions.", 3000, true);
              this.sendOutMessage(this.messageResponses[10], 4000, true); //Mturk ID?
              this.index++;
            }

            else
            {
              this.sendOutWait();
              this.sendOutMessage("OK, so tell me more.", 1500);
              this.index--;
            }
            break;

            //end of convo
            case 15:
              //capture mturk ID some way, record seperatly
              this.sendOutWait();
              this.sendOutMessage(this.messageResponses[11], 1500); //Survey Link?
              //jQuery send out info to DB
              this.index++;
              break;
            case 16:
              this.sendOutWait();
              this.sendOutMessage("That's all I have now. Be sure to do the survey and check back soon!", 1500);
              */
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

      var options = { weekday: "long", year: "numeric", month: "short",
        day: "numeric" };
      var new_message = new Object();
      new_message.message = message;
      //new_message.time = new Date().toLocaleTimeString("en-US", options);
      this.data.convos.push(new_message);

      ////////Wait and Send real message
      var contextResponse = {
        response: message,
        time: this.getCurrentTime()
      };
      $('#message-to-send').attr('disabled','disabled');
      console.log("MESSAGE START!!!!! diable!!")
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
        console.log("End diable!!")
        $('#message-to-send').removeAttr('disabled');
      }.bind(this), time);
    },
    sendOutWait: function(time){
      var templateWait = Handlebars.compile( $("#message-response-wait").html());

      var contextWait = {
              time: this.getCurrentTime()
            };


      $('#message-to-send').attr('disabled','disabled');
      console.log("START!!!!! diable!!")
      setTimeout(function() {
        //
        this.$chatHistoryList.append(templateWait(contextWait));
        this.scrollToBottom();
        console.log("End diable!!")
        this.$textarea.removeAttr('disabled');
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
