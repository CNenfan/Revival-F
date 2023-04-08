//-----------------------------------------------------------------------------
//  Galv's Message Busts
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MessageBusts.js
//-----------------------------------------------------------------------------
//  2017-11-04 - Version 2.8 - Added fade out speed setting
//  2017-08-21 - Version 2.7 - Fixed a minor bug with appear in front & above
//  2016-10-04 - Version 2.6 - Fixed issue where bust disable/position did not
//                             save in saved games.
//  2016-08-11 - Version 2.5 - Made bust sprite object public
//  2016-08-10 - Version 2.4 - Fixed a crash in MV 1.3 update
//  2016-04-27 - Version 2.3 - Fixed deployment bug with face name case
//  2016-04-22 - Version 2.2 - Fixed a bug with still checking for bust when
//                             Using just faces
//  2016-04-22 - Version 2.1 - Fixed issue with turning busts on/off
//  2016-04-02 - Version 2.0 - Added compatibility for Message Style popups
//  2016-01-12 - Version 1.9 - Fixed issue with middle-aligned textbox
//  2015-12-26 - Version 1.8 - added an option to append text to bust filenames
//                           - to use different images for this and bust menu
//  2015-11-11 - Version 1.7 - fixed text code to change bust mid message.
//                           - (the actor number went to wrong face)
//                           - fixed mid message changing of bust flicker
//  2015-11-11 - Version 1.6 - added Galv plugin command efficiency code
//  2015-11-09 - Version 1.5 - Added ability to display faces/busts based on
//                           - Member position or leader.
//  2015-11-02 - Version 1.4 - Added escape code to change bust during message
//  2015-11-01 - Version 1.3 - fixed bug with bust not disappearing
//  2015-11-01 - Version 1.2 - fixed bug with changing bust
//  2015-11-01 - Version 1.1 - fixed bug with settings
//  2015-11-01 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MessageBusts = true;

var Galv = Galv || {};        // Galv's main object
Galv.pCmd = Galv.pCmd || {};  // Plugin Command manager
Galv.MB = Galv.MB || {};      // Galv's stuff

Galv.Mstyle = Galv.Mstyle || {};  // compatibility

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.2.8) 显示立绘半身像，而不是选择的面部图像
 * 
 * @author Galv - galvs-scripts.com  汉化：xuhao1996
 *
 * @param 立绘显示优先
 * @desc 可以是0或1。0 =立绘出现在消息窗口的后面。 1 =立绘出现在消息窗口的前面
 * @default 0
 *
 * @param 立绘位置
 * @desc 可以是0或1。0 =立绘出现在窗口消息上方。 1 =立绘出现在屏幕底部
 * @default 0
 *
 * @param 文本X偏移
 * @desc 当立绘半身像在左侧显示时，文本被推到右侧的像素数量。
 * @default 390
 *
 * @param 淡出速度
 * @desc 立绘消失的速度。 1-255
 * @default 32
 *
 * @param 文件名附加后缀
 * @desc 附加文件后缀。
 * @default
 
 *
 * @help
 *   Galv's Message Busts
 * ----------------------------------------------------------------------------
 *此插件根据

 *在“显示文本”事件命令中选择的面。例如：

 *如果“显示文本”使用“Actor1”面文件中的第二个脸图，则

 *该插件将使用/img/pictures/Actor1_2.png作为半身像。
 *
 *记住，所有文件名都是区分大小写的，所以请确保使用正确的

 *你的脸图和半身像的大小写。
 *
 *添加：名为“文件名附加后缀”的插件设置。
 *您在此设置中输入的所有内容都会添加到文件名的末尾。
 *使用以上示例，如果“文件名追加”设置为“ _bust”，则
 *插件将改用/img/pictures/Actor1_2_bust.png。
 *
 *确保在具有不同角色立绘的消息之间添加“等待”
 *以获得更好的过渡效果。
 *使用“插件”事件命令来更改立绘设置。 这些设置将
 *在更改之前一直有效，因此它们可用于多个消息。
 *
 *
 * 1.角色的脸。
 *创建一个名为“ partymember.png”的脸图文件（或从演示中获取）。
 *在此面孔集中将每个面孔编号为1到8。
 *在“显示文本”事件命令中使用此脸图设置时，它将替换
 *根据使用的脸图编号与角色的脸图。
 *
 * 1. 主角的脸
 * 创建一个名为“ partyleader.png”的面部文件（或从演示中获取）。
 * 给你的脸贴上相应的标签(例如, 快乐, 悲伤, 大笑, 或数字)
 * 在“显示文本”事件命令中使用此脸图时，它将替换
 * 主角的脸图和所选择脸图的面孔
 * “主角”的面部位置。
 *
 * ----------------------------------------------------------------------------
 *  插件命令（更改立绘位置/可见性）

 * 示例：
 * 立绘 左 假    // 半身像位置出现在左边，立绘图片未翻转。
 * 立绘 右 真    // 半身像位置出现在右边，立绘图片翻转。
 * 立绘 关         // 禁用半身像并正常使用面部图像。
 * 立绘 开         // 禁用脸图并正常使用立绘半身像。
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------

 * ----------------------------------------------------------------------------
 * 例子：
 * 如果“显示文本”事件命令使用“ Actor文件名附加后缀”中的面孔编号3，则...
 * \BST[7]  将继续使用“ Actor文件名附加后缀”面部文件，但将3更改为7
 * \BST[7,Actor2]    将面部文件更改为“ Actor2”并使用面部7
 * ----------------------------------------------------------------------------
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {	

	Galv.MB.prio = Number(PluginManager.parameters('Galv_MessageBusts')["立绘显示优先"]);
	Galv.MB.pos = Number(PluginManager.parameters('Galv_MessageBusts')["立绘位置"]);
	Galv.MB.w = Number(PluginManager.parameters('Galv_MessageBusts')["文本X偏移"]);
	Galv.MB.f = PluginManager.parameters('Galv_MessageBusts')["文件名附加后缀"];

	Galv.MB.fadeOutSpeed = Number(PluginManager.parameters('Galv_MessageBusts')["淡出速度"]);
	
	Galv.MB.msgWindow = null;
	
if (Galv.MB.prio == 1 && Galv.MB.pos == 0) {
	// Fix
	Galv.MB.prio = 0;
};
	
// GALV'S PLUGIN MANAGEMENT. INCLUDED IN ALL GALV PLUGINS THAT HAVE PLUGIN COMMAND CALLS, BUT ONLY RUN ONCE.
if (!Galv.aliased) {
	var Galv_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (Galv.pCmd[command]) {
			Galv.pCmd[command](args);
			return;
		};
		Galv_Game_Interpreter_pluginCommand.call(this, command, args);
	};
	Galv.aliased = true; // Don't keep aliasing for other Galv scripts.
};

//定向到插件对象
Galv.pCmd.立绘 = function(arguments) {
	Galv.MB.bustPos(arguments);
};
// END GALV'S PLUGIN MANAGEMENT

Galv.MB.bustPos = function(pos) {
	if (pos[0] === "开") {
		return $gameSystem.bustDisable = false;
	} else if (pos[0] === "关") {
		return $gameSystem.bustDisable = true;
	};
	
	$gameSystem.bustPos = 0
	if (pos[0] === "左") {
		$gameSystem.bustPos = 0;
	} else if (pos[0] === "右") {
		$gameSystem.bustPos = 1;
	};
	if (pos[1] === "真") {
		$gameSystem.bustMirror = true;
	} else if (pos[1] === "假") {
		$gameSystem.bustMirror = false;
	};
};


	
// ---------------- WINDOW MESSAGE

Galv.MB.Game_Message_setFaceImage = Game_Message.prototype.setFaceImage;
Game_Message.prototype.setFaceImage = function(faceName, faceIndex) {
	switch (faceName) {
		case 'PartyLeader':
			var faceName = $gameParty.leader().faceName();
			break;
		case 'PartyMember':
			if ($gameParty.members()[faceIndex]) {
				var faceName = $gameParty.members()[faceIndex].faceName();
				var faceIndex = $gameParty.members()[faceIndex].faceIndex();
			} else {
				var faceName = "";
			};
			break;
	};
    Galv.MB.Game_Message_setFaceImage.call(this,faceName,faceIndex);
};


// WINDOW MESSAGE START MESSAGE - MOD
Galv.MB.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	Galv.MB.msgWindow = this;
	$gameSystem.bustPos = $gameSystem.bustPos || 0;
	$gameMessage.bustOffset = $gameMessage.bustOffset || Galv.MB.w;
	Galv.MB.Window_Message_startMessage.call(this);
	Galv.MB.msgWindow.tempPosType = this._positionType;
};


Galv.MB.Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
	
    case 'BST':
        this.obtainSpecialParam(textState);
        break;
    }
	Galv.MB.Window_Message_processEscapeCharacter.call(this, code, textState);
};


Window_Message.prototype.obtainSpecialParam = function(textState) {
    var arr = /^\[(.*)]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        var txt = arr[0].slice(1).slice(0, - 1);
		var array = txt.split(",");
		$gameMessage.setFaceImage(array[1] || $gameMessage._faceName,Number(array[0] - 1));
    } else {
        return '';
    }
};


Galv.MB.Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
Window_Message.prototype.drawMessageFace = function() {
	if (!$gameSystem.bustDisable) return;
	Galv.MB.Window_Message_drawMessageFace.call(this);
};

// ---------------- SPRITESET MAP

if (Galv.MB.prio == 0) {
// UNDER MESSAGE
	Galv.MB.Spriteset_Map_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
	Spriteset_Base.prototype.createUpperLayer = function() {
		Galv.MB.Spriteset_Map_createUpperLayer.call(this);
		this.createBusts();
	};
	
	// SPRITESET MAP CREATE MSG BG
	Spriteset_Base.prototype.createBusts = function() {
		// Create bust image
		if (this._msgBustSprite) return;
		this._msgBustSprite = new Sprite_GalvBust();
		this.addChild(this._msgBustSprite);
	};
	
	Galv.MB.Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function() {
		if ($gameSystem.bustDisable) {
			return Galv.MB.Window_Message_newLineX.call(this);
		} else {
			return 0;
		};
	};
	
} else {
// OVER MESSAGE
	
	// Add to window_message as child instead, so it displays above
	Galv.MB.Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
	Window_Message.prototype.createSubWindows = function() {
		Galv.MB.Window_Message_createSubWindows.call(this);
		if (this._msgBustSprite) return;
		this._msgBustSprite = new Sprite_GalvBust();
		this.addChild(this._msgBustSprite);
	};
	
	
	Galv.MB.Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function() {
		if ($gameSystem.bustDisable) {
			return Galv.MB.Window_Message_newLineX.call(this);
		} else if ($gameMessage.faceName() && Galv.MB.prio == 1 && $gameMessage._positionType == 2 && $gameSystem.bustPos == 0) {
			return $gameMessage.bustOffset;
		} else {
			return 0;
		};
	};

};

})();


// ---------------- SPRITE GALVMSGBG - NEW

function Sprite_GalvBust() {
    this.initialize.apply(this, arguments);
}

Sprite_GalvBust.prototype = Object.create(Sprite.prototype);
Sprite_GalvBust.prototype.constructor = Sprite_GalvBust;

Sprite_GalvBust.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.name = "";
	this.opacity = 0;
    this.update();
};

Sprite_GalvBust.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (Galv.MB.msgWindow) this.controlBitmap();
};

Sprite_GalvBust.prototype.loadBitmap = function() {
	var name = $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1);
	if ($gameSystem.bustDisable) {
		var img = ImageManager.loadPicture('');
	} else {
		var img = ImageManager.loadPicture(name + Galv.MB.f);
	};
	if (img.isReady()) {
		if (this.bitmap) {
			//this._destroyCachedSprite();
			this.bitmap = null;
		};
		this.bitmap = img;
		this.name = name;
		this.hasBust = true;
	};
};

Sprite_GalvBust.prototype.controlBitmap = function() {
	if ($gameMessage.faceName() && this.name !== $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1)) {
    	this.loadBitmap();  // If image changed, reload bitmap
	};
	
	if (Galv.MB.msgWindow.openness <= 0 || !this.hasBust || $gameSystem.bustDisable) {
		this.opacity = 0;
		this.name = "";
		this.hasBust = false;
		return;
	};

	if ($gameSystem.bustMirror) {
		this.scale.x = -1;
		var offset = this.bitmap.width;
	} else {
		this.scale.x = 1;
		var offset = 0;
	};

	this.opacity = $gameMessage.faceName() ? Galv.MB.msgWindow._openness : this.opacity - Galv.MB.fadeOutSpeed;
	
	// Control image position
	switch (Galv.MB.msgWindow.tempPosType) {
	case 0:
		this.y = this.baseY();
		break;
	case 1:
	//top and middle
		this.y =  this.baseY() - Galv.MB.msgWindow.y;
		break;
	case 2:
	//bottom
		if (Galv.MB.prio == 1) {
			this.y = Galv.MB.msgWindow.height - this.bitmap.height;
		} else if (Galv.MB.pos === 1) {
			this.y = this.baseY();
		} else {
			this.y = this.baseY() - Galv.MB.msgWindow.height;
		};
		break;
	};
	
	if ($gameSystem.bustPos == 1) {
		// if on the right
		if (Galv.MB.prio == 1) {
			this.x = Galv.MB.msgWindow.width - this.bitmap.width + offset;
		} else {
			this.x = Galv.MB.msgWindow.x + Galv.MB.msgWindow.width - this.bitmap.width + offset;
		};
	} else {
		// else on the left
		if (Galv.MB.prio == 1) {
			this.x = 0 + offset;
		} else {
			this.x = Galv.MB.msgWindow.x + offset;
		};
	};
};

Sprite_GalvBust.prototype.baseY = function() {
	if (Galv.Mstyle.target) {
		return Galv.MB.msgWindow.y + Galv.MB.msgWindow.height - this.bitmap.height;
	} else {
		return Graphics.boxHeight - this.bitmap.height;
	};
};


