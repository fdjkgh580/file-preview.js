(function ($) {

    var version = "1.0.0";

    $.filePreview = {}

    // 記錄綁定的選擇器
    var _bind_selector;

    var _preview_url = function (file){
        return URL.createObjectURL(file);
    }

    // size 大小格式化
    function format_float(num, pos)
    {
        var size = Math.pow(10, pos);
        return Math.round(num * size) / size;
    }

    var _reader_base64 = function (file, box, param){

        var reader = new FileReader();

        // 若有使用 Base64
        if (param.isBase64 === true) {
            reader.onload = function (e) {
                box.base64 = e.target.result;
                param.success.call(_bind_selector, box)
            }
        }

        // 讀取進度
        reader.onprogress = function (data){
            if (data.lengthComputable) {                                            
                var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                param.progress.call(_bind_selector, progress);

                console.log("-->" + reader.readyState);
            }
        }

        
        // base64 網址
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
        var box    = {};

        $.each(files, function (index, file){

            // 預覽圖網址
            $.extend(box, {
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
            });

            // 使用 Base64
            _reader_base64(file, box, param);
        });


        return box;
    }
   

    /**
     * [filePreview description]
     * @param   param.parent
     * @param   param.child
     * @param   param.success
     * @param   param.isBase64      *false
     */
    $.fn.filePreview = function (param){

        _bind_selector = $(param.parent).find(param.child);

        $(param.parent).on("change", param.child, function (){

            if (this.files && this.files[0]) {

                var box = _each_files(this.files, param);
            }

        })
    }



}( jQuery ));