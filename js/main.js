$(function () {
	AOS.init();

	$('.menu').click(openSidebar);
    $('.sidebar .close').click(closeSidebar);

    $('.sidebar nav a').click(closeSidebar);

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
	
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
});


function openSidebar() {
    var rect = $('.menu')[0].getBoundingClientRect();


    var menuWidth = 30;
    var closeWidth = 50;

    var diff = (closeWidth - menuWidth) / 2;

    var x = screen.width - rect.right - diff;
    var y = rect.top - diff;
    
    $('.sidebar .close').css('right', x + 'px');
    $('.sidebar .close').css('top', y + 'px');

    $('.sidebar').fadeIn(200);
}

function closeSidebar() {
    $('.sidebar').fadeOut(200);
}