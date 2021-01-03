// 如果别人直接跳转到index.html,判断本地存储是否有token值，没有就不能跳转
if (localStorage.getItem('token') == null) {
    location.href = '../login.html';
};
// -----------------------------------------------------------------------------------用户信息
$.ajax({
    url: 'http://ajax.frontend.itheima.net/my/userinfo',
    // 配置项：headers设置请求头
    headers: {
        'Authorization': localStorage.getItem("token")
    },
    success: function (res) {
        if (res.status == 0) {
            var name = res.data.nickname || res.data.username;
            $('.username').text(name);
            if (res.data.user_pic) {
                $('.layui-nav-img').attr('src', res.data.user_pic).show();
                $('.avatar').hide();
            } else {
                var t = name.substr(0, 1).toUpperCase();
                $('.avatar').text(t).css('display', 'inline-block');
                $('.layui-nav-img').hide();
            }
        }
    },
    // token过期
    complete: function (xhr) {
        if (xhr.responseJSON && xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '../login.html';
        }
    }
});
// -----------------------------------------------------------------------------------退出
$('#logout').on('click', function () {
    layer.confirm('确定要退出吗？', function (index) {
        // 如果点击了确定，删除token，页面跳转
        localStorage.removeItem('token');
        location.href = '../login.html';
        // 关闭当前弹出层
        layer.close(index);
    })
});