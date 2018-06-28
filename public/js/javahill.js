

//Declare variable

var total = 0;




// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
    $('.navbar-toggle:visible').click();
});





//Function for deleting orders and subtracting money from order
function orderDelete(order) {

	let orderInfo = $(order).parent().text();

	negativeTotal = 0;

	negative = '';

	negative = orderInfo.match(/8/);

	if (negative == null) {
		
		negative = orderInfo.match(/4/);

		if (negative == null) {

			negative = orderInfo.match(/1/);

		}
	
	}

	negative = Number(negative);

	switch (negative) {
		case 1 :
			negativeTotal = 5;
			break;
		case 4 :
			negativeTotal = 10;
			break;
		case 8 :
			negativeTotal = 20;
			break;
		default :
			negativeTotal = 5;
			break;
	}

	$(order).parent('div').css('opacity', '0');

	setTimeout(function(){$(order).parent().remove()}, 1100);

	total -= negativeTotal;

	var totalString = parseInt(total);

	$('.checkoutDiv span').replaceWith('<span>' + totalString + '</span>');

	if ($('.order').children().length < 2) {
		
		$('.orderCard').css('opacity', '0');

		$('.portfolio-link img').css('filter', 'blur(0px)');

		$('<h5>Choose a coffee order and it will appear here</h5>').appendTo('.order');

	}

	negativeTotal.destroy();

	negative.destroy();
};




//Function for getting orders information and adding money to order
function productAdd(formInfo, formTop) {

	let productName = $(formInfo).children()[3].getAttribute('value');

	let optionsDiv = $(formInfo).children().get(5);

	let amount = $(formInfo).find('select option:selected').text();

	if(amount == 'Select an amount') {

		$(formTop).find('.orderCard > p').text('please pick an amount before ordering');

		return;
	}

	else {
		$(formTop).find('.orderCard > p').text('Check your order below!');
	}

	var order = $('<div><p>' + productName + ' ' + amount + '  ' + '</p><span class="orderDelete">X</span></div>');

	$('.order').append(order);

	amountConversion = Number(amount[0]);

	switch (amountConversion) {
		case 1:
			amountConversion = 5;
			break;
		case 4:
			amountConversion = 10;
			break;
		case 8:
			amountConversion = 20;
			break;
		default:
			amountConversion = 4;
			break;
	}

	total += amountConversion;

	var totalString = parseInt(total);

	$('.checkoutDiv span').replaceWith('<span>' + totalString + '</span>');

	$('.orderDelete').click(function() {
		
		orderDelete($(this));

	})

};



//Get form information to call productAdd function
$('form > span > img').click(function() {
		
	let formInfo = $(this).parent().parent()[0];

	let formTop = $(this).parent().parent().parent().parent().children()[0];

	$(formTop).children('img').css('filter', 'blur(2px)');

	$(formTop).children('div').css('opacity', '0.8');

	productAdd(formInfo, formTop);

	if ($('.order').has('h5')) {
		$('.order > h5').remove();
	}

})




// Sizes the header to be responsive with animations
$(document).ready(function() {

    var height = window.innerHeight;

	$('header > .container').css("height", height);

	$(window).resize(function() {

        height = window.innerHeight;

        $('header > .container').css("height", height);

	});

});