var click_index = 0;//0：访问index是通过地址，1：访问index是通过按钮
var map = new AMap.Map("container", {
        resizeEnable: false,
        center: [106.694795,26.596919],
        zoom: 12,
		layers: [new AMap.TileLayer.Satellite()],
		
    });