(function ($) {

    $.filePreview = {};

    var _version = "1.0.0";


    // 記錄綁定對象
    var input_file;

    var _preview_url = function (file){
        return URL.createObjectURL(file);
    }

    // size 大小格式化
    var format_float = function(num, pos){
        var size = Math.pow(10, pos);
        return Math.round(num * size) / size;
    }

    var _reader_base64 = function (file, index, box, param){

        var reader = new FileReader();

        // 讀取進度
        reader.onprogress = function (data){
            if (data.lengthComputable) {                                            
                var percent = parseInt( ((data.loaded / data.total) * 100), 10 );
                param.progress.call(input_file, index, percent);
            }
        }

        // 若有使用 Base64
        reader.onload = function (e) {
            // base64 網址
            box.base64 = e.target.result;
            param.success.call(input_file, index, box);
        }

        reader.readAsDataURL(file);
    }

    // 主檔名 / 副檔名
    var _filename_extension = function (filename){
        
        var extIndex = filename.lastIndexOf('.');
         
        if (extIndex != -1) {
           var name = filename.substr(0, extIndex); //檔名不含副檔名
           var ext = filename.substr(extIndex+1, filename.length); //副檔名
        }

        return [name, ext];
    }


    var _each_files = function (files, param){

        $.each(files, function (index, file){

            // 預覽圖網址
            var box = {
                preview: _preview_url(file),
                file: file,
                nameMaster: _filename_extension(file.name)[0],
                nameExtension: _filename_extension(file.name)[1],
                type: file.type,
                size: {
                    byte: file.size, 
                    kb: format_float(file.size / 1024, 2),
                    mb: format_float(file.size / 1024 / 1024, 2),
                }
            };

            // 使用 isReader
            if (param.isReader) {
                _reader_base64(file, index, box, param);
            }
            else {
                param.success.call(input_file, index, box);
            }
        });
    }

    // 綁定的對象
    var _selector = function (param){

        if (param.parent === undefined || param.selector === undefined){
            return $.filePreview;
        }

        return $(param.parent).find(param.selector);
    }

    $.filePreview.version = function (){
        return _version;
    }

    /**
     * 建立
     * @param   selector 通常為 input:file 的 this
     * @param   param.success   function    callback(object) 單筆成功所觸發
     * @param   param.isReader  bool        *false 若開啟, 當讀取大圖時的轉換時間，容易造成瀏覽器記憶體不足
     *                                      開啟才能觸發 callback progress() 與取得 Base64 編碼
     * @param   param.progress  function    callback(percent) 取得進度
     */
    $.filePreview.create = function (selector, param){

        input_file = _selector(param);

        if (selector.files && selector.files[0]) {
            _each_files(selector.files, param);
        }
    }

    /**
     * 使用綁定的簡單操作
     * @param   param.parent    string
     * @param   param.selector  string
     * @param   param.success   function    callback(object) 單筆成功所觸發
     * @param   param.isReader  bool        *false 若開啟, 當讀取大圖時的轉換時間，容易造成瀏覽器記憶體不足
     *                                      開啟才能觸發 callback progress() 與取得 Base64 編碼
     * @param   param.progress  function    callback(percent) 取得進度
     */
    $.fn.filePreview = function (param){
        
        $(param.parent).on("change", param.selector, function (){

            $.filePreview.create(this, param)

            // input:file 重設
            input_file.val(null);
        })

    }



}( jQuery ));