function loadData(url) {
     $.ajax({
         url: url,
         // contentType: "application/json; charset=utf-8",  // Blot en test af tegnsaettet....
         //dataType: 'json', // <------ VIGTIGT: Saadan boer en angivelse til en JSON-fil vaere! 
         dataType: 'text', // <------ VIGTIGT: Pga. ???, saa bliver vi noedt til at angive JSON som text. 
         async: false, // <------ VIGTIGT: Sikring af at JSON hentes i den rigtige raekkefoelge (ikke asynkront). 
         success: function(data, textStatus, jqXHR) {


             JsonObj = jQuery.parseJSON(data);

             // Alt data JsonObj foeres over i arrays:
             for (var Key in JsonObj) {
                 //console.log(JsonObj[Key].English);
                 console.log(Key)

                 /*)word_Array.push(JsonObj[Key].English);
                 transArray.push(JsonObj[Key].Dansk);
                 correct_Array.push(JsonObj[Key].Correct);
                 feedback_Array.push(JsonObj[Key].Explanation);

                 if (JsonObj[Key].Correct !== "2") {
                     antal_korrekte++;
                 }
             }*/

             $(".correct").html("Correct answers: <b>" + score + " / " + antal_korrekte + " </b> Attempts: <b>" + attempts + "</b>");
             init();
         },
         error: function(jqXHR, textStatus, errorThrown) {
             alert("Error!!!\njqXHR:" + jqXHR + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
         }
     });
 }