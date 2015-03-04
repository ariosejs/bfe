{% extends "../parent.tpl" %}

{% block styles %}
{% parent %}
{% endblock %}

{% block content %}
<div class="wrap Demo bui">
	<h1>Demo</h1>
	<h2>Tips</h2>
	<div class="viewCode">
		<div class="example">
			<a href="javascript:;" class="tips" title="这里 tips">small</a>  <a href="javascript:;" class="tips" title="这里是个tips这里是个tips这里是个tips这里是个tips">tips</a> <a href="javascript:;" class="tips" title="">null</a>
		</div>
		<textarea disabled="disabled">
<a href="#" class="tips" title="small tips">small tips</a>
<a href="#" class="tips" title="这里是个tips这里是个tips这里是个tips这里是个tips">tips</a>
<a href="#" class="tips" title="">null</a>
		</textarea>
		<i class="copyBtn icon i-copy"></i>
		<p>简介</p>
	</div>
	<h2>Dialog</h2>
	<div class="viewCode">
		<div class="example">
			<a href="#" class="btn btn-main act-dialog-def">default</a>
			<a href="#" class="btn btn-main act-dialog">option</a>
			<a href="#" class="btn btn-main act-dialog-url">iframe</a>
			<a href="#" class="act-dialog-focus btn btn-hot" focus-data="http://i1.chunboimg.com/group1/M00/00/7E/Cv4IbFTZnomAO0psAARScKU3pKI08..jpg;http://i0.chunboimg.com/group1/M00/00/7E/Cv4IdVTZnqCAPIldAAT-gRpQRVE26..jpg;http://i1.chunboimg.com/group1/M00/00/7E/Cv4IbFTZnoqALfJ_AAU24kFSXTA61..jpg;http://i1.chunboimg.com/group1/M00/00/7E/Cv4IdVTZnqGADG5LAAUs5NB0-YQ13..jpg;http://i0.chunboimg.com/group1/M00/00/7E/Cv4IbFTZnouAWJuDAAVlxJWw_1g51..jpg;http://i0.chunboimg.com/group1/M00/00/7E/Cv4IdVTZnqKAclKrAAV6SQlI-qc71..jpg;http://i1.chunboimg.com/group1/M00/00/7E/Cv4IbFTZnoyACTWWAAV7OyEdcRo80..jpg;http://i1.chunboimg.com/group1/M00/00/7E/Cv4IdVTZnqOAAGZkAAWAi1oYko073..jpg;http://i1.chunboimg.com/group1/M00/00/7E/Cv4IbFTZno2AE4Y0AAWBS0k2vGQ22..jpg;http://i1.chunboimg.com/group1/M00/00/7E/Cv4IdVTZnqSAInClAAWKCvyxPqQ35..jpg;http://i1.chunboimg.com/group1/M00/00/7E/Cv4IbFTZno2AI_hYAATdsHj4Rcg50..jpg">textReport1</a>

			<a href="#" class="act-dialog-focus btn btn-hot" focus-data="http://i1.chunboimg.com/group1/M00/00/85/Cv4IdVTasw-AN5KWAAWqHBWm8gQ42..jpg;http://i1.chunboimg.com/group1/M00/00/85/Cv4IbFTasvmAWeJYAAXQtKuQBZo28..jpg;http://i1.chunboimg.com/group1/M00/00/85/Cv4IdVTasxCAB6inAAbX5r1RlbU80..jpg;http://i1.chunboimg.com/group1/M00/00/85/Cv4IbFTasvqAMZ-hAAaU8Pb4Tsg27..jpg;http://i0.chunboimg.com/group1/M00/00/85/Cv4IdVTasxGAYNnAAAYz_EvR2gA05..jpg">textReport2</a>
		</div>
		<textarea disabled="disabled">
$.dialog();

$.dialog({width:200,height:140,maskLayer:0.3,close:false,title:'Title',content:'ariose<br><div class="dialog-foot"></div>'});

$.dialog({width:800,height:600,url:'http://www.chunbo.com/'});

$('.act-dialog-focus').on('click',function(){
	var data = $(this).attr('focus-data').split(';');
	$.dialog({width:840,height:600,top:30,focus:true,data:data,className:'dialog-focus'});
});
		</textarea>
		<i class="copyBtn icon i-copy"></i>
		<p>简介</p>
	</div>

	<div class="cc">这里是个里是个tips这里是个</div>

</div>


<!-- <script type="text/javascript" src="/r/j/ZeroClipboard.js"></script> -->
<!-- <script type="text/javascript" src="/r/j/cloud-zoom.1.0.2.js"></script>
 -->

{% endblock %}

{% block scripts %}
{% parent %}
{% endblock %}
