gsap.registerPlugin(ScrollTrigger);
const desktopNav = () => {
	if($(document).width() > 1200) {
		if ($(".contactUsSidebar").css("transform") != "none") {
			$(".contactUsSidebar").css("transform", "none");
		} else {
			$(".contactUsSidebar").css("transform", "translateX(calc(27.5vw + 50px))");
		}
	} else {
		if ($(".contactUsSidebar").css("clip-path") == "polygon(0px 0px, 100% 0px, 100% 0px, 0px 0px)") {
			$(".contactUsSidebar").css("clip-path", "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)");
		} else if ($(".contactUsSidebar").css("clip-path") == "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)") {
			$(".contactUsSidebar").css("clip-path", "polygon(0px 0px, 100% 0px, 100% 0px, 0px 0px)");
		}
	}
};
const initAnimations = () => {
    $('.preloader').addClass('hidden');
    $('body').removeClass('preloading');
    setTimeout(() => {
        $('.preloader').remove();
    }, 500);
    gsap.set(".hero", { backgroundPosition: "50% 50%" });
	let bgPositionY = $(".hero").css("background-position-y");
	bgPositionY = Number(bgPositionY.replace("%", ""));
	gsap.fromTo(".hero",
		{
			backgroundPosition: `50% ${bgPositionY}%`
		},
		{
			duration: 1,
			ease: "none",
			backgroundPositionY: `${bgPositionY - 60}%`,
			scrollTrigger: {
				trigger: ".hero",
				start: "top bottom",
				end: "bottom top",
				scrub: true,
			}
		}
	);
	gsap.from(".heroMainContentContainer", {
		duration: 1,
		y: 500,
		ease: "power2.out"
	});
	gsap.from(".hero", {
		backgroundPositionX: "500%",
		duration: 0.5,
		ease: "power2.out"
	});
}
const reviewsPositions = [
	"translateX(0)",
	"translateX(calc(-100% - 250px))",
	"translateX(calc(-200% - 500px))"
];
$(".slideControl").on("click", function() {
	$(".slideControl").removeClass("active");
})
$(".slideControl1").on("click", function() {
	$(".review").css("transform", reviewsPositions[0]);
	$(".slideControl1").addClass("active");
})
$(".slideControl2").on("click", function() {
	$(".review").css("transform", reviewsPositions[1])
	$(".slideControl2").addClass("active");
})
$(".slideControl3").on("click", function() {
	$(".review").css("transform", reviewsPositions[2])
	$(".slideControl3").addClass("active");
})
$(document).ready(function() {
    $('body').addClass('preloading');
    $('body').prepend(`
        <div class="preloader">
            <div class="loader"></div>
        </div>
    `);
    const img = new Image();
    let fallbackTimeout;
    img.onload = function() {
        clearTimeout(fallbackTimeout);
        initAnimations();
    };
    img.src = "./Images/heroImage1.png";
    fallbackTimeout = setTimeout(initAnimations, 3000);
});
