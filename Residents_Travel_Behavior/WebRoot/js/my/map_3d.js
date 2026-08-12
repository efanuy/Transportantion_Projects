var click_index = 0;//0：访问index是通过地址，1：访问index是通过按钮
	var map = new AMap.Map("container", {
        resizeEnable: false,
        center: [106.706308,26.600145],
        zoom: 17
    });
	 if (document.createElement('canvas') && document.createElement('canvas').getContext && document.createElement('canvas').getContext('2d')) {
        // 实例化3D楼块图层
        var buildings = new AMap.Buildings();
        // 在map中添加3D楼块图层
        buildings.setMap(map);
    } else {
        alert("对不起，运行该示例需要浏览器支持HTML5！");
    }