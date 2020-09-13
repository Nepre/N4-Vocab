var items = 18;

function filltable(){
    $.getJSON('Verbs.json', function(data) {
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
    $.getJSON('Verbs.json', function(data) {
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