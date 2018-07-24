# file-preview.js
簡單、快速取得使用者選取的多個圖檔資訊，適合用在預覽圖、檔案 Base64 編碼。
## 透過 NPM 安裝
````
npm i file-preview.js
````
## 簡單用法
在你的 HTML 中添加 jQuery, file-preview.js
````html
<script src="jquery-3.1.1.min.js"></script>
<script src="src/jquery.file-preview.js"></script>
````
接著通常有類似這樣的結構
````html
<form class="form1">
    <input type="file" name="upload[]" class="upload" multiple>    
</form>
````
如果只是顯示預覽圖片，jQuery 的部分可以這麼寫
````javascript
$().filePreview({
    parent: ".form1",
    selector: ".upload",
    success: function (key, obj){
        console.log(obj)
    }
})
````
可以透過 FileReader() 取得圖片或檔案的 Base64 編碼，例如您打算使用 Base64 為圖片編碼後上傳到伺服器，可以這麼用
````javascript
$().filePreview({
    parent: ".form1",
    selector: ".upload",
    isReader: true,
    progress: function (key, percent){
        console.log(percent)
    },
    success: function (key, obj){
        console.log(obj)
    }
})
````
在 success 的時候可以在 obj.base64 取得編碼。但注意，這會犧牲瀏覽器的記憶體效能，檔案過大則會容易造成記憶體不足。通常這用在上傳圖檔時很適合。<br>

## API
### $.filePreview.create(selector, param)
可以透過自訂的事件配合，例如
````javascript
$(".form1").on('change', '.upload', function() {
    var _this = this;
    $.filePreview.create(this, {
        isReader: false,
        progress: function (key, percent){
            console.log(percent)
        },
        success: function (key, obj){
            var $img = $(_this).parents(".form1").find(".img").eq(key);
            $img.css({
                'background-image' : 'url(' + obj.preview + ')'
            });
        }
    });
});
````
### $.filePreview.version()
取得版本

## 參數
- parent 綁定的父元素
- selector 綁定的元素
- isReader 是否啟用 FileReader
- progress(key, percent) 若啟用 FileReader 可顯示讀取進度
- success(key, obj) 單一檔案讀取成功所觸發

## progress 回傳
- percent 讀取進度百分比

## success 回傳
- file 檔案原始資訊
- nameExtension 附檔名
- nameMaster 主檔名
- preview 預覽網址
- size 檔案大小
- type 檔案類型
- base64 檔案使用 Base64 編碼
