/*:

 *

 * @plugindesc 扩展键盘输入脚本

 * @author 第四梦境

 * @help 第四梦境编写的扩展键盘输入脚本

 *利用规约：你可以免费将本插件用于免费或商业游戏，不得修改本插件的作者名

 *使用方法：

 *  判断是否按着(Press)：Input.isPressed(键值)

 *  判断是否按下(Trigger)：Input.isTriggered(键值)

 *  判断是否重复按下(Repeat)：Input.isRepeated(键值)

 *  判断是否长按(LongPress)：Input.isLongPressed(键值) 

 *  双击button_option选项可以设置按键，双击button_option选项的项，可更改的为键值，不可更改的为键，键

 *  由键名和键码组成，由|:符号分割，前面的字符串为键名，对应键盘上的键；后

 *  面的数字为键码，对应键盘上该键的码。

 *  can_change_button设置是否让玩家可以自定义按键

 *  can_change_button_list为玩家可以修改的按键列表，若can_change_button为false，则无效。

 *  双击can_change_button_list，可以添加玩家可修改的按键

 *  can_change_button_list列表的项分为键码keyCode和描述desc，键码对应button_option选项项的键码，描

 *  述可以填写该按键的作用。

 *

 * @param button_option

 * @desc 设置按键

 * @type struct<setBTname>

 * @default {"backspace|:8":"backspace","tab|:9":"tab","enter|:13":"ok","shift|:16":"P","control|:17":"control","alt|:18":"alt","pause|:19":"pause","caps_lock|:20":"caps_lock","esc|:27":"escape","space|:32":"space","pageup|:33":"pageup","pagedown|:34":"pagedown","end|:35":"end","home|:36":"home","left|:37":"A","up|:38":"W","right|:39":"D","down|:40":"S","print_screen|:44":"print_screen","insert|:45":"insert","del|:46":"del","num_0|:48":"num_0","num_1|:49":"num_1","num_2|:50":"num_2","num_3|:51":"num_3","num_4|:52":"num_4","num_5|:53":"num_5","num_6|:54":"num_6","num_7|:55":"num_7","num_8|:56":"num_8","num_9|:57":"num_9","A|:65":"left","B|:66":"B","C|:67":"C","D|:68":"right","E|:69":"E","F|:70":"F","G|:71":"G","H|:72":"H","I|:73":"I","J|:74":"J","K|:75":"K","L|:76":"L","M|:77":"M","N|:78":"N","O|:79":"O","P|:80":"shift","Q|:81":"Q","R|:82":"R","S|:83":"down","T|:84":"T","U|:85":"U","V|:86":"V","W|:87":"up","X|:88":"X","Y|:89":"Y","Z|:90":"Z","numpad_0|:96":"numpad_0","numpad_1|:97":"numpad_1","numpad_2|:98":"numpad_2","numpad_3|:99":"numpad_3","numpad_4|:100":"numpad_4","numpad_5|:101":"numpad_5","numpad_6|:102":"numpad_6","numpad_7|:103":"numpad_7","numpad_8|:104":"numpad_8","numpad_9|:105":"numpad_9","numpad_*|:106":"numpad_*","numpad_+|:107":"numpad_+","numpad_Enter|:108":"ok","numpad_-|:109":"numpad_-","numpad_.|:110":"numpad_.","numpad_/|:111":"numpad_/","F1|:112":"F1","F2|:113":"F2","F3|:114":"F3","F4|:115":"F4","F5|:116":"F5","F6|:117":"F6","F7|:118":"F7","F8|:119":"F8","F9|:120":"debug","F10|:121":"F10","F11|:122":"F11","F12|:123":"F12",";|:186":";","=|:187":"=",",|:188":",","-|:189":"-",".|:190":".","/|:191":"/","`|:192":"`","[|:219":"[","\\|:220":"\\","]|:221":"]","'|:222":"'"}

 *

 * @param can_change_button

 * @desc 是否让玩家可以自定义按键

 * @type boolean

 * @on TRUE

 * @off FALSE

 * @default true

 *

 * @param can_change_button_list

 * @type struct<canChangeButtonItem>[]

 * @default ["{\"keyCode\":\"65\",\"desc\":\"方向键左\"}","{\"keyCode\":\"87\",\"desc\":\"方向键上\"}","{\"keyCode\":\"68\",\"desc\":\"方向键右\"}","{\"keyCode\":\"83\",\"desc\":\"方向键下\"}","{\"keyCode\":\"80\",\"desc\":\"加速键\"}"]

 *

 *

 */

 

 /*~struct~canChangeButtonItem:

 *

 * @param keyCode

 * @default 0

 *

 * @param desc

 * @default null

 *

 */

 

 /*~struct~setBTname:

 *

 * @param backspace|:8

 * @default backspace

 *

 * @param tab|:9

 * @default tab

 *

 * @param enter|:13

 * @default enter

 *

 * @param shift|:16

 * @default shift

 *

 * @param control|:17

 * @default control

 *

 * @param alt|:18

 * @default alt

 *

 * @param pause|:19

 * @default pause

 *

 * @param caps_lock|:20

 * @default caps_lock

 *

 * @param esc|:27

 * @default esc

 *

 * @param space|:32

 * @default space

 *

 * @param pageup|:33

 * @default pageup

 *

 * @param pagedown|:34

 * @default pagedown

 *

 * @param end|:35

 * @default end

 *

 * @param home|:36

 * @default home

 *

 * @param left|:37

 * @default left

 *

 * @param up|:38

 * @default up

 *

 * @param right|:39

 * @default right

 *

 * @param down|:40

 * @default down

 *

 * @param print_screen|:44

 * @default print_screen

 *

 * @param insert|:45

 * @default insert

 *

 * @param del|:46

 * @default del

 *

 * @param num_0|:48

 * @default num_0

 *

 * @param num_1|:49

 * @default num_1

 *

 * @param num_2|:50

 * @default num_2

 *

 * @param num_3|:51

 * @default num_3

 *

 * @param num_4|:52

 * @default num_4

 *

 * @param num_5|:53

 * @default num_5

 *

 * @param num_6|:54

 * @default num_6

 *

 * @param num_7|:55

 * @default num_7

 *

 * @param num_8|:56

 * @default num_8

 *

 * @param num_9|:57

 * @default num_9

 *

 * @param A|:65

 * @default A

 *

 * @param B|:66

 * @default B

 *

 * @param C|:67

 * @default C

 *

 * @param D|:68

 * @default D

 *

 * @param E|:69

 * @default E

 *

 * @param F|:70

 * @default F

 *

 * @param G|:71

 * @default G

 *

 * @param H|:72

 * @default H

 *

 * @param I|:73

 * @default I

 *

 * @param J|:74

 * @default J

 *

 * @param K|:75

 * @default K

 *

 * @param L|:76

 * @default L

 *

 * @param M|:77

 * @default M

 *

 * @param N|:78

 * @default N

 *

 * @param O|:79

 * @default O

 *

 * @param P|:80

 * @default P

 *

 * @param Q|:81

 * @default Q

 *

 * @param R|:82

 * @default R

 *

 * @param S|:83

 * @default S

 *

 * @param T|:84

 * @default T

 *

 * @param U|:85

 * @default U

 *

 * @param V|:86

 * @default V

 *

 * @param W|:87

 * @default W

 *

 * @param X|:88

 * @default X

 *

 * @param Y|:89

 * @default Y

 *

 * @param Z|:90

 * @default Z

 *

 * @param numpad_0|:96

 * @default numpad_0

 *

 * @param numpad_1|:97

 * @default numpad_1

 *

 * @param numpad_2|:98

 * @default numpad_2

 *

 * @param numpad_3|:99

 * @default numpad_3

 *

 * @param numpad_4|:100

 * @default numpad_4

 *

 * @param numpad_5|:101

 * @default numpad_5

 *

 * @param numpad_6|:102

 * @default numpad_6

 *

 * @param numpad_7|:103

 * @default numpad_7

 *

 * @param numpad_8|:104

 * @default numpad_8

 *

 * @param numpad_9|:105

 * @default numpad_9

 *

 * @param numpad_*|:106

 * @default numpad_*

 *

 * @param numpad_+|:107

 * @default numpad_+

 *

 * @param numpad_Enter|:108

 * @default numpad_Enter

 *

 * @param numpad_-|:109

 * @default numpad_-

 *

 * @param numpad_.|:110

 * @default numpad_.

 *

 * @param numpad_/|:111

 * @default numpad_/

 *

 * @param F1|:112

 * @default F1

 *

 * @param F2|:113

 * @default F2

 *

 * @param F3|:114

 * @default F3

 *

 * @param F4|:115

 * @default F4

 *

 * @param F5|:116

 * @default F5

 *

 * @param F6|:117

 * @default F6

 *

 * @param F7|:118

 * @default F7

 *

 * @param F8|:119

 * @default F8

 *

 * @param F9|:120

 * @default F9

 *

 * @param F10|:121

 * @default F10

 *

 * @param F11|:122

 * @default F11

 *

 * @param F12|:123

 * @default F12

 *

 * @param ;|:186

 * @default ;

 *

 * @param =|:187

 * @default =

 *

 * @param ,|:188

 * @default ,

 *

 * @param -|:189

 * @default -

 *

 * @param .|:190

 * @default .

 *

 * @param /|:191

 * @default /

 *

 * @param `|:192

 * @default `

 *

 * @param [|:219

 * @default [

 *

 * @param \|:220

 * @default \

 *

 * @param ]|:221

 * @default ]

 *

 * @param '|:222

 * @default '

 *

 */

 

 

 var $d4mj_Input = $d4mj_Input || {};

 

 $d4mj_Input.Parameters = PluginManager.parameters('d4mj_Input');

 $d4mj_Input.can_change_button = $d4mj_Input.Parameters['can_change_button'] == "false" ? false : true;

 $d4mj_Input.can_change_button_list = [];

 $d4mj_Input.Input = {};

 $d4mj_Input.ZInput = JSON.parse($d4mj_Input.Parameters['button_option']);

 

 Input.keyMapper = {};

 for (var key in $d4mj_Input.ZInput) {

var knc = key.split("|:");var kn = knc[0];var kc = knc[1];

$d4mj_Input.Input[kn] = {"btn":kn,"bt":$d4mj_Input.ZInput[key]};

Input.keyMapper[kc] = $d4mj_Input.Input[kn];

 };



 if ($d4mj_Input.can_change_button) {

var ccbl = JSON.parse($d4mj_Input.Parameters['can_change_button_list']);

     for (var i = 0;i < ccbl.length;i++) {

     $d4mj_Input.can_change_button_list[i] = JSON.parse(ccbl[i]);

     }

 }

 

 d4mj_Input_Input_xg_initialize = Input.initialize;

 Input.initialize = function() {

d4mj_Input_Input_xg_initialize.call(this);

ConfigManager.loadKeyMapper();

};



d4mj_Input_Input_xg_clear = Input.clear;

Input.clear = function() {

d4mj_Input_Input_xg_clear.call(this);

this.latestKeyCode = -1;

};



d4mj_Input_Input_xg_update = Input.update;

Input.update = function() {

d4mj_Input_Input_xg_update.call(this);

this._latestKeyCode = this.latestKeyCode;

};

 

 Input._onKeyDown = function(event) {

    if (this._shouldPreventDefault(event.keyCode)) {

        event.preventDefault();

    }

    if (event.keyCode === 144) {

        this.clear();

    }

var kmr = this.keyMapper[event.keyCode];

if (kmr)

    var buttonName = kmr.bt;

    if (buttonName) {

        this._currentState[buttonName] = true;

this.latestKeyCode = event.keyCode;

    }

};

 

 Input._onKeyUp = function(event) {

    var kmr = this.keyMapper[event.keyCode];

if (kmr)

    var buttonName = kmr.bt;

    if (buttonName) {

        this._currentState[buttonName] = false;

    }

    if (event.keyCode === 0) {

        this.clear();

    }

};



d4mj_Input_ConfigManager_xg_makeData = ConfigManager.makeData;

ConfigManager.makeData = function() {

    var config = d4mj_Input_ConfigManager_xg_makeData.call(this);

    config.keyMapper = Input.keyMapper;

config.can_change_button_list = $d4mj_Input.can_change_button_list;

    return config;

};



ConfigManager.loadKeyMapper = function() {

    var json;

    var config = {};

    try {

        json = StorageManager.load(-1);

    } catch (e) {

        console.error(e);

    }

    if (json) {

        config = JSON.parse(json);

    }

    Input.keyMapper = config.keyMapper || Input.keyMapper;

$d4mj_Input.can_change_button_list = config.can_change_button_list || $d4mj_Input.can_change_button_list;

};



d4mj_Input_Window_Options_xg_addGeneralOptions = Window_Options.prototype.addGeneralOptions;

Window_Options.prototype.addGeneralOptions = function() {

d4mj_Input_Window_Options_xg_addGeneralOptions.call(this);

if ($d4mj_Input.can_change_button) {

    this.addCommand("按键设置", 'buttonoption');//for (var i = 0;i < 20;i++) this.addCommand("按键设置", 'buttonoption');

}

};



d4mj_Input_Window_Options_xg_statusText = Window_Options.prototype.statusText;

Window_Options.prototype.statusText = function(index) {

    var symbol = this.commandSymbol(index);

    if (symbol == "buttonoption") {

        return "";

    }else {

        return d4mj_Input_Window_Options_xg_statusText.call(this,index);

    }

};



d4mj_Input_Window_Options_xg_processOk = Window_Options.prototype.processOk;

Window_Options.prototype.processOk = function() {

    var index = this.index();

    var symbol = this.commandSymbol(index);

    if (symbol == "buttonoption") {

        SceneManager.push(d4mj_Input_Scene_ButtonOptions);

    }else {

        d4mj_Input_Window_Options_xg_processOk.call(this);

    }

};





function d4mj_Input_Window_ButtonOptions() {

    this.initialize.apply(this, arguments);

}



d4mj_Input_Window_ButtonOptions.prototype = Object.create(Window_Options.prototype);

d4mj_Input_Window_ButtonOptions.prototype.constructor = d4mj_Input_Window_ButtonOptions;



d4mj_Input_Window_ButtonOptions.prototype.initialize = function() {

    Window_Options.prototype.initialize.call(this);

};



d4mj_Input_Window_ButtonOptions.prototype.addGeneralOptions = function() {

for (var i = 0;i < $d4mj_Input.can_change_button_list.length;i++) {

this.addCommand($d4mj_Input.can_change_button_list[i]["desc"], $d4mj_Input.can_change_button_list[i]["keyCode"]);//alert($d4mj_Input.can_change_button_list[i]);

}

};



d4mj_Input_Window_ButtonOptions.prototype.addVolumeOptions = function() {

    

};



d4mj_Input_Window_ButtonOptions.prototype.statusText = function(index) {

    var symbol = this.commandSymbol(index);

    return Input.keyMapper[symbol]["btn"];

};



d4mj_Input_Window_ButtonOptions.prototype.update = function() {

    Window_Options.prototype.update.call(this);

this.d4mj_Input_updateButtonKeyValue();

};



d4mj_Input_Window_ButtonOptions.prototype.d4mj_Input_updateButtonKeyValue = function() {

    var index = this.index();

        var symbol = this.commandSymbol(index);

    var Input_latestKeyCode = Input._latestKeyCode;Input_latestButton = Input._latestButton;

        if (Input.isTriggered(Input_latestButton) && Input_latestKeyCode > 0) {

if (Input_latestKeyCode == symbol || Input_latestButton == 'escape' || Input_latestButton == 'ok' || Input_latestKeyCode == 144) {

Input._latestKeyCode = -1;

Input.latestKeyCode = -1;

return;

}

var kmtbt = Input.keyMapper[symbol]["bt"];

Input.keyMapper[symbol]["bt"] = Input.keyMapper[Input_latestKeyCode]["bt"];

Input.keyMapper[Input_latestKeyCode]["bt"] = kmtbt;

var csn = Input._currentState[Input.keyMapper[Input_latestKeyCode]["bt"]];

Input._currentState[Input.keyMapper[Input_latestKeyCode]["bt"]] = Input._currentState[Input.keyMapper[symbol]["bt"]];

Input._currentState[Input.keyMapper[symbol]["bt"]] = csn;

$d4mj_Input.can_change_button_list[index]["keyCode"] = Input_latestKeyCode;

var symbolt = symbol;latestKeyCodet = Input_latestKeyCode;

var latestKeyCodeti = this.findSymbol(Input_latestKeyCode);

this._list[index].symbol = latestKeyCodet;

if(latestKeyCodeti > -1) {

this._list[latestKeyCodeti].symbol = symbolt;

$d4mj_Input.can_change_button_list[latestKeyCodeti]["keyCode"] = symbolt;

}

Input._latestKeyCode = -1;

Input.latestKeyCode = -1;

        this.redrawItem(index);

this.redrawItem(latestKeyCodeti);

        SoundManager.playCursor();

    }

};



d4mj_Input_Window_ButtonOptions.prototype.changekeyMapper = function(symbol, index) {

    

};



d4mj_Input_Window_ButtonOptions.prototype.findSymbol = function(symbol) {

    for (var i = 0; i < this._list.length; i++) {

        if (this._list[i].symbol == symbol) {

            return i;

        }

    }

    return -1;

};



d4mj_Input_Window_ButtonOptions.prototype.isOkTriggered = function() {

    return false;

};



d4mj_Input_Window_ButtonOptions.prototype.isCancelTriggered = function() {

return false;

};



d4mj_Input_Window_ButtonOptions.prototype.processHandling = function() {

};



d4mj_Input_Window_ButtonOptions.prototype.processCursorMove = function() {

};



d4mj_Input_Window_ButtonOptions.prototype.processOk = function() {

    

};



/*d4mj_Input_Window_ButtonOptions.prototype.cursorUp = function(wrap) {

    

};



d4mj_Input_Window_ButtonOptions.prototype.cursorDown = function(wrap) {

    

};



d4mj_Input_Window_ButtonOptions.prototype.cursorRight = function(wrap) {

    

};



d4mj_Input_Window_ButtonOptions.prototype.cursorLeft = function(wrap) {

};



d4mj_Input_Window_ButtonOptions.prototype.cursorPagedown = function() {

    

};



d4mj_Input_Window_ButtonOptions.prototype.cursorPageup = function() {

    

};*/



function d4mj_Input_Scene_ButtonOptions() {

    this.initialize.apply(this, arguments);

}



//设置原形 

d4mj_Input_Scene_ButtonOptions.prototype = Object.create(Scene_MenuBase.prototype);

//设置创造者

d4mj_Input_Scene_ButtonOptions.prototype.constructor = d4mj_Input_Scene_ButtonOptions;

//初始化

d4mj_Input_Scene_ButtonOptions.prototype.initialize = function() {

    Scene_MenuBase.prototype.initialize.call(this);

};

//创建

d4mj_Input_Scene_ButtonOptions.prototype.create = function() {

    Scene_MenuBase.prototype.create.call(this);

    this.createButtonOptionsWindow();

};

//终止

d4mj_Input_Scene_ButtonOptions.prototype.terminate = function() {

    Scene_MenuBase.prototype.terminate.call(this);

    //ConfigManager.save();

};

//创建选项窗口

d4mj_Input_Scene_ButtonOptions.prototype.createButtonOptionsWindow = function() {

    this._buttonOptionsWindow = new d4mj_Input_Window_ButtonOptions();

    this._buttonOptionsWindow.setHandler('cancel', this.popScene.bind(this));

    this.addWindow(this._buttonOptionsWindow);

};