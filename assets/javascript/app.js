$(document).ready(function () {
    var options = [
        {
            question: "Harry Potter would not exist without her", 
            choice: ["Sherrie Cronin", "Edith Wharton", "J.K. Rowling", "Elizabeth Blackwell"],
            answer: 2,
            photo: "assets/images/harrypotter.gif"
        }, 
            {
                question: "Race barriers were broken by her in both tennis and golf", 
               choice: ["Serena Williams", "Althea Gibson", "Martina Navratilova", "Margaret Court"],
               answer: 1,
              photo: "assets/images/tennis.gif"
            }, 
            {
                question: "Media mogul who has had her own tv show, magazine, tv station and school", 
               choice: ["Ellen", "Tyra Banks", "Barbara Walters", "Oprah"],
               answer: 3,
               photo: "assets/images/Oprah.gif"
           }, 
           {
               question: "She will have you cooking up a feast in 30 minutes or less", 
               choice: ["Rachael Ray", "Giada de Laurentiis", "Padma Lakshmi", "Julia Child"],
               answer: 0,
              photo: "assets/images/rachelgif.gif"
           
            
         }];

        var correctCount =0;
        var wrongCount =0;
        var unanswerCount =0;
        var timer =20;
        var intervalid;
        var userGuess = "";
        var running = false;
        var qCount = options.length;
        var pick;
        var index;
        var newArray = [];
        var holder = [];



        $("#reset").hide();
        $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
        }
        })

        function runTimer(){
            if (!running) {
            intervalId = setInterval(decrement, 1000); 
            running = true;
            }
        }
        function decrement() {
            $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
            timer --;
        
          
            if (timer === 0) {
                unanswerCount++;
                stop();
                $("#answerarea").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            
        }
    
        }
        function stop() {
            running = false;
            clearInterval(intervalId);
        }
            function displayQuestion() {
                
                index = Math.floor(Math.random()*options.length);
                pick = options[index];

                
                        $("#questionarea").html("<h3>" + pick.question + "</h3>");
                        for(var i = 0; i < pick.choice.length; i++) {
                            var userChoice = $("<div>");
                            userChoice.addClass("answerchoice");
                            userChoice.html(pick.choice[i]);
                           
                            userChoice.attr("data-guessvalue", i);
                            $("#answerarea").append(userChoice);
                    }
                         }
                         $(".answerchoice").on("click", function () {
                            
                            userGuess = parseInt($(this).attr("data-guessvalue"));
                        
                            
                            if (userGuess === pick.answer) {
                                stop();
                                correctCount++;
                                userGuess="";
                                $("#answerarea").html("<p>Correct!</p>");
                                hidepicture();
                        
                            } else {
                                stop();
                                wrongCount++;
                                userGuess="";
                                $("#answerarea").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                                hidepicture();
                            }
                        })
                    

                        function hidepicture () {
                            $("#answerarea").append("<img src=" + pick.photo + ">");
                            newArray.push(pick);
                            options.splice(index,1);
                        
                            var hidpic = setTimeout(function() {
                                $("#answerarea").empty();
                                timer= 20;
                        
                           
                            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                                $("#questionarea").empty();
                                $("#questionarea").html("<h3>The Game Is Over!  Lets See If You Knew Who Runs The World : </h3>");
                                $("#answerarea").append("<h4> Correct: " + correctCount + "</h4>" );
                                $("#answerarea").append("<h4> Incorrect: " + wrongCount + "</h4>" );
                                $("#answerarea").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
                                $("#reset").show();
                                correctCount = 0;
                                wrongCount = 0;
                                unanswerCount = 0;
                        
                            }
                            else {
                                runTimer();
                                displayQuestion();
                        
                            }
                            }, 5000);

                        }

                        $("#reset").on("click", function() {
                            $("#reset").hide();
                            $("#answerarea").empty();
                            $("#questionarea").empty();
                            for(var i = 0; i < holder.length; i++) {
                                options.push(holder[i]);
                            }
                            runTimer();
                            displayQuestion();
                        
                        })
                    
                    })