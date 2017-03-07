module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // 引用 package.json 中的參數
        pkg: grunt.file.readJSON('package.json'),
        // 設定 JavaScript 壓縮 task
        uglify: {
            options: {
                // 設定壓縮後檔頭要插入的註解
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                // 使用 SourceMap 並且將 JS Source 與 Map 檔案放在一起
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            my_target: {
                files: [{
                    // 啟用擴展
                    expand: true,
                    // 來源的路徑
                    cwd: 'src',
                    // 將不是 .min.js 的檔案全部進行壓縮
                    src: ['*.js', '!*.min.js'],
                    // 輸出的路徑
                    dest: 'src',
                    // 額外壓縮成 .min.js 而不會覆蓋
                    ext: '.min.js'
                }]
            }
        },
        // 設定監控異動
        watch: {
            //監控的檔案
            files: ['src/*.js'],
            // 監控發生異動，任務要指派給哪個外掛套件
            tasks: ['uglify'],
            options: {
                // 間隔多久執行監控
                interval: 100,
                // 自動重整
                livereload: true
            }
        },
    });
 
    // 讀取外掛
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    // 註冊外掛名稱到 default
    grunt.registerTask('default', ['uglify', 'watch']);
};