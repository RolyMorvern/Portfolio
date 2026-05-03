const showMobileNav = () => {
	if ($(".mobileNav").css("display") == "none") {
		$(".mobileNav").fadeIn("fast");
		$(".mobileNav").css("display", "flex");
        $("body").css("overflow", "hidden");
	} else {
		$(".mobileNav").fadeOut("fast");
        $("body").css("overflow", "visible");
	}
}
const galleryImageList = [
    "./Images/gallery1.jpg",
    "./Images/gallery2.jpg",
    "./Images/gallery3.jpg",
    "./Images/gallery4.jpg",
    "./Images/gallery5.jpg",
    "./Images/gallery6.jpg",
];
let i = 0;
const changeImg = (direction) => {
    $(".gallery").fadeOut(150, function() {
        $(".galleryCircle").removeClass("galleryCircleActive");
        if (direction === "forward") {
            i = (i + 1) % galleryImageList.length;
            console.log(`.galleryCircle${i}`)
            $(`.galleryCircle${i}`).removeClass("galleryCircleActive");
            $(`.galleryCircle${i == galleryImageList.length ? 0 : i + 1}`).addClass("galleryCircleActive");
        } else if (direction === "back") {
            i = (i - 1 + galleryImageList.length) % galleryImageList.length;
        }
        $(`.galleryCircle${i + 1}`).addClass("galleryCircleActive");
        $(this)
            .css("background-image", `url("${galleryImageList[i]}")`)
            .fadeIn(150);
    });
};
const automaticImgChange = () => {
    changeImg("forward");
    setTimeout(automaticImgChange, 5000);
};
const setActive = (previousElement, element) => {
    $(previousElement + "NavTitle").removeClass("active");
    $(element + "NavTitle").addClass("active");
};
const reverseSetActive = (previousElement, element) => {
    $(previousElement + "NavTitle").addClass("active");
    $(element + "NavTitle").removeClass("active");
};

window.onload = function() {
    automaticImgChange();
};
const scrollAbout = (id) => {
    let offset = 0;
    if ($(window).width() > 900) {
        offset = $(".scrollNavDesktop").outerHeight() || 75;
    }
    $('html, body').animate({ 
        scrollTop: $(id).offset().top - offset 
    });
};
$(".mobileNavLink").on("click", () => {
    $("body").css("overflow-y", "visible");
    $(".mobileNav").css("display", "none");
    $("#menuIcon").prop("checked", false);
})
$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(".scrollNavDesktop", { y: -100, opacity: 0, width: "100vw" });
    const navHeight = $(".scrollNavDesktop").outerHeight();
    ScrollTrigger.create({
        trigger: ".hero",
        start: `bottom-=${navHeight} 1px`,
        end: "+=100",
        toggleActions: "play none none reverse", 
        onEnter: () => {
            gsap.to(".scrollNavDesktop", {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                width: "100vw"
            });
        },
        onLeaveBack: () => {
            gsap.to(".scrollNavDesktop", {
                y: -100,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                width: "100vw"
            });
        }
    });
    ScrollTrigger.create({
        trigger: ".moreInfo",
        start: "top-=100px top",
        onEnter: () => {
        setActive(".aboutUs", ".moreInfo");
      },
      onLeaveBack: () => {
        reverseSetActive(".aboutUs", ".moreInfo");
      }
    });
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault(); 
        const targetId = $(this).attr('href');
        scrollAbout(targetId); 
    });
    window.onload = function() {
        automaticImgChange();
    };
});