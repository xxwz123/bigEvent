// -------------------------------------------------------切换
// 去注册
$('#goto-register').on('click', function () {
    $('#login').hide();
    $('#register').show();
});
// 去登录
$('#goto-login').on('click', function () {
    $('#login').show();
    $('#register').hide();
});
// -------------------------------------------------------注册
var layer = layui.layer;
var form = layui.form;
form.verify({
    changdu: [/^\S{6,12}$/, '长度6~12位，不能有空格'],
    same: function (val) {
        if ($('#password').val() !== val) {
            return '两次输入密码不一致';
        }
    }
});
$('#register form').on('submit', function (e) {
    e.preventDefault(); //阻止默认行为
    var params = $(this).serialize(); // 收集数据
    // 提交数据：去接口文档看
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        type: 'post',
        data: params,
        success: function (res) {
            //不管成功失败，都显示弹窗
            layer.msg(res.message);
            // 提示注册成功，把登录盒子显示，注册盒子隐藏
            if (res.status == 0) {
                $('#login').show();
                $('#register').hide();
                // 失败的时候
            } else {
                $('#username').val('');
            }
        }
    })
});
// -------------------------------------------------------登录
$('#login form').on('submit', function (e) {
    e.preventDefault(); //阻止默认行为
    var params = $(this).serialize(); // 收集数据
    // 提交数据：去接口文档看
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/login',
        type: 'post',
        data: params,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                location.href = '../index.html';
                localStorage.setItem('token', res.token);
            }
        }
    })
});