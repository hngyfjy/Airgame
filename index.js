(function(){
	//创建游戏背景
	var box = document.getElementById('box');
	box.style.background = 'url(./bg.jpg)';

	//获取背景宽度、高度作为飞机向左、向上移动的最大值
	var boxWidth = parseInt(window.getComputedStyle(box).width);
	var boxHeight = parseInt(window.getComputedStyle(box).height);

	//获取终极技能
	var tnt = document.getElementById('tnt');
	var tntCount = 3;

	//创建用户飞机
	var uAir = document.createElement('span');
	uAir.style.background = 'url(./me.png) no-repeat';
	uAir.id = 'userAir';
	box.appendChild(uAir);

	//获取用户飞机
	var userAir = document.getElementById('userAir');

	//获取飞机宽度高度
	var airWidth = parseInt(window.getComputedStyle(userAir).width);
	var airHeight = parseInt(window.getComputedStyle(userAir).height);

	//创建敌机导弹盒子
	var comAirBulletBox = document.createElement('div');
	comAirBulletBox.id = 'comAirBox';
	box.appendChild(comAirBulletBox);

	//获取敌机导弹盒子
	var comAirBox = document.getElementById('comAirBox');

	//获取敌机元素父标签
	var computerAirs = document.getElementById('computerAirs');

	//获取分数容器
	var scoreBox = document.getElementById('userScore');

	//创建分数
	var userScore = 0;
	var setUserScore = setInterval(function(){
		userScore += 1;
		scoreBox.innerHTML = userScore + 1;
	},100);

	//创建导弹
	var bullet = [];
	var i = 0;
	var k = 0;

	function createBulletFunc(userAirLeft){
		var createBullet = document.createElement('img');
		createBullet.src = './b.png';
		createBullet.className = 'bullet';
		createBullet.id = 'bullet'+i;
		box.appendChild(createBullet);
		
		//获取导弹
		bullet[i] = document.getElementById('bullet'+i);
		
		//初始化导弹位置，left：用户飞机左侧距离+（用户飞机宽度的一半）-4（位置微调）。top：用户飞机距顶部距离。
		bullet[i].style.left = userAirLeft + (airWidth / 2) - 4 + 'px';
		bullet[i].style.top = userAir.offsetTop + 'px';
		
		//每创建一个导弹i+1
		i++;
		
		k = i-1;
		
		return bullet[k];
	}

	//移动步长
	var moveRange = 10;

	//开启导弹自动发射
	var bulletAuto = setInterval(function(){
		var airLeft = userAir.offsetLeft;
		bullet = createBullet(airLeft);
	},500);

	//方向键及空格键事件
	window.onkeydown = function(ent){
		var event = ent || window.event;
		//上:38  右:39  下:40 左:37
		switch (event.keyCode) {
			//关闭手动发射导弹按钮
			/*case 32:
				//当按下空格键时，发射导弹
				var airLeft = userAir.offsetLeft;
				bullet = createBullet(airLeft);
				break;*/
				
			case 37:
				//当向左移动时，若用户飞机距游戏界面大于0时，则正常移动
				if (userAir.offsetLeft > (0 - (airWidth / 2))) {
					userAir.style.left = userAir.offsetLeft - moveRange + 'px';

					//调用撞机函数
					userAirHit(userAir);
					//当导弹的顶距离大于飞机的顶距离时，导弹不向左移动；
					if (!(bullet.offsetTop < userAir.offsetTop)) {
						bullet.style.left = bullet.offsetLeft - moveRange + 'px';
					}
				}
				break;
				
			case 38:
				//当向上移动时，若用户飞机位置大于背景宽度时，则正常移动
				if (userAir.offsetTop > (0 - (airHeight/2))) {
					userAir.style.top = userAir.offsetTop - moveRange +'px';

					//调用撞机函数
					userAirHit(userAir);
				}
				break;
				
			case 39:
				//当向右移动时，若用户飞机距游戏界面小于背景宽度时，则正常移动
				if (userAir.offsetLeft <= (boxWidth - (airWidth/2))) {
					userAir.style.left = userAir.offsetLeft + moveRange +'px';

					//调用撞机函数
					userAirHit(userAir);
					
					//当导弹的顶距离大于飞机的顶距离时，导弹不向右移动；
					if (!(bullet.offsetTop < userAir.offsetTop)) {
						bullet.style.left = bullet.offsetLeft + moveRange +'px';
					}
					
				}
				break;
				//当向下移动时，若用户飞机位置小于背景宽度时，则正常移动
			case 40:
				if (userAir.offsetTop < (boxHeight - (airHeight/2))) {
					userAir.style.top = userAir.offsetTop + moveRange +'px';

					//调用撞机函数
					userAirHit(userAir);
				}
				break;
			case 66:
				if (tntCount > 0) {
					tnt.style.background = 'radial-gradient(#f00,#ff0)';
					getTNT();
					tntCount--;
				}
				break;
				
		}
	}

	window.onkeyup = function(ent){
		var event = ent || window.event;
		if (event.keyCode == 66) {
			tnt.style.background = 'radial-gradient(#ff0,#f00)';
		}
	}

	//创建导弹运动函数
	var timer = [];

	function createBullet(airLeft){
		//创建导弹  导弹保存为数组
		var bullet = createBulletFunc(airLeft);
		
		//开启setInterval使导弹运行
		timer = setInterval(function(){
			bullet.style.top = bullet.offsetTop - moveRange + 'px';

			bulletHit(bullet);
			
			if (bullet.offsetTop < 0) {
				box.removeChild(bullet);
				clearInterval(timer[k]);
			}
		},100);

		
		return bullet;
	}

	var j = 0;
	//创建敌机
	function createComAir(){
		var computerAir = document.createElement('img');
		computerAir.id = j;
		rand = getRandom(1,3);
		computerAir.src = rand + '.png';
		computerAir.setAttribute('data','1');
		computerAir.setAttribute('datamodel',rand);
		
		computerAirs.appendChild(computerAir);
		
		var comAir = document.getElementById(j);
		j++;
		return comAir;
	}

	//设置敌机移动事件
	var comAirTimer = '';
	function comAirMove(checkStr){
		var checkCreate = checkStr ? true : false;
		if(checkCreate){
			comAirTimer = setInterval(function(){
				var comAir = createComAir();
				comAir.style.left = getRandom(50,boxWidth) + 'px';
				
				var timer = setInterval(function(){
					comAir.style.top = comAir.offsetTop + moveRange + 'px';
					userAirHit(userAir);
					if (parseInt(comAir.style.top) > boxHeight) {
						computerAirs.removeChild(comAir);
					}
				},100);
			},2000);
		}
	}

	comAirMove(true);

	/*
	 * 导弹命中函数
	 * 
	 * 发射导弹时调用
	 * 
	 * @param object userBullet 用户导弹
	 * 
	 * 当导弹顶部距离小于（飞机顶部距离+飞机高度）时，并且导弹offsetLeft值在飞机offsetLeft值与（offsetLeft值+飞机宽度时）之间时，敌机爆炸。
	 * 
	 */
	//存储礼物
	var funcs = [];

	function bulletHit(userBullet){
		//导弹位置
		var bulletLeft = userBullet.offsetLeft;
		var bulletTop = userBullet.offsetTop;
		
		//获取所有敌机
		var comAirs = computerAirs.getElementsByTagName('img');
		var len = comAirs.length;
		
		for (var s=0; s<len; s++) {
			//获取敌机信息：左边距、上边距、宽度、高度
			var comAirLeft = comAirs[s].offsetLeft;
			var comAirTop = comAirs[s].offsetTop;
			var comAirData = comAirs[s].getAttribute('data');
			var comAirWidth = parseInt(window.getComputedStyle(comAirs[s]).width);
			var comAirHeight = parseInt(window.getComputedStyle(comAirs[s]).height);
			
			if (comAirData == '1') {
				if ((bulletTop < (comAirTop + comAirHeight)) && (bulletLeft > comAirLeft) && (bulletLeft < (comAirLeft + comAirWidth))) {
					var comAirId = comAirs[s].id;
					
					comAirs[s].setAttribute('data','0');
					var airModel = comAirs[s].getAttribute('datamodel');
					
					//击中敌机加分
					switch(airModel){
						case '1':
							userScore += 1000;
							break;
						case '2':
							userScore += 500;
							break;
						case '3':
							userScore += 100;
							break;
					}
					
					//击中后删除导弹
					box.removeChild(userBullet);
					
					//获取敌机元素、改变src
					var killAir = document.getElementById(comAirId);
					killAir.src = './boom.gif';
					
					//移除敌机
					setTimeout(function(){
						computerAirs.removeChild(killAir);
					},1000)
				}
			}
			
		}
	}

	/*
	 * 撞机函数
	 * 
	 * 撞击时调用
	 * 
	 * @param object userAir 用户飞机
	 * 
	 * 当玩家飞机顶部距离小于（敌机顶部距离+敌机高度时）并且（在玩家飞机向左移动时，（（玩家飞机左边距离+玩家飞机宽度）大于敌机左边距离，
	 * 小于（敌机左边距离+敌机宽度）时，玩家飞机被撞毁）或者（在玩家飞机向右移动时，玩家飞机左边距大于敌机左边距 并且 小于（敌机左边距+敌机宽度）时，飞机坠毁；
	 * 
	 */
	function userAirHit(userAir){
		//飞机位置
		var userLeft = userAir.offsetLeft;
		var userTop = userAir.offsetTop;
		
		//获取所有敌机
		var comAirs = computerAirs.getElementsByTagName('img');
		var len = comAirs.length;
		
		for (var s=0; s<len; s++) {
			//获取敌机信息：左边距、上边距、宽度、高度
			var comAirLeft = comAirs[s].offsetLeft;
			var comAirTop = comAirs[s].offsetTop;
			var comAirData = comAirs[s].getAttribute('data');
			var comAirWidth = parseInt(window.getComputedStyle(comAirs[s]).width);
			var comAirHeight = parseInt(window.getComputedStyle(comAirs[s]).height);
			
			if (comAirData == '1') {
				if ((userTop < (comAirTop + comAirWidth)) && (((comAirLeft < userLeft) && (userLeft < (comAirLeft + comAirWidth))) || ((comAirLeft < (userLeft + airWidth))&&((userLeft + airWidth) < (comAirLeft + comAirWidth))))) {
					var comAirId = comAirs[s].id;
					comAirs[s].setAttribute('data','0');

					//获取敌机元素、改变src
					var killAir = document.getElementById(comAirId);
					killAir.src = './boom.gif';
					userAir.style.background = 'url(./boom.gif) no-repeat';

					setTimeout(function(){
						userAir.style.display = 'none';
						computerAirs.removeChild(killAir);
					},1000);
					clearInterval(comAirTimer);
					clearInterval(bulletAuto);
					clearInterval(setUserScore);
					setImitate();
				}
			}
		}
	}

	//设置终极技能释放规则
	function getTNT(){
		var comAirs = document.getElementsByTagName('strong');
		var tntBox = document.getElementById('tntBox');
		if (!tntBox){
			var tBox = document.createElement('div');
			tBox.id = 'tntBox';
			box.appendChild(tBox);
			tntBox = document.getElementById('tntBox');
		}
		var len = comAirs.length;
		box.removeChild(computerAirs);

		var createComAirBox = document.createElement('span');
		createComAirBox.id = 'computerAirs';
		box.appendChild(createComAirBox);
		computerAirs = document.getElementById('computerAirs');
		
		//创建爆炸场景
		for (var r=0; r<3; r++) {
			var tntBoxEle = document.createElement('img');
			tntBoxEle.src = 'boom.gif';
			tntBox.appendChild(tntBoxEle);
		}
		
		//设置爆炸图片位置
		var tntBoxEles = tntBox.getElementsByTagName('img');
		tntBoxEles[0].style.left = 50 + 'px';
		tntBoxEles[0].style.top = 50 + 'px';
		tntBoxEles[1].style.left = 100 + 'px';
		tntBoxEles[1].style.top = 400 + 'px';
		tntBoxEles[2].style.left = 290 + 'px';
		tntBoxEles[2].style.top = 200 + 'px';
		
		//图片播放结束后，创建新一轮敌机，删除终极技能div
		setTimeout(function(){
			comAirMove(false);
			box.removeChild(tntBox);
		},1500);
	}

	//飞机撞毁时，提示用户是否重新开始游戏
	function setImitate(){
		//获取文档父元素
		var oBody = document.getElementsByTagName('body')[0];

		//创建窗口
		var oDiv = document.createElement('div'); //灰色背景
		oDiv.id = 'proDiv';
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
		
		//获取窗口
		var proDiv = document.getElementById('proDiv');

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
		oDiv.style.opacity = 0.9;

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

		//为元素添加事件
		oDiv.style.display = 'block';	//显示模态窗口
		oEm.innerHTML = '您的得分 <b style="color:#f00;font-family:arial;">'+userScore+'</b>，重新开始？'; //将元素信息添加到模态窗口中

		var goLink = this.href; //获取元素链接
				
		//确认按钮跳转链接
		oTrueBtn.onclick = function(){
			window.location.reload();
		}

		//点击取消按钮隐藏模态窗口，清空goLink
		oFalseBtn.onclick = function(){
			oBody.removeChild(proDiv);
			return false;
		}

		return false;
	}

	//获取随机数
	function getRandom(n,m){
		return Math.ceil(Math.random() * 1000000) % (m-n+1) + 1;
	}
})();