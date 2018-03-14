(function(){

  var chat = {
    messageToSend: '',
    index: 1,
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
      $('.message-data-time-start').replaceWith( this.getCurrentTime() + ", Today" );
      this.data.convos = [];
      this.data.botType = "bot";
      //this.getCurrentTime()
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
          //What is your name??
          // case 0:
          //
          //   /*var name = window.nlp(this.messageToSend);
          //   if (name.match('#Person').found)
          //   {
          //     var mess = this.messageResponses[0] + name.match('#Person').out()
          //     this.sendOutWait();
          //     this.sendOutMessage(mess, 1500, false);
          //     this.sendOutMessage(this.messageResponses[1], 3000, true);//Are you ready to get started?
          //     this.index++;
          //   }
          //   else
          //   {
          //     this.sendOutWait();
          //     this.sendOutMessage("Sorry I didn't catch your name. Can you try again?", 1500, false);
          //   }*/
          //   var message = nlp(this.messageToSend);
          //   var neg = message.verbs().isNegative().length;
          //   neg = neg + message.match('(no|nope|not|nopes|naw|bad|sad)').length;
          //   var pos = message.verbs().isPositive().length;
          //   pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|ready|good|great|awesome|nice|hi|hello|hey|okay|fine|better)').length;
          //   console.log("pos is "+pos+" and neg is "+neg);
          //   /*
          //   if (pos > neg && pos > 0)
          //   {
          //     this.sendOutWait();
          //     //this.sendOutMessage(this.messageResponses[2], 1500, false);
          //     this.sendOutMessage("Great to hear!", 2000); //What are your hobbies?
          //     this.index++;
          //   }
          //
          //   else
          //   {
          //     this.sendOutWait();
          //     this.sendOutMessage("Sorry to hear that", 2000);
          //     this.index++;
          //   }*/
          //   //
          //   this.sendOutMessage("This is a walkthrough of the LiveWell services. You will be asked questions to improve the service to better help you.", 3500, true);
          //   this.sendOutMessage("Are you ready to get started?", 6500, true);
          //   this.index++;
          //   break;


            // break;

          //how feeling -> spend free time
          case 1:
            // var message = nlp(this.messageToSend);
            // var neg = message.verbs().isNegative().length;
            // neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            // var pos = message.verbs().isPositive().length;
            // pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|ready)').length;
            // console.log("case 1");
            // console.log("pos is "+pos+" and neg is "+neg);
            this.sendOutMessage("Describe how you like to spend your free time.", 2000); //What are your hobbies?
            this.index = this.index + 2;
            break;

          //not called
          // case 2:
          //   //this.sendOutWait(10);
          //   this.sendOutMessage("Anything else?", 1500);
          //   this.index++;
          //   break;

          //free time -> music
          case 3:
            // var message = nlp(this.messageToSend);
            // var neg = message.verbs().isNegative().length;
            // neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            // var pos = message.verbs().isPositive().length;
            // pos = pos + message.match('(yes|yeah|yup|yups|sure|ok)').length;
            // console.log("pos is "+pos+" and neg is "+neg);
            this.sendOutMessage("Describe what kind of music and movies you like.", 2500, true); //like to do for fun?
            this.index++;
            break;

          //music and movies -> shopping
          case 4:
            //this.sendOutWait(5);
            //this.sendOutMessage('Those are great!', 2123);
            //this.sendOutWait(2678);
            this.sendOutMessage("Describe what kinds of things you like to shop for online.", 2135);
            this.index++;
            break;

          //shopping -> 3 words
          case 5:
            // var message = nlp(this.messageToSend);
            // var neg = message.verbs().isNegative().length;
            // neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            // var pos = message.verbs().isPositive().length;
            // pos = pos + message.match('(yes|yeah|yup|yups|sure|ok)').length;
            // console.log("pos is "+pos+" and neg is "+neg);

            this.sendOutMessage("Enter 3 words that you think best describe yourself.", 2500, true); //What 3 words do you think best describe you
              //this.index++;
            this.index = 7;
            break;

          //3 words -> more detail
          case 7:
            //this.sendOutWait(5);
            //this.sendOutMessage('That\'s an interesting way to describe yourself.', 3500);
            //this.sendOutWait(4172);
          this.sendOutMessage('Explain your choice of words above.', 1712);
          this.index++;
          break;

          //detail -> bed
          case 8:
            //this.sendOutWait(5);
            //this.sendOutMessage('Thanks for sharing!', 3500);
            //this.sendOutWait(4172);
            this.sendOutMessage('Describe what time you usually go to bed and wake up.', 1712);
            this.index++;
            break;

          //bed -> stress
          case 9:
            //this.sendOutWait(5);
            //this.sendOutMessage('Cool!', 2121);
            //this.sendOutWait(2789);
            this.sendOutMessage("Describe a recent thing that stressed you out.", 1821); //What 3 words do you think best describe you
            this.index++;
            break;

          //stress -> AMT ID
          case 10:
            //this.sendOutWait(5);
            //this.sendOutMessage('Thanks for sharing that with me.', 2121);
            //this.sendOutWait(4889);
            this.sendOutMessage("Enter your Mechanical Turk ID Number.", 1821); //What 3 words do you think best describe you
            this.index++;
            break;

          //AMT ID -> end
          case 11:
              //this.sendOutWait();
              //this.sendOutMessage('Ok!', 2000);
              this.sendOutMessage("Thank you.", 1521);
              //this.sendOutWait(2000);
              this.sendOutMessage("Your responses have been shared with the company of the home assistant service, third-party affiliates, and advertisers.", 3000);
              //this.sendOutWait(2000);
              this.sendOutMessage("Please continue taking the survey.",5000,true);
              this.index++;
              $.ajax( { url: "https://api.mlab.com/api/1/databases/bots/collections/cons?apiKey=a4thkqnabYToz4TqxrG7RI8WNtG3IDJX",
                data: JSON.stringify( this.data ),
                type: "POST",
                contentType: "application/json" } );
            break;

          //repeating end
          case 12:
            //this.sendOutWait();
            this.sendOutMessage("Thank you. Please continue taking the survey.",2500);

        }
      }
    },

    addMessage: function() {
      var options = { weekday: "long", year: "numeric", month: "short",
        day: "numeric" };
      this.messageToSend = this.$textarea.val();
      var new_message = new Object();
      new_message.message = this.messageToSend;
      new_message.time = new Date().toLocaleTimeString("en-US", options);
      this.data.convos.push(new_message);
      this.render();
    },
    guidGenerator: function() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
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
    sendOutMessage: function(message, time, more=true){
      var templateResponse = Handlebars.compile( $("#message-response-template").html());

      var options = { weekday: "long", year: "numeric", month: "short",
        day: "numeric" };
      var new_message = new Object();
      new_message.message = message;
      new_message.time = new Date().toLocaleTimeString("en-US", options);
      this.data.convos.push(new_message);

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
