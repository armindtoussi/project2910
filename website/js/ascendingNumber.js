/*takes in user input, compares with the store array*/
$(document).ready(function() {
    $('.numberOption').click(function() {
        var choiceID = $(this).attr('id');
        var currModule = activeArray[enlarged];
        if(choiceID == "numberSection" + currModule.answer[currModule.input.length]) {
            /*hides the clicked button*/
            $(this).css("visibility", "hidden");
            if(currModule.input.length == currModule.answer.length - 1 ) {
                endGame(enlarged);
                /*shows the hidden buttons*/
                $(".numberOption").css("visibility", "visible");
            }
            currModule.input += "1";
        } else {
            wrongAnswer();
        }
    });
});

function generateAscNum() {
    var maxNumber, baseNumber, fracChance;
    var temp = [];
    var gameInfo = {
        type: "ascendingNumber",
        answer: [],
        data: []
    };
    
    switch(difficulty){
        case 1:
            maxNumber = 10;
            baseNumber = 1;
            fracChance = 0;
            break;
        case 2:
            maxNumber = 100;
            baseNumber = 1;
            fracChance = 0.25;
            break;
        case 3:
            maxNumber = 50;
            baseNumber = -50;
            fracChance = 0.5;
            break;
        case 4:
            maxNumber = 100;
            baseNumber = -100;
            fracChance = 0.75;
            break;
    }
    
    for(var i = 0; i < 4; i++) {
        var num = {
            pos: 0,
            value: 0
        };
        num.value = Math.random() < fracChance ? genFraction() : genWhole();
        num.pos = i + 1;
        temp[i] = num;
    }
    
    gameInfo.data = temp.slice();
    temp.sort(compareNumbers);
    
    for(var i = 0; i < 4; i++) {
        gameInfo.answer[i] = temp[i].pos;
    }
    
    return gameInfo;
    
    function genFraction() {
        var a = Math.floor((Math.random() * maxNumber) + baseNumber);
        var b = Math.floor((Math.random() * maxNumber) + baseNumber);
        return (a + "/" + b);
    }
    
    function genWhole() {
        var val;
        var found
        do {
            val = Math.floor((Math.random() * maxNumber) + baseNumber).toString();
            found = temp.some(function (el) {
                return el.value === val;
            });
        } while(found);
        return val;
    }
    
    function compareNumbers(a,b) {
        return eval(a.value) - eval(b.value);
    }
}

function loadAscNum() {
    for (i = 1; i <= 4; i++) {
        if(activeArray[enlarged].input.length < i) {
            $('#numberSection' + (i)).html(activeArray[enlarged].data[i - 1].value);
        } else {
            $('#numberSection' + (i)).css('visibility', 'hidden');
        }
    }
}