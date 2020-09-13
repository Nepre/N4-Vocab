var items = 18;

var examQuestions = [];
var right = 0;
var currentQuestion = 0;
var selected = -1;
var correctAnswer = -1;

function filltable(){
    $.getJSON('verbs.json', function(data) {
        var count = Object.keys(data).length;
        const params = new URLSearchParams(document.location.search);
        page = parseInt(params.get("p"));
        if(isNaN(page) || page == null) page = 0;
        let i;
        let start = page*items;
        console.log(count);
        for (i = start; i < start + items && i < count; i++) {
            document.getElementById("tb2").innerHTML+=
            "<tr class='border-t-2 border-gray-500'>"
            +'<th class="px-4 py-2">'
            + data[i].pron + '</th>'
            +'<th class="px-4 py-2">'
            + data[i].mean + '</th>'
            +'<th class="px-4 py-2">'
            + data[i].kanji + '</th>'
            + '</tr>';
        } 
        document.getElementById("f1").innerHTML = data[start].pron[0];
        document.getElementById("f2").innerHTML = data[i-1].pron[0];
    });
}

function init(){
    const params = new URLSearchParams(document.location.search);
    $.getJSON('verbs.json', function(data) {
        var count = Object.keys(data).length;
        console.log(parseInt(params.get("p")));
        page = parseInt(params.get("p"));
        let end = Math.floor(count/items);
        if(page == null || isNaN(page)){
            document.getElementById("prev").href = "index.html";
            document.getElementById("next").href = "index.html?p=1";
        }
        else{
            if(parseInt(page-1) < 1)
                document.getElementById("prev").href = "index.html";
            else
                document.getElementById("prev").href = "index.html?p=" + (page-1);
           
            if(parseInt(page+1) >= end)
                document.getElementById("next").href = "index.html?p="+end;
            else
                document.getElementById("next").href = "index.html?p=" + (page+1);

        }
        document.getElementById("end").href = "index.html?p="+end;
    });
}

function exam(){
    $.getJSON('verbs.json', function(data) {
        var count = Object.keys(data).length;
        
        document.getElementById("one").innerHTML = currentQuestion;

        var random = Math.floor(Math.random() * (count-1));
        var quest = random;
        var kanji = " (" + data[quest].kanji + ")";
        if(data[quest].kanji == ""){
            kanji = " (No N4 Kanji)";
        }
        document.getElementById("quest").innerHTML = data[quest].pron + kanji;
        
        var rquest = Math.floor(Math.random() * 4);
        document.getElementById("op"+rquest).innerHTML = data[quest].mean;
        var r2;
        var answ = [-1, -1, -1, -1];
        answ[rquest] = quest;
        correctAnswer = rquest;
        console.log(correctAnswer);
        examQuestions.push([(data[quest].pron + kanji), (data[quest].mean), false]);
        for (let i = 0; i < 4; i++) {
            let b;
            do{
                b = true;
                r2 = Math.floor(Math.random() * (count-1));
                for (let j = 0; j < answ.length; j++) {
                    if(r2 == answ[j]) b = false;
                }
            }while(b == false);
            answ[i] = r2;

            if(i != rquest){
                document.getElementById("op"+i).innerHTML = data[r2].mean;
            }
        }
    


    });
}

function changeSelected(num){
    for (let i = 0; i < 4; i++) {
        document.getElementById("op"+i).style = "text-decoration: none;";
    }
    document.getElementById("op"+num).style = "text-decoration: underline;";
    selected = parseInt(num);
}

function deSelect(){
    for (let i = 0; i < 4; i++) {
        document.getElementById("op"+i).style = "text-decoration: none;";
    }
}

var items = 18;
var examQuestions = [];
var right = 0;
var currentQuestion = 1;
var selected = -1;
var correctAnswer = -1;

function nextQuestion(){
    if(selected == -1) return;

    if(selected == correctAnswer){
        right++;
        examQuestions[currentQuestion-1][2] = true;
    }
    console.log(right);
    currentQuestion++;
    if(currentQuestion < 11){
        selected = -1;
        deSelect();
        exam();
    }
    else{
        finishExam();
    }
}

function finishExam(){
    document.getElementById("mainDiv").innerHTML = "<div class='mt-5 text-2xl'>Answers</div>";
    for (let i = 0; i < 10; i++) {
        var answVal = (examQuestions[i][2])? "✓":"✗";
        document.getElementById("mainDiv").innerHTML +=
            "<p class='mt-3'><b>Question" + i + "(" + answVal + ")" + "</p></b>" +
            "<div>" + examQuestions[i][0] + ": "  + examQuestions[i][1]
            + "<div>";
    }
    document.getElementById("mainDiv").innerHTML += "<div class='mt-5 text-2xl'>You got <b>"+right+"</b> out of <b>10</b>. </div>";
    document.getElementById("mainDiv").innerHTML += `
    <div class="right-0.bottom-0 text-right pr-20 mt-10">
    <button onclick="location.reload();" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
        Re-Start
    </button>
    </div>
    `;

}