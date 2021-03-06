

function toDecimal2(x) {    
	var f = parseFloat(x);
    f = Math.round(f * 100) / 100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
}

//function refreshShipMethod(shipToCountryCode){
//	$('#ns_loading_box').show();
//	var ordernum = $("#orderNum").val();
//	$.ajax({url: '/checkout/refresh-sm-guest', 
//		type: 'GET', 
//		data:{'orderNum' : ordernum,'shipToCountryCode' : shipToCountryCode}, 
//		dataType: 'html', 
//		timeout: 60000, 
//		error: function(){}, 
//		success: function(html){
//			$('#shipMethod').empty();
//			$('#shipMethod').append(html);
//			//$('#confirmOrderForm').find('input[name=shippingMethodIdValue]').val('');
//			
//			$('input[type=radio][name=shippingMethodIdValue]').change(function() {
//				calculateTotal();
//			});
//			calculateTotal();
//		},
//		complete: function(){
//			$('#ns_loading_box').hide();
//		}
//		}); 
//}

function ttAlert(tip){
	var errorBox = $('#errorBox');
	if(errorBox.length == 0){
		var ele = [];
		ele.push('<div id="errorBox" style="display: block" class="pu_pop popNone_s">');
		ele.push('<div class="ns_pop_box">');
		ele.push('<div class="btn_pop_close"></div>');
		ele.push('<div class="pop_title">');
		ele.push('<h3>Error</h3>');
		ele.push('</div>');
		
		ele.push('<div class="pop_con">');
		ele.push('<p id="errorBoxTxt"></p>');
		ele.push('</div>');
		ele.push('<div class="pop_input_box">');
		//ele.push('<input type="button" class="pop_input_close" value="CLOSE">');
		ele.push('<input id="errorBoxOkBtn" type="button" class="pop_input_confirm" value="OK">');
		ele.push('</div>');
		ele.push('</div>');
		ele.push('<div class="blockPopup_black"></div>');
		ele.push('</div>');
		$('body').append(ele.join(''));
		$('#errorBoxOkBtn').click(function() {
			$('#errorBox').hide();
		});
		$('#errorBox').find('.btn_pop_close').click(function() {
			$('#errorBox').hide();
		});
	}
	
	$('#errorBox').show();
	$('#errorBoxTxt').text((tip || ''));
}
function submitOrder(){
	$('#placeYourOrder').attr('disabled','disabled');
	var selectli = $("#ship_address_ul li.sel");
	var orderForm = {};
	selectli.find("span[name]").each(function(i,e){
		var node = $(this);
		var name = node.attr("name");
		var val = node.html();
		orderForm[name] = val;
	});
	
	//验证数据是否完整
	var valid = true;
	for (var attr in orderForm){
       if('address2' != attr){
   		   var value = orderForm[attr];
   		   if(!value){
					//ttAlert('Incomplete shipping address information');
					$('#shipAddressEdit').trigger('click');
					$("#province_list_id").hide();
					valid = false;
					break;
				}
			}
		}
	if(!valid){
		$('#placeYourOrder').removeAttr('disabled');
		return;
	}
//	var shippingMethodIdValue = $('input[name=shippingMethodIdValue]:checked').val();
//	if(!shippingMethodIdValue){
//		ttAlert('please select shipping method');
//		$('#placeYourOrder').removeAttr('disabled');
//		return;
//	}
//	orderForm['shippingMethodIdValue'] = shippingMethodIdValue;
	if(valid){
		$('#confirmOrderForm').find('input[name]').each(function(){
			var name = $(this).attr('name');
			var val = $(this).val();
			if(!val){
				val = orderForm[name];
				$(this).val(val);
			}
		});
		//传物流方式code
		var shipMethod = $('#shipping_method .sel').attr("code");
		var shipMethodId = $('#shipping_method .sel').attr("id");
        if(!shipMethod){
        	errorTip('please select shipping method');
        	return;
        }else{
        	$("#shipMethodCode").val(shipMethod);
        	$("#shipMethodId").val(shipMethodId);
        }
        
		var leaveMessage = $('#leaveMessage').val();
		$('#confirmOrderForm').find('textarea[name=leaveMessage]').val(leaveMessage);
		$('#confirmOrderForm').submit();
	}
	$('#placeYourOrder').removeAttr('disabled');
}

function valid() {
	var isValid = true;
	$('#ship_to_new_address_form').find('input[name]').each(function() {
		var name = $(this).attr('name');
		if ('address2' == name) {
			return true;
		}
		var value = $(this).val();
		if ('countryCode' == name && !value) {
			$('#country_label').show();
			isValid = false;
		} else if (!value) {
			$(this).next().show();
			isValid = false;
		}
	});
	return isValid;
}

function fillAddress() {
	var address = {};
	$('#ship_to_new_address_form').find('input[name]').each(function() {
		var name = $(this).attr('name');
		var value = $(this).val();
		address[name] = value || '';
	});
	var theCountryCode = $("#theCountryCode").val();
	$('#shipToFirstName').text(address.firstName);
	$('#shipToLastName').text(address.lastName);
	$('#shipToStreet1').text(address.address1);
	$('#shipToStreet2').text(address.address2);
	$('#shipToCity').text(address.city);
	$('#shipToState').text(address.province);
	$('#shipToZipCode').text(address.zipCode);
	var c = $('#country_text').text();
	$('#shipToCountry').text(c);
	$('#shipToTel').text(address.telephone);
	
	$("#shipToCountryCode").html(address.countryCode);
	$("#theCountryCode").val(address.countryCode);
	
	if(theCountryCode != address.countryCode){
		$('#shipping_method').empty();
		//refreshShipMethod(address.countryCode);
		refreshShipMethod();
	}
}

function calculateTotal(){
	var shipMethod = $('input[name=shippingMethodIdValue]:checked');
	var price = shipMethod.attr('price');
	if(price){
		var subtotal = $('#grandTotal').attr('total');
		subtotal = subtotal.replace(/,/g,'');
		price = price.replace(/,/g,'');
		//检查是否有小数点
		if(subtotal.indexOf('.') == -1){
			subtotal = parseInt(subtotal);
			price = parseInt(price);
			grandTotal = subtotal + price;
			$('#shipCost').text(price);
		}else{
			subtotal = parseFloat(subtotal);
			price = parseFloat(price);
			grandTotal = subtotal + price;
			//保留两位小数
			grandTotal = Math.round(grandTotal * 100) / 100;
			$('#shipCost').text(toDecimal2(price));
		}
		
		$('#grandTotal').empty();
		$('#grandTotal').text(grandTotal);
	}
}

	
$('#placeYourOrder').click(function() {
	submitOrder();
});

$('#ship_to_new_address_form').find('input[name]').blur(function() {
	var value = $(this).val();
	if (value) {
		$(this).next().hide();
	}
});

$('#shipAddressEdit').click(function() {
	$('#ship_to_new_address_form').find('input[name]').each(function() {
		var name = $(this).attr('name');
		if ('firstName' == name) {
			var fn = $('#shipToFirstName').text() || '';
			$(this).val(fn);
		} else if ('lastName' == name) {
			var fn = $('#shipToLastName').text() || '';
			$(this).val(fn);
		} else if ('address1' == name) {
			var fn = $('#shipToStreet1').text() || '';
			$(this).val(fn);
		} else if ('address2' == name) {
			var fn = $('#shipToStreet2').text() || '';
			$(this).val(fn);
		} else if ('city' == name) {
			var fn = $('#shipToCity').text() || '';
			$(this).val(fn);
		} else if ('province' == name) {
			var fn = $('#shipToState').text() || '';
			$(this).val(fn);
		} else if ('zipCode' == name) {
			var fn = $('#shipToZipCode').text() || '';
			$(this).val(fn);
		} else if ('telephone' == name) {
			var fn = $('#shipToTel').text() || '';
			$(this).val(fn);
		} else if ('countryCode' == name) {
			var fn = $('#shipToCountry').text() || '';
			fn = fn.toLocaleLowerCase();
			if (fn) {
				$("#country_select").find('li').each(function() {
					var text = $(this).text();
					text = text.toLowerCase();
					if (text == fn) {
						$(this).trigger('click');
						return false;
					}
				});
			}
		}
		$("#pop_address").show();
	});
});

$(".address_country").click(
		function() {
			$(this).parents(".newshopping_address_country").find(
					".country_all").toggle();
		});

$("#ship_to_new_address").click(function() {
	$("#pop_address").show();
});
$("#cancel_btn").click(function() {
	$("#pop_address").hide();
});
$("#ok_btn").click(function() {
	var isValid = valid();
	if (isValid) {
		fillAddress();
		$("#pop_address").hide();
	}
});
$("#country_select").find('li').click(function() {
	var code = $(this).attr('code');
	var text = $(this).text();
	$('#country_text').text(text);
	$('#country').val(code);
	$('#country_select').hide();
	$('#country_label').hide();
	
	$("#confirmOrderForm input[name='country']:eq(0)").val($(this).html());
	$("#confirmOrderForm input[name='countrysn']:eq(0)").val(code);
});
$('#search_country').keyup(function() {
	var value = $(this).val();
	$("#country_select").find('li').each(function() {
		var text = $(this).text();
		text = text.toLowerCase();
		if (text.indexOf(value.toLowerCase()) != 0) {
			$(this).hide();
		} else {
			$(this).show();
		}
	});
})

$(".have_code p").click(function() {
	$(this).parents(".have_code").find(".have_code_input").toggle();
});
	
	
$(function() {
	//告知用户邮寄国家不支持
	var shipToCountryCode = $("#shipToCountryCode").html();
	if(shipToCountryCode==null || shipToCountryCode==""){
		ttAlert('shipping unavailable');
	}else{
		refreshShipMethod();
	}
	
	var ns_left=parseInt($(".newshopping_box_right").offset().left)+"px";
    var ns_top=$(".newshopping_box_right").offset().top;
    var ns_position=$(".shopping_bottom").offset().top;
    var ns_h2=ns_position-$(".newshopping_box_right").height();
    $(window).scroll(ns_top, function(event) {
        if($(this).scrollTop()>event.data&&$(this).scrollTop()<ns_h2){
            $(".newshopping_box_right").css({"position":"fixed","z-index":"99","left":ns_left,"top":"40px","margin-top":"0px"})
        }else{
            $(".newshopping_box_right").css({"position":"inherit","margin-top":"70px"});
        }
    });
});