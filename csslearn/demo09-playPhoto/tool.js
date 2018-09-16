/*
	获取元素的样式
	obj:要获取元素的对象
	name：需要获取的属性名
*/
function getStyle(obj,name){
	//geComputedStyle 其他浏览器正常获取属性，且ie8中没有getComputedStyle这个属性
	if (window.getComputedStyle) {
		return getComputedStyle(obj,null)[name];
	}else{
		//兼容IE8浏览器 
		return obj.currentStyle[name];
	}
}


/*
	为事件绑定函数
	obj:绑定函数的元素对象
	eventStr：绑定的事件名称
	callback：回调函数
	addEventListener()不支持IE8及以下的浏览器
	attachEvent()支持IE8及以下的浏览器
	 */
	function bind(obj,eventStr,callback){
		if (obj.addEventListener) {
			obj.addEventListener(eventStr,callback,false);
		}else{
			obj.attachEvent("on"+eventStr,function(){
				callback.call(obj);
			});
		}
	}

	//拖拽函数 obj：拖拽的元素对象
		function drag(obj){
				obj.onmousedown=function(event1){
				//兼容IE8
				obj.setCapture && obj.setCapture();
				event1=event1 || window.event1;
				var x=event1.clientX-this.offsetLeft;
				var y=event1.clientY-this.offsetTop;
				console.log("按下了");
				document.onmousemove=function(event){
					console.log("移动了");

					event=event || window.event;
					var left=event.clientX - x + "px";
					var top=event.clientY - y + "px";
					obj.style.left=left;
					obj.style.top=top;


			
				}
				document.onmouseup=function(){
				//释放box1的捕获
				obj.releaseCapture && obj.releaseCapture();
				console.log("抬起了");
				document.onmousemove=null;
				document.onmouseup=null;
			}
		   //释放浏览器的默认行为
			return false;

			}
		}

/*
	让一个元素移动起来	
	obj:要移动的元素对象
	atrr：移动对象的哪个属性
	target：要移动到的目标值
	speed：移动的速度
	callback：移动完毕的回调函数
*/
		function move(obj,atrr,target,speed,callback){
			    clearInterval(obj.timmer);
			    var current = parseInt(getStyle(obj,atrr));
				if (current > target) {
					speed=-speed;
				}
				obj.timmer = setInterval(function(){
				var oldValue=parseInt(getStyle(obj,atrr));
				var newValue=oldValue+speed;
				if ((speed < 0 && newValue < target) ||(speed > 0 && newValue >target) ) {
					newValue=target;
				}
				obj.style[atrr]=newValue+"px";
				if (newValue==target) {
					clearInterval(obj.timmer);
					callback && callback();
				}

			},100);

		}