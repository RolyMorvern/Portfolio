$(".mobileMenuIcon").click(() => {
    if ($(".navLinks").css("display") === "none") {
        $(".navLinks").css("display", "flex").hide().fadeIn();
    	$("body").css("overflow", "hidden")
    } else {
        $(".navLinks").fadeOut();
    	$("body").css("overflow", "visible")
    }
});


