Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

$(function () {
    window.scrollTo(0, 0);
    
	const container = document.querySelector(".slide-container");
	const slides = document.querySelector(".slides");

	const containerRect = container.getBoundingClientRect();
	const slideRect = slides.getBoundingClientRect();

	const containerTop = containerRect.top;
	const containerHeight = containerRect.height;
	const slideWidth = slideRect.width;

	const scrollDistance = containerHeight - window.innerHeight;
	const slideDistance = slideWidth - window.innerWidth;

	const getProgress = (start, distance, scroll) => {
		return Math.min(1, Math.max(0, (scroll - start) / distance));
	};

	const handleScroll = () => {
		if(screen.width <= 1000) return;

		const scrollPos = window.scrollY;
		const progress = getProgress(containerTop, scrollDistance, scrollPos);

		slides.style.transform = `translateX(-${slideDistance * progress}px)`;
        
        applyProgressToItems(progress);
	};

	window.addEventListener("scroll", handleScroll);

});


function applyProgressToItems(progress) {
    if(progress <= 0) return;

    updateSlides(progress);
}




function updateSlides(percent) {
    var itemsCount = $('.slide').length;
	
	var range = 1 / itemsCount;
	
	var globalTop = 0;
	
	
	const gap = 40;
	
	var tops = {};
	
	for(var i = 0; i < itemsCount; i++) {
		var slide = $($('.slide')[i]);
		
		tops[i] = globalTop;
		if(itemsCount != i - 1) globalTop += slide.outerHeight() + gap;
		
		
	}
	
	globalTop -= $($('.slide')[itemsCount - 1]).outerHeight();
	
	var up = globalTop * percent;
	
	for(var i = 0; i < itemsCount; i++) {
		var slide = $($('.slide')[i]);
		
		var top = tops[i] - up;
		
		
		var min = range * i
		var max = min + range;
		
		var percentInRange = percent.map(0, 1, min, max);
		
		if(top < -10) {
			if(i == 0 && percent < 0.03) {
				slide.css('opacity', 1);
			} else {
				var opacity = top.map(0, 150, 0, 1);
				slide.css('opacity', opacity);
			}
			
		} else {
			
			if(i > 0) {
				var prevHeight = $($('.slide')[i - 1]).outerHeight() + gap;
				if(top > prevHeight) {
					var opacity = top.map(150, 0, 0, 1);
					slide.css('opacity', opacity);
				} else {
					slide.css('opacity', 1);
				}
			} else {
				slide.css('opacity', 1);
			}
			
			
		}
		
		slide.css('top', top + 'px');
	}
}