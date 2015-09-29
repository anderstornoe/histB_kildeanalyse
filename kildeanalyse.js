var JsonObj,
    runde = 0,
    delrunde = 0,
    score = 0;


$(document).ready(function() {
   $(".checkAnswer").click(check_answer);
   });


function next_round() {

// Load kilden ind fra Json objekt: 

$(".kilde_container").append(JsonObj[runde].kilde)


    next_del_round();
}

function next_del_round() {
    $(".QuestionTask").html(JsonObj[0].opts[0].spm);

    for (var i = 0; i < JsonObj[runde].opts[delrunde].svarmuligheder.length; i++) {
        $(".dropdown").append("<option value='" + JsonObj[runde].opts[delrunde].svarmuligheder[i] + "'>" + JsonObj[runde].opts[delrunde].svarmuligheder[i] + "</option>");
    }

}

function check_answer(){
    console.log ("check_answer");
}



function loadData(url) {
    $.ajax({
        url: url,
        // contentType: "application/json; charset=utf-8",  // Blot en test af tegnsaettet....
        //dataType: 'json', // <------ VIGTIGT: Saadan boer en angivelse til en JSON-fil vaere! 
        dataType: 'text', // <------ VIGTIGT: Pga. ???, saa bliver vi noedt til at angive JSON som text. 
        async: false, // <------ VIGTIGT: Sikring af at JSON hentes i den rigtige raekkefoelge (ikke asynkront). 
        success: function(data, textStatus, jqXHR) {
            JsonObj = jQuery.parseJSON(data);
            console.log(JsonObj);
            // Alt data JsonObj foeres over i arrays:
            for (var Key in JsonObj) {
                //console.log( JsonObj[Key].English);
                //console.log(JsonObj[0].opts[0].spm)
                /*
                                 word_Array.push(JsonObj[Key].English);
                                 transArray.push(JsonObj[Key].Dansk);
                                 correct_Array.push(JsonObj[Key].Correct);
                                 feedback_Array.push(JsonObj[Key].Explanation);

                                 if (JsonObj[Key].Correct !== "2") {
                                     antal_korrekte++;
                                 }*/
            }

            //$(".correct").html("Correct answers: <b>" + score + " / " + antal_korrekte + " </b> Attempts: <b>" + attempts + "</b>");
            next_round();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error!!!\njqXHR:" + jqXHR + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
        }
    });
}
