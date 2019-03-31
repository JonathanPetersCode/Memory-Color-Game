let cardsObject = {};
// JQuery Scripts Start
$(document).ready(function () {
    // Variables
       let numberOfCards = 8;
       let defaultColor = '#141313';
       let arrayOfColors = ['#FF4747', '#A8ff56', '#FF4ba6', '#E8FD42', '#B854FF', '#BBBBBB'];
       let firstCardSelected = '';
       let secondCardSelected = '';
       let score = 0;
    // Assigns a color to each card
        let cardsObject = {
            'card1': arrayOfColors[0],
            'card2': arrayOfColors[1],
            'card3': arrayOfColors[2],
            'card4': arrayOfColors[3],
            'card5': arrayOfColors[4],
            'card6': arrayOfColors[5],
            'card7': arrayOfColors[0],
            'card8': arrayOfColors[1],
            'card9': arrayOfColors[2],
            'card10': arrayOfColors[3],
            'card11': arrayOfColors[4],
            'card12': arrayOfColors[5]
            }
    $('.card').click(function () {
        checkMatch();
           if (!firstCardSelected || !secondCardSelected)
            // Check is the firstCardSelected or secondCardSelected is empty.
            {
               let cardId = $(this).attr('id');
            // Stores the ID of the card clicked in a variable.
               let cardColor = cardsObject[cardId];
            // Find the color belonging to this card in the cardsObject and store it in a variable.
               $(this).css('background', cardColor);
            // Change the color of the card we clicked to the color we stored in te cardColor variable.
               $(this).addClass('active');
            // Set this card the class active.
               if (!firstCardSelected) {
                   firstCardSelected = cardColor;
                // Check if firstCardSelected is still empty, if it is we store this cards color in firstCardSelected.
               } else if (!secondCardSelected) {
                   secondCardSelected = cardColor;
                // We check if secondCardSelected is still empty, if it is we store this cards color in secondCardSelected.
                   if (firstCardSelected === secondCardSelected) {
                // With 2 cards now selected, we check if the colors match we incrment our score variable.
                       score++;
                       if (score >= numberOfCards / 2) {
                           gameFinished();
                       }
                    // If score variable is higher or the same as half of our numberOfCards we win the game and call gameFinished();
                }
            }
        }
    });
    $('#restart').click(function () {
        score = 0;
        $('.card').css('background', defaultColor);
        $('.card').removeClass('done');
        $('.card').removeClass('active');
        shuffleCards();
        $('#finished').hide();
    })
    function checkMatch() {
            if (firstCardSelected !== '' && secondCardSelected !== '') {
                // Check id both firstCardSelected and secondCardSelected are not empty
                if (firstCardSelected === secondCardSelected) {
                    $('.active').addClass('done');
                    $('.card').removeClass('active');
                    firstCardSelected = '';
                    secondCardSelected = '';
                    // Check if firstCardSelected and secondCardSelected have the same value. If both selections have same value apply the class "done" and remove class "active" and reset.
                } else {
                    $('.active').css('background', defaultColor);
                    $('.card').removeClass('active');
                    firstCardSelected = '';
                    secondCardSelected = '';
                }
                // If they are not the same change the color back to the default color, remove the class active and also reset the firsCardSelected and secondCardSelected variables.
            }
        }
    function shuffleCards() {
        let newArray = [];
        for (let i = 0; i < numberOfCards / 2; i++) {
            newArray.push(arrayOfColors[i]);
            newArray.push(arrayOfColors[i]);
        }
        let currentIndex = newArray.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = newArray[currentIndex];
            newArray[currentIndex] = newArray[randomIndex];
            newArray[randomIndex] = temporaryValue;
        }

        for (let i = 0; i < numberOfCards; i++) {
            cardsObject['card' + (i + 1)] = newArray[i];
        }
    }
    function gameFinished() {
        $('#finished').show();
    }
});

// JQuery Scripts End