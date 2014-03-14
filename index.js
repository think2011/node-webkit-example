// 引入node-webkit API
try {
	var gui = require('nw.gui');
	var win = gui.Window.get();
} catch(e) {console.log(e)}

var msg = {
    /**
     * 发送信息
     * @param str
     */
	send: function (str) {
		this.render('right', str); // 刷新页面
		this.receive(str); // 接收信息

       // 清空并聚焦输入框
       $('input').val('').focus();
	},

    /**
     * 接收信息
     * @param str
     */
	receive: function (str) {
        var _this = this;
		var url = 'http://api.ajaxsns.com/api.php?key=free&appid=0&msg=' + str;

        // 因为跨域哦，还没放到node-webkit的时候，就先在这里终止来调试好了。
/*		this.render('left', str);
        return false;*/

        // 获得回复，置入信息。
		$.getJSON(url, function (data) {
            _this.render('left', data.content);
		});
	},

    /**
     * 刷新页面
     * @param type
     * @param str
     */
    render: function (type, str) {
        var $list = $('#chat-list');

        // 置入到DOM
        var html = '<div class="msg '+ type +'">'+ str +'<span class="trigon"></span></div>';
        $list.append(html);

        // 矫正聊天框显示位置
        $list.animate({scrollTop: $list[0].scrollHeight}, 300);	// 此处$list[0].scrollHeight使用了原生dom的方法
    }
}

// 一点就发送信息！
$('button').on('click', function () {
	var str = $('input').val();
	if(str) {
		msg.send(str);
	}
	return false;
});

// 关闭程序
$('#close').on('click', function () {
	win.close();
});

// 初始化
setTimeout(function () {
    $('input').focus();
}, 300);