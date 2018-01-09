$(document).ready(function()
{    $("#check").click(function() {

if (!$("input[@name=q1]:checked").val()

) {
alert("You're not done yet!");
}

else {

  function eraseText() {
    document.getElementById("check").value = "";
}

// ovde se menja kviz

var cat1 = ($("input[@name=q1]:checked").val() != "a");
var cat2 = ($("input[@name=q1]:checked").val() == "a");




if (cat1) { $("#category1").show("slow");$("#category2").hide("slow"); };
if (cat2) { $("#category2").show("slow"); $("#category1").hide("slow"); };


{ $("#closing").show("slow"); };
}
    });});
