$(function () {
	for(var i=1;i<=2;i++)
	{
		
	}
	
	var canvas = document.getElementById('cSketchPad1');
	var $canvas = $("#cSketchPad1");		
	
	var ctx = $("#cSketchPad1").get(0).getContext("2d");
	ctx.lineCap = "round";
	var drawMode = false;
	
	$canvas.mousedown(function (e) {
		ctx.beginPath();
		ctx.strokeStyle = "orange";
		ctx.lineWidth = "2px";
		ctx.moveTo(e.pageX - $canvas.position().left, e.pageY - $canvas.position().top);
		drawMode = true;
	})
	
	$canvas.mousemove(function (e) {
		if (drawMode) {
			//var canvas = document.getElementById('cSketchPad');
			var X = e.pageX;
			var Y = e.pageY;			
			
			ctx.lineTo(e.pageX - $canvas.position().left, e.pageY - $canvas.position().top);
			ctx.stroke();
		}
	})
	
	$canvas.mouseup(function (e) {
		drawMode = false;
	});
	
	$canvas.css("display","none");					
	
	var canvas2 = document.getElementById('cSketchPad2');
	var $canvas2 = $("#cSketchPad2");		
	
	var ctx2 = $("#cSketchPad2").get(0).getContext("2d");
	ctx2.lineCap = "round";
	var drawMode = false;
	
	$canvas2.mousedown(function (e) {
		ctx2.beginPath();
		ctx2.strokeStyle = "orange";
		ctx2.lineWidth = "2px";
		ctx2.moveTo(e.pageX - $canvas2.position().left, e.pageY - $canvas2.position().top);
		drawMode = true;
	})
	
	$canvas2.mousemove(function (e) {
		if (drawMode) {
			//var canvas = document.getElementById('cSketchPad');
			var X = e.pageX;
			var Y = e.pageY;			
			
			ctx2.lineTo(e.pageX - $canvas2.position().left, e.pageY - $canvas2.position().top);
			ctx2.stroke();
		}
	})
	
	$canvas2.mouseup(function (e) {
		drawMode = false;	
	});
	
	$canvas2.css("display","none");		
	
});