function number_format(number, decimals, decPoint, thousandsSep){
	
	/* http://locutus.io/php/strings/number_format/ 
		
		#	code	expected result
		1	number_format(1234.56)	'1,235'
		2	number_format(1234.56, 2, ',', ' ')	'1 234,56'
		3	number_format(1234.5678, 2, '.', '')	'1234.57'
		4	number_format(67, 2, ',', '.')	'67,00'
		5	number_format(1000)	'1,000'
		6	number_format(67.311, 2)	'67.31'
		7	number_format(1000.55, 1)	'1,000.6'
		8	number_format(67000, 5, ',', '.')	'67.000,00000'
		9	number_format(0.9, 0)	'1'
		10	number_format('1.20', 2)	'1.20'
		11	number_format('1.20', 4)	'1.2000'
		12	number_format('1.2000', 3)	'1.200'
		13	number_format('1 000,50', 2, '.', ' ')	'100 050.00'
		14	number_format(1e-8, 8, '.', '')	'0.00000001'
		
	 */
	
	number 												= (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n 													= !isFinite(+number) ? 0 : +number;
	var prec 												= !isFinite(+decimals) ? 0 : Math.abs(decimals);
	var sep 												= (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
	var dec 												= (typeof decPoint === 'undefined') ? '.' : decPoint;
	var s 													= '';
	
	var toFixedFix 									= function (n, prec) {
		var k 												= Math.pow(10, prec);
		return '' + (Math.round(n * k) / k).toFixed(prec);
	};
	
	s 															= (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	
	if (s[0].length > 3) {
		s[0] 												= s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	
	if ((s[1] || '').length < prec) {
    	s[1] 												= s[1] || '';
		s[1] 												+= new Array(prec - s[1].length + 1).join('0');
	}
	
	return s.join(dec);
  
};

function is_Valid_EmailAddress(emailAddress){

    var pattern											= /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
	
}

function contains_special_characters(input){

    var pattern											= /^[\w.\-]+$/i;
    return pattern.test(input);
	
	/////// http://stackoverflow.com/questions/13946651/matching-special-characters-and-letters-in-regex
	
}

function is_Valid_PhoneNumber(phone){

    var pattern											= /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/i;
    return pattern.test(phone);
	
}

function is_Valid_BirthDate(date){

    var pattern											= /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i;
    return pattern.test(date);
	
}

function is_Valid_Number(number){

	var verdict											= isNaN(number) ? false : true;
	return verdict;

}

function is_Valid_CardDate(number){
	
	var currentMonth 							= new Date().getMonth();
	currentMonth 								= parseInt(currentMonth)+1;
	var currentYear 								= new Date().getFullYear().toString().substr(2,2);
	currentYear 									= parseInt(currentYear);
	
	var part1 										= parseInt(number.substr(0, 2));
	var part2 										= parseInt(number.substr(2, 2));

	if( part1 < 1 || part1 > 12 || ( part2 === currentYear && part1 < currentMonth) )return false;
	if( part2 < 1 || part2 < currentYear)return false;
	return true;

}

function is_Possible_AccountBalance_Purchase(one,two){

	if ( parseFloat(one) < parseFloat(two) )return false;
	return true;
	
}

/****************************** EXPORT FOR APPCELERATOR ******************************/

var exportFunctions 													= {
	
	number_format: function(number, decimals, decPoint, thousandsSep){
		return number_format(number, decimals, decPoint, thousandsSep);
	},
	
	is_Valid_EmailAddress: function(emailAddress){
		return is_Valid_EmailAddress(emailAddress);
	},
	
	contains_special_characters: function(input){
		return contains_special_characters(input);
	},

	is_Valid_PhoneNumber: function(phone){
		return is_Valid_PhoneNumber(phone);
	},
	
	is_Valid_BirthDate: function(date){
		return is_Valid_BirthDate(date);
	},
	
	is_Valid_Number: function(number){
		return is_Valid_Number(number);
	},
	
	is_Valid_CardDate: function(number){
		return is_Valid_CardDate(number);
	},
	
	is_Possible_AccountBalance_Purchase: function(one,two){
		return is_Possible_AccountBalance_Purchase(one,two);
	}
	
};

module.exports 															= exportFunctions;