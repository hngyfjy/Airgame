//javascript document
/*
 * 模态窗口
 * author:fengjuyuan
 * time:2016-01-20
 * 
 * @param string 传入链接的祖父元素id值  例：若 ul>li>a  则传入ul的id值
 * 
 */

window.addEventListener('load',setImitate('menu'),false);

function setImitate(parEle){
	//获取文档父元素
	var oBody = document.getElementsByTagName('body')[0];

	//获取触发元素
	var oEle = document.getElementById(parEle);
	var oAEle = oEle.getElementsByTagName('a');

	//创建窗口
	var oDiv = document.createElement('div'); //灰色背景
	var oChildDiv = document.createElement('div'); //提示框DIV
	var oStrong = document.createElement('strong'); //提示信息元素
	var oEm = document.createElement('em');
	var oTrueBtn = document.createElement('a'); //确认按钮
	var oFalseBtn = document.createElement('a'); //取消按钮

	//将元素添加到文档中
	oBody.appendChild(oDiv);
	oDiv.appendChild(oChildDiv);
	oChildDiv.appendChild(oStrong);
	oChildDiv.appendChild(oEm);
	oChildDiv.appendChild(oTrueBtn);
	oChildDiv.appendChild(oFalseBtn);

	//设置元素样式
	
	//底层元素
	oDiv.style.display = 'none';
	oDiv.style.width = 100 + '%';
	oDiv.style.height = 100 + '%';
	oDiv.style.background = "#000";
	oDiv.style.position = 'fixed';
	oDiv.style.zIndex = 10000;
	oDiv.style.top = 0 + 'px';
	oDiv.style.left =  0 + 'px';
	oDiv.style.opacity = 0.8;

	//提示信息包含框
	oChildDiv.style.width = 500 + 'px';
	oChildDiv.style.height = 220 + 'px';
	oChildDiv.style.background = "#fff";
	oChildDiv.style.position = 'absolute';
	oChildDiv.style.zIndex = 100010;
	oChildDiv.style.top = 50 + '%';
	oChildDiv.style.left =  50 + '%';
	oChildDiv.style.marginTop = -parseInt(oChildDiv.style.height) / 2 + 'px';
	oChildDiv.style.marginLeft = -parseInt(oChildDiv.style.width) / 2 + 'px';
	oChildDiv.style.overflow = 'hidden';

	//提示信息
	oStrong.style.display = 'block';
	oStrong.style.width = 500 + 'px';
	oStrong.style.height = 50 + 'px';
	oStrong.style.lineHeight = oStrong.style.height;
	oStrong.style.paddingLeft = 20 + 'px';
	oStrong.style.background = "#fff";
	oStrong.style.position = 'absolute';
	oStrong.style.zIndex = 100100;
	oStrong.style.top = 0;
	oStrong.style.left = 0;
	oStrong.style.borderBottom = '2px solid #2aad6f';
	oStrong.style.fontSize = 20+'px';
	oStrong.style.fontWeight = 'bold';
	oStrong.style.color = '#333';

	//主体提示信息
	oEm.style.display = 'block';
	oEm.style.width = 500 + 'px';
	oEm.style.height = 40 + 'px';
	oEm.style.lineHeight = oEm.style.height;
	oEm.style.background = "#fff";
	oEm.style.position = 'absolute';
	oEm.style.zIndex = 100100;
	oEm.style.top = 80 + 'px';
	oEm.style.left = 0;
	oEm.style.fontSize = 22+'px';
	oEm.style.color = '#333';
	oEm.style.fontStyle = 'normal';
	oEm.style.textAlign = 'center';
	oEm.style.fontWeight = 'bold';

	//确认按钮
	oTrueBtn.style.display = 'block';
	oTrueBtn.style.width = 100 + 'px';
	oTrueBtn.style.height = 40 + 'px';
	oTrueBtn.style.lineHeight = oTrueBtn.style.height;
	oTrueBtn.style.background = "#2aad6f";
	oTrueBtn.style.position = 'absolute';
	oTrueBtn.style.zIndex = 100100;
	oTrueBtn.style.top = 150 + 'px';
	oTrueBtn.style.left = 105 + 'px';
	oTrueBtn.style.fontSize = 20+'px';
	oTrueBtn.style.color = '#fff';
	oTrueBtn.style.fontStyle = 'normal';
	oTrueBtn.style.textAlign = 'center';
	oTrueBtn.style.border = '1px solid #2aad6f';
	oTrueBtn.style.cursor = 'pointer';
	oTrueBtn.style.borderRadius = '8px';

	//取消按钮
	oFalseBtn.style.display = 'block';
	oFalseBtn.style.width = oTrueBtn.style.width;
	oFalseBtn.style.height = oTrueBtn.style.height;
	oFalseBtn.style.lineHeight = oFalseBtn.style.height;
	oFalseBtn.style.background = "#fff";
	oFalseBtn.style.position = 'absolute';
	oFalseBtn.style.zIndex = 100100;
	oFalseBtn.style.top = oTrueBtn.style.top;
	oFalseBtn.style.right = oTrueBtn.style.left;
	oFalseBtn.style.fontSize = oTrueBtn.style.fontSize;
	oFalseBtn.style.color = '#333';
	oFalseBtn.style.fontStyle = 'normal';
	oFalseBtn.style.textAlign = 'center';
	oFalseBtn.style.border = oTrueBtn.style.border;
	oFalseBtn.style.cursor = oTrueBtn.style.cursor;
	oFalseBtn.style.borderRadius = oTrueBtn.style.borderRadius;

	//默认信息
	oStrong.innerHTML = '提示信息';
	oTrueBtn.innerHTML = '是';
	oFalseBtn.innerHTML = '否';

	//为元素赋ID属性值
	var len = oAEle.length;

	//为元素循环添加事件
	for (var j=0; j<len; j++) {
		oAEle[j].onclick = function(){
			oDiv.style.display = 'block';	//显示模态窗口
			oEm.innerHTML = this.innerHTML; //将元素信息添加到模态窗口中

			var goLink = this.href; //获取元素链接
			
			//确认按钮跳转链接
			oTrueBtn.onclick = function(){
				oDiv.style.display = 'none';
				this.href = goLink;
				return true;
			}


			//点击取消按钮隐藏模态窗口，清空goLink
			oFalseBtn.onclick = function(){
				goLink = null;
				oDiv.style.display = 'none';
				return false;
			}

			return false;
		}
	}
}