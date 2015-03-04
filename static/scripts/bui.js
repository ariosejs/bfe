(function($){

/* 
 * tips  
 * Copyright (c) 2015 QianCheng@chunbo http://ariose.me/ 
 * Date: 2015-02-10 
 * 遍历dom节点class包含tips且title值不为空，鼠标经过显示tips内容为title内容 
 */ 
	var tipsElem = $('.tips');
	var tipsBox;
	if(tipsElem.length > 0){
		tipsElem.each(function () {
			var tipsThis = $(this);
			var tipsTitle = tipsThis.attr('title');
			var tipsHtml = '<p class="tipsBox">'+tipsTitle+'<i></i></p>';
			if(tipsTitle){
				tipsThis.hover(function(){
					if($('.tipsBox').length > 0){
						tipsBox.stop();
						$('body').find('p.tipsBox').remove();
					}
					$('body').append(tipsHtml);
					tipsThis.attr('title','');
					tipsBox = $('.tipsBox');
					tipsBox.css({top:tipsThis.offset().top - tipsBox.outerHeight(),left:tipsThis.offset().left - tipsBox.outerWidth()/2 + tipsThis.outerWidth()/2,'opacity':'0'});
					tipsBox.animate({top:tipsBox.offset().top - 10,opacity:1},200);
				},function(){
					tipsBox.stop();
					tipsThis.attr('title',tipsTitle);
					tipsBox.animate({top:tipsBox.offset().top + 5,opacity:0},100,function(){
						$('body').find('p.tipsBox').remove();
					});
				});
			}
		});		
	}


/* 
 * dialog  
 * Copyright (c) 2015 QianCheng@chunbo http://ariose.me/ 
 * Date: 2015-02-10 
 * jQuery 类扩展 focus相关为安心度定制
 */ 
 	$.extend({
		dialog: function(options) {
			var defaults = {
				top: 50,
				width:400,
				height:300,
				maskLayer: 0.6,
				close: true,
				title:'',
				content:'',
				id:'',
				url:'',
				focus:false,
				data:[]
			};
			var maskLayer = $('<div class="mask"></div>');
			var dialogLayer = $('<div class="dialog"></div>');
			var dHtml = '<h2></h2>'
						+'<a href="#" class="close icon i-close"></a>'
						+'<div class="dialog-content"></div>'
						+'<div class="dialog-foot"></div>';
			options = $.extend(defaults, options);
			var o = options;
			var scrollTop = $(window).scrollTop();
			$('body').append(maskLayer).append(dialogLayer).addClass('dialogShow');
			$('body').css('margin-top',-scrollTop);
			dialogLayer.append(dHtml);
			dialogLayer.find('h2').text(o.title);
			dialogLayer.find('.dialog-content').html(o.content);
			dialogLayer.attr('id',o.id);
			o.close ? null : dialogLayer.find('.close').remove();
			maskLayer.fadeTo(200, o.maskLayer);
			maskLayer.click(function(){
				close_modal(dialogLayer);
			});
			$('a.close').click(function(e){
				e.preventDefault();
				close_modal(dialogLayer);
			});
			if(o.url.length > 5){
				dialogLayer.find('.dialog-content').html('<iframe frameborder="0" width="100%" height="100%" src="'+o.url+'"></iframe>');
				$('.dialog-content iframe').css({'margin':'30px -10px 0','width':o.width,'height':o.height,'overflow':'hidden'});
			}
			dialogLayer.show().css({'width':o.width,'height':o.height,'margin-left':-o.width/2}).animate({top:o.top,opacity:1},300,'linear');
			if(o.focus && o.data.length >= 1){
				$._dialogFocus(o.data);
			}
			$(window).resize(function(){
				togglePosition($(window).height());
			});
			togglePosition($(window).height());
			function togglePosition(winHeight){
				if(winHeight < dialogLayer.height() + 30){
					dialogLayer.css({'position':'absolute'});
					$('body').removeClass('dialogShow');
				
				}else{
					dialogLayer.css({'position':'fixed'});
					$('body').addClass('dialogShow');
				}
			}
			function close_modal(modal_id) {
				var top = $('body').css('margin-top').replace(/[^0-9]/ig,"");
				$('body').removeClass('dialogShow');
				$('body').attr('style',null).scrollTop(+top);
				maskLayer.fadeOut(200,function(){
					maskLayer.remove();
				});
				dialogLayer.animate({top:0,opacity:0},200,function(){
					dialogLayer.remove();
				});
			}
		},
		_dialogFocus: function(data){
			var focusHtml = '<div class="testReportList"><ul></ul></div>'
							+'<div class="testReportList-page"></div>'
							+'<a href="#" class="icon i-prev" id="testReport-prev"></a>'
							+'<a href="#" class="icon i-next" id="testReport-next"></a>';
			$('.dialog-content').html(focusHtml);
			
			for (var i = 0; i < data.length; i++) {
				$('.testReportList ul').append('<li><img src="'+data[i]+'"></li>');
			}
			$('body').off('click','#testReport-prev,#testReport-next');
			$('body').off('mouseenter','.testReportList li');
			$('.testReportList-page').html('');
			$('.i-prev').css({'left':-10,'opacity':0});
			$('.i-next').css({'right':-10,'opacity':0});
			$('.testReportList-page').css({'bottom':-8,'opacity':0});
			setTimeout(function(){
				$('.i-prev').animate({left:15,opacity:1},300);
				$('.i-next').animate({right:15,opacity:1},300);
				$('.testReportList-page').animate({bottom:8,opacity:1},300);
			}, 300);
			
			var reportList = $('.testReportList ul');
			var reportItem = $('.testReportList li');
			var movieOnce = reportItem.outerWidth() + 20;
			var listWidth = (reportItem.length*movieOnce)%(movieOnce*2) === 0 ? reportItem.length*movieOnce : reportItem.length*movieOnce+movieOnce;
			var reportPos = 0;
			reportList.css({'width':listWidth,'left':0});
			for(var i = 0; i < reportItem.length / 2; i++){
				$('.testReportList-page').append('<i></i>');
			}
			var pageNum = 0;
			var changePageNum = function (num){
				var pageI = $('.testReportList-page i');
				pageI.removeClass('on');
				pageI.eq(num).addClass('on');
			};
			changePageNum(pageNum);
			var showWidth,showHeight,RatioX,RatioY,
				naturWidth = 827,
				naturHeight = 1168;

			$('body').on('click','#testReport-prev,#testReport-next',function(e){
				e.preventDefault();
				if($(this).hasClass('i-prev')){
					reportPos = reportPos + movieOnce * 2;
					if(reportPos > 0){
						reportPos = -listWidth + movieOnce * 2;
						pageNum = Math.ceil(reportItem.length / 2) - 1;
					}else{
						pageNum--;
					}
				}else{
					reportPos = reportPos - movieOnce * 2;
					if(reportPos > -listWidth){
						pageNum++;
					}else{
						reportPos = 0;
						pageNum = 0;
					}
				}
				reportList.animate({left:reportPos},200);
				changePageNum(pageNum);
			}).on('mouseenter','.testReportList li',function(e){
				showWidth =  $(this).find('img').width();
				showHeight =  $(this).find('img').height();
				RatioX = (naturWidth-showWidth) / showWidth;
				RatioY = (naturHeight-showHeight) / showHeight;
				$(this).attr('class','hover');
				$(this).find('img').css({'width':naturWidth,'height':naturHeight});
			}).on('mouseleave','.testReportList li',function(e){
				$(this).attr('class','');
				$(this).find('img').css({'width':showWidth,'height':showHeight,'margin':0});
			}).on('mousemove','.testReportList li',function(e) {
				var posX = e.pageX - $(this).offset().left,
					posY = e.pageY - $(this).offset().top;
				$(this).find('img').css({'margin-left':-(posX*RatioX),'margin-top':-(posY*RatioY)});
			});
		}

		// TODO iframe & position





	});

})(jQuery);