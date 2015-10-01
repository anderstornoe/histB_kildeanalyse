var JsonObj,
    runde = 0,
    delrunde = 0,
    korrekt = false;
score = 0;


$(document).ready(function() {
    $(".checkAnswer").click(check_answer);
    $(".dropdown").change(function() {
        var dropdown_value = $(".dropdown").val();
        if (dropdown_value === JsonObj[runde].opts[delrunde].korrekt_svar) {
            korrekt_svar = true;
        } else {
            korrekt_svar = false;

        }

    });
});


function next_round() {
$(".analysetext").html("");
    delrunde = 0;
    $(".kilde_container").fadeOut(0);
    $(".kilde_container").html("");
    $(".kilde_container").fadeIn(1500);

    // Load kilden ind fra Json objekt: 

    $.get(JsonObj[runde].kilde, function(data) {
        var myvar = data;

        $(".kilde_container").append(myvar)

    });



    next_del_round();
}

function next_del_round() {
    $(".QuestionTask").html("");
    $(".dropdown").html("");
    $(".QuestionTask").html(JsonObj[runde].opts[delrunde].spm);

    for (var i = 0; i < JsonObj[runde].opts[delrunde].svarmuligheder.length; i++) {
        $(".dropdown").append("<option value='" + JsonObj[runde].opts[delrunde].svarmuligheder[i] + "'>" + JsonObj[runde].opts[delrunde].svarmuligheder[i] + "</option>");
    }

}

function check_answer() {
    if (korrekt_svar === true) {
        if (delrunde < JsonObj[runde].opts.length) {
            console.log("næste delrunde_spm");

            $(".analysetext").append("<span class='txt_tween'>" + JsonObj[runde].opts[delrunde].feedback + "</span>");
            $(".txt_tween").eq(delrunde).fadeOut(0);
            $(".txt_tween").eq(delrunde).fadeIn(600);
            delrunde++;
            next_del_round();
        } else {
            $(".spm_container").append("<div class='btn btn-default continue'>Næste kilde</div>")
            runde++;
            $(".continue").click(next_round);
        }
        console.log("move on");
        //update_text();
    } else {

    }
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
