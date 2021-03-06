(function(){
  
  var chat = {
    messageToSend: '',
    index: 0,
    data: [],
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
          case 0:
            
            /*var name = window.nlp(this.messageToSend);
            if (name.match('#Person').found)
            {
              var mess = this.messageResponses[0] + name.match('#Person').out()
              this.sendOutWait();
              this.sendOutMessage(mess, 1500, false);
              this.sendOutMessage(this.messageResponses[1], 3000, true);//Are you ready to get started?
              this.index++;
            }
            else
            {
              this.sendOutWait();
              this.sendOutMessage("Sorry I didn't catch your name. Can you try again?", 1500, false);
            }*/
            var message = nlp(this.messageToSend);
            var neg = message.verbs().isNegative().length;
            neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            var pos = message.verbs().isPositive().length;
            pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|ready)').length;
            console.log("pos is "+pos+" and neg is "+neg);

            if (pos > neg && pos > 0)
            {
              this.sendOutWait();
              //this.sendOutMessage(this.messageResponses[2], 1500, false);
              this.sendOutMessage("Great to hear!", 1500, false); //What are your hobbies?
              this.index++;
            }

            else
            {
              this.sendOutWait();
              this.sendOutMessage("Sorry to hear that", 1500, false);
              this.index++;
            }
            //
            this.sendOutMessage("Now, I’ll be walking you through some of things I can help you with, and asking you some questions so that I know how to help you better", 2500, true);
            this.sendOutMessage("Are you ready to get started?", 5000, true);
            break;


            break;
          //Are you ready?
          case 1:
            var message = nlp(this.messageToSend);
            var neg = message.verbs().isNegative().length;
            neg = neg + message.match('(no|nope|not|nopes|naw)').length;
            var pos = message.verbs().isPositive().length;
            pos = pos + message.match('(yes|yeah|yup|yups|sure|ok|ready)').length;
            console.log("pos is "+pos+" and neg is "+neg);
            //lets continue
            if (pos > neg && pos > 0)
            {
              this.sendOutWait();
              //this.sendOutMessage(this.messageResponses[2], 1500, false);
              this.sendOutMessage("I’m good at finding fun things to do in your local area. How do you like to spend your free time? ", 2000, false); //What are your hobbies?
              this.index++;
            }

            else
            {
              this.sendOutWait();
              this.sendOutMessage("Ok, just let me know when you are ready.", 1500, false);
            }
            break;

          //What are your hobbies?
          case 2:
            this.sendOutWait();
            this.sendOutMessage("Great! Anything else?", 1500);
            this.index++;
            break;
          //yes/no on having more hobbies to list
          case 3:
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
              this.sendOutMessage('Great! I’ll keep that in mind', 1500);
              this.sendOutMessage("I can help with all sorts of home entertainment. What kind of music and movies do you like?", 2500, true); //like to do for fun?
              this.index++;
            }

            else
            {
              this.sendOutWait();
              this.sendOutMessage("Ok, So what else do you spend your free time on?", 1500);
              this.index--;
            }
            break;

          //like to do for fun?
          case 4:
            this.sendOutWait();
            this.sendOutMessage("Cool! Anything else you want to list?", 1500);
            this.index++;
            break;
          //yes/no on having more hobbies to list
          case 5:
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
              this.sendOutMessage('Great! Let\'s move on', 1500);
              this.sendOutMessage("I’m adaptable to your personality. What 3 words do you think best describe you?", 2500, true); //What 3 words do you think best describe you
              this.index++;
            }

            else
            {
              this.sendOutWait();
              this.sendOutMessage("Ok, So what else do you do then?", 1500);
              this.index--;
            }
            break;

          //What 3 words do you think best describe you?
          case 6:
            this.sendOutWait();
            this.sendOutMessage("Cool! Anything else you want to add?", 1500);
            this.index++;
            break;
          //yes/no on having more hobbies to list
          case 7:
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
              this.sendOutMessage('Ok!', 2000);
              this.sendOutMessage("Thank you. The conversation is complete. Please continue taking the service.",2500,true);
              

              //this.sendOutMessage(this.messageResponses[6], 3500, true); //Tell me something your best friend does that annoys you
              this.index++;
            }

            else
            {
              this.sendOutWait();
              this.sendOutMessage("Ok, So what else do you want to add to the list?", 1500);
              this.index--;
            }
            break;
          case 8:
            this.sendOutWait();
            this.sendOutMessage("That's all I have now! Thank you. The conversation is complete. Please continue taking the service.",2500,false);


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





        }//Have text, finding right responce

        
      }
      
    },
    
    addMessage: function() {
      this.messageToSend = this.$textarea.val()
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
    sendOutWait: function(){
      var templateWait = Handlebars.compile( $("#message-response-wait").html());

      var contextWait = { 
              time: this.getCurrentTime()
            };

      this.$chatHistoryList.append(templateWait(contextWait));
      this.scrollToBottom();
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