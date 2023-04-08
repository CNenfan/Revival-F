//=============================================================================
// TMVplugin - ボタンピクチャ
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.02
// 最終更新日: 2015/11/05
//=============================================================================

/*:
 * @plugindesc 点击(单击)图片启动公共事件。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help 在文件中有图片名称末尾部分加上 _CE1 文字的图片时
 * 点击(单击)图片的不透明部分以启动公共事件1。
 * （数字部分是启动的公共事件的编号）
 * ◆例：_CE2的图片会启动公共事件2。
 * 
 * 例: 单击文件名为Actor1_CE4.png的图片会启动公共事件4。
 * 
 * 注意:
 *   不支持正在旋转或放大的图片。
 *
 *   如果重命名文件用来更改要启动的公共事件，
 *   则事件命令也必须重新设置图像文件。
 * 
 * 没有插件命令。
 *
 */

var Imported = Imported || {};
Imported.TMBtnPicture = true;

var Tomoaky = Tomoaky || {};
Tomoaky.BP = Tomoaky.BP || {};

Tomoaky.BP.Game_Screen_clearPictures = Game_Screen.prototype.clearPictures;
Game_Screen.prototype.clearPictures = function() {
  Tomoaky.BP.Game_Screen_clearPictures.call(this);
  this._btnPictures = [];
};

Tomoaky.BP.Game_Screen_showPicture = Game_Screen.prototype.showPicture;
Game_Screen.prototype.showPicture = function(pictureId, name, origin, x, y,
                                             scaleX, scaleY, opacity, blendMode) {
  Tomoaky.BP.Game_Screen_showPicture.call(this, pictureId, name, origin, x, y,
                                          scaleX, scaleY, opacity, blendMode);
  if (!$gameParty.inBattle()) {
    var realPictureId = this.realPictureId(pictureId);
    var bitmap = ImageManager.loadPicture(name);
    this._btnPictures[realPictureId] = [x, y, bitmap.width, bitmap.height];
  }
};

Tomoaky.BP.Game_Screen_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function(pictureId) {
  Tomoaky.BP.Game_Screen_erasePicture.call(this, pictureId);
  var realPictureId = this.realPictureId(pictureId);
  this._btnPictures[realPictureId] = null;
};

Tomoaky.BP.Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
  if (!this.checkBtnPicture()) {
    Tomoaky.BP.Scene_Map_processMapTouch.call(this);
  }
};

Scene_Map.prototype.checkBtnPicture = function() {
  if (TouchInput.isTriggered()) {
    for (i = $gameScreen.maxPictures() - 1; i >= 0; i--) {
      var picture = $gameScreen.picture(i);
      if (picture) {
        var bitmap = ImageManager.loadPicture(picture._name);
        var width = bitmap.width;
        var height = bitmap.height;
        if (picture._origin == 0) {
          var x = picture._x;
          var y = picture._y;
        } else {
          var x = picture._x - width / 2;
          var y = picture._y - height / 2;
        }
        var bitmap = ImageManager.loadPicture(picture._name);
        var width = bitmap.width;
        var height = bitmap.height;
        if (TouchInput.x >= x && TouchInput.x < x + width &&
            TouchInput.y >= y && TouchInput.y < y + height &&
            Number(bitmap.getAlphaPixel(TouchInput.x - x, TouchInput.y - y)) > 0) {
          var re = /_CE(\d+)$/;
          var match = re.exec(picture._name);
          if (match) {
            $gameTemp.reserveCommonEvent(Number(match[1]));
            this._touchCount = 0;
            return true;
          }
        }
      }
    }
  }
  return false;
};

