$(function(){$(".btn_alert_close").click(function(){$(this).parents(".pop_layer").hide();});$(".sel_country h3").click(function(){$(this).parent().find(".allcountry").toggle();});$(".sel_currency h3").click(function(){$(this).parent().find(".allcurrency").toggle();});$(".sel_lang h3").click(function(){$(this).parent().find(".all_lang").toggle();});$(".allcountry_list li").click(function(){var flagClass=$(this).attr("class");var flagName=$(this).find("span").html();$(this).parents(".alert_sel_box").find("h3").removeClass().addClass(flagClass).find("span").html(flagName);$(this).parents(".allcountry").hide();});$('.country_search').keyup(function(q){var regstr=$(this).val()+".*";var reg=new RegExp(regstr,"i");$(".allcountry_list li").each(function(i){$(this).hide();});$(".allcountry_list li").each(function(i){if($.trim($(this).html())!=""){console.info($(this).children("span").html());if(reg.test($(this).children("span").html().toLowerCase())){$(this).show();}else{$(this).hide();}}});});});