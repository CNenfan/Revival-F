//=============================================================================
// KMS_SaveWithSnap.js
//   Last update: 2015/12/04
//=============================================================================

/*:
 * @plugindesc
 * [v0.1.0] 将屏幕截图添加到保存/加载屏幕。
 * 
 * @author TOMY (Kamesoft)
 *
 * @param Image scale
 * @text 图像比例
 * @default 0.15
 * @desc 是保存时图像数据的尺寸倍率。
 *
 * @param Enable JPEG
 * @text 启用jpg
 * @default 1
 * @desc 0：PNG/1:JPEG。
 *
 * @help 
 * 汉化：硕明云书
 * 此插件没有插件命令。
 * 图像比例	是保存时图像数据的尺寸倍率。
 * 通过将屏幕尺寸乘以该值获得的尺寸的图像被保存。
 * 由于绘图时图像会自动放大或缩小，因此建议使用0.1 到 0.3左右的小值。
 * 启用 JPEG	如果设置为1，如果环境支持 JPEG 转换，图像将保存为 JPEG。
 * 如果设置为0或在不支持 JPEG 转换的环境中，图像将为 PNG。
 * 即使指定为1，如果 PNG 中的数据较小，也会以 PNG 格式保存。
 */

/*:ja
 * @plugindesc
 * [v0.1.0] 将屏幕截图添加到保存/加载屏幕。
 * 
 * @author TOMY (Kamesoft)
 *
 * @param Image scale
 * @text 图像比例
 * @default 0.15
 * @desc 是保存时图像数据的尺寸倍率。
 *
 * @param Enable JPEG
 * @text 启用jpg
 * @default 1
 * @desc JPEG 如果格式可用且小于 PNG，请使用 JPEG。
 *
 * @help 
 * 汉化：硕明云书
 * 此插件没有插件命令。
 */

var KMS = KMS || {};

(function() {

KMS.imported = KMS.imported || {};
KMS.imported['SaveWithSnap'] = true;

var pluginParams = PluginManager.parameters('KMS_SaveWithSnap');
var Params = {};
Params.savefileBitmapScale = Number(pluginParams['Image scale'] || 0.15);
Params.enableJpeg = Number(pluginParams['Enable JPEG'] || 1);

//-----------------------------------------------------------------------------
// Bitmap

if (!Bitmap.prototype.save)
{
    /*
     * ビットマップを URL 表現に変換
     */
    Bitmap.prototype.toDataURL = function()
    {
        if (Params.enableJpeg)
        {
            // サイズが小さくなる方を返す
            // ※ サポート外の形式が指定されたら PNG になる仕様なので、
            //    変換結果が null 等になることはない
            var png = this._canvas.toDataURL('image/png');
            var jpeg = this._canvas.toDataURL('image/jpeg');
            return (png.length < jpeg.length) ? png : jpeg;
        }
        else
        {
            return this._canvas.toDataURL('image/png');
        }
    };

}

//-----------------------------------------------------------------------------
// DataManager

var _KMS_SaveWithSnap_DataManager_loadSavefileImages = DataManager.loadSavefileImages;
DataManager.loadSavefileImages = function(info)
{
    _KMS_SaveWithSnap_DataManager_loadSavefileImages.call(this, info);

    if (info.snapUrl)
    {
        ImageManager.loadNormalBitmap(info.snapUrl);
    }
};

var _KMS_SaveWithSnap_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function()
{
    var info = _KMS_SaveWithSnap_DataManager_makeSavefileInfo.call(this);

    var bitmap = this.makeSavefileBitmap();
    if (bitmap)
    {
        info.snapUrl = bitmap.toDataURL();
    }

    return info;
};

/*
 * セーブファイル用のビットマップを作成
 */
DataManager.makeSavefileBitmap = function()
{
    var bitmap = $gameTemp.getSavefileBitmap();
    if (!bitmap)
    {
        return null;
    }

    var scale = Params.savefileBitmapScale;
    var newBitmap = new Bitmap(bitmap.width * scale, bitmap.height * scale);
    newBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, newBitmap.width, newBitmap.height);

    return newBitmap;
};

//-----------------------------------------------------------------------------
// Game_Temp

var _KMS_SaveWithSnap_Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function()
{
    _KMS_SaveWithSnap_Game_Temp_initialize.call(this);
    this._savefileBitmap = null;
};

Game_Temp.prototype.setSavefileBitmap = function(bitmap)
{
    this._savefileBitmap = bitmap;
};

Game_Temp.prototype.getSavefileBitmap = function()
{
    if (this._savefileBitmap)
    {
        return this._savefileBitmap;
    }
    else
    {
        return SceneManager._backgroundBitmap;
    }
};

//-----------------------------------------------------------------------------
// Window_SavefileList

var _KMS_SaveWithSnap_Window_SavefileList_drawItem = Window_SavefileList.prototype.drawItem;
Window_SavefileList.prototype.drawItem = function(index)
{
    var id = index + 1;
    var info = DataManager.loadSavefileInfo(id);
    if (info)
    {
        var valid = DataManager.isThisGameFile(id);
        var rect = this.itemRectForText(index);
        this.drawSnappedImage(info, rect, valid);
    }

    _KMS_SaveWithSnap_Window_SavefileList_drawItem.call(this, index);

    console.log(KMS.imported['AccelerateFileScene']);
};

/*
 * セーブファイルの画像を表示
 */
Window_SavefileList.prototype.drawSnappedImage = function(info, rect, valid)
{
    if (!(valid && info.snapUrl))
    {
        return;
    }

    var bitmap = ImageManager.loadNormalBitmap(info.snapUrl);
    var dh = this.itemHeight() - 8;
    var dw = bitmap.width * dh / bitmap.height;
    var dx = rect.x + Math.max(rect.width - dw - 120, 0);
    var dy = rect.y + 4;

    this.changePaintOpacity(true);
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, dy, dw, dh);
};

})();
