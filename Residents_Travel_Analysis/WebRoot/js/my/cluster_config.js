function initPage(PointSimplifier, $) {

        var pointSimplifierIns, groupStyleMap;

        pointSimplifierIns = new PointSimplifier({
            zIndex: 115,
            autoSetFitView: false,
            map: map, //所属的地图实例

            getPosition: function(item) {

                var lngLatLine = item.lngLatLine;

                if (!lngLatLine) {
                    return null;
                }

                var parts = lngLatLine.split(',');

                return [parseFloat(parts[0]), parseFloat(parts[1])];
            },
            getHoverTitle: function(dataItem, idx) {
                return '序号: ' + idx;
            },
            //设置点的样式
            renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
            renderOptions: {
                //点的样式
                pointStyle: {
                    width: 5,
                    height: 5,
                    fillStyle:'#A2D0FA'
                },
                getGroupId: function(item, idx) {

                    return item.groupId;
                },
                groupStyleOptions: function(gid) {

                    return groupStyleMap[gid];
                }

            }
        });

        function onIconLoad() {
            pointSimplifierIns.renderLater();
        }

        function onIconError(e) {
            alert('图片加载失败！');
        }

        groupStyleMap = {
            '0': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 4,
                    //高度
                    height: 4,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle: '#FF000B',
                    //strokeStyle: null
                }
            },
            '1': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 5,
                    //高度
                    height: 5,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#E00092',
                    // strokeStyle: null
                }
            },
            '2': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 4,
                    //高度
                    height: 4,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#E518EC',
                    //strokeStyle: null
                }
            },
            '3': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 4,
                    //高度
                    height: 4,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#3E17EE',
                    //strokeStyle: null
                }
            },
			
			'4': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 4,
                    //高度
                    height: 4,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#4DF3EF',
                    //strokeStyle: null
                }
            },
			
			'5': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 4,
                    //高度
                    height: 4,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#3D468A',
                    //strokeStyle: null
                }
            },
			
			'6': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 5,
                    //高度
                    height: 5,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#178244',
                    //strokeStyle: null
                }
            },
			
			'7': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 5,
                    //高度
                    height: 5,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#17EF44',
                    //strokeStyle: null
                }
            },
			
			'8': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 5,
                    //高度
                    height: 5,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#04D74E',
                    //strokeStyle: null
                }
            },
			
			'9': {
                pointStyle: {
                    //绘制点占据的矩形区域
                    //宽度
                    width: 5,
                    //高度
                    height: 5,
                    //定位点为中心
                    offset: ['-50%', '-50%'],
                    fillStyle:  '#C7B31F',
                    //strokeStyle: null
                }
            }
			
        };
		

			//62 125 178
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_0.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 62; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 63; i <= 125; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 126; i <= 178; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			
			setTimeout(cluster_1, 2000);  //2秒后执行

/***定义聚类函数***/
		function cluster_1(){
			//67 127
			$('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
			var url = '${pageContext.request.contextPath}/GetAllDataServlet_cluster';

			$.getJSON(url).done(function(json) {

				$('#loadingTip').remove();
				
				var lng = json.lng;
				var lat = json.lat;
				
				var lines = csv.split('\n'),
					data = [];

				for (var i = 0; i <= 67; i++) {

					data.push({
						lngLatLine: lines[i],
						groupId: 0
					});
				}
				
				for (var i = 68; i <= 127; i++) {

					data.push({
						lngLatLine: lines[i],
						groupId: 1
					});
				}

				pointSimplifierIns.setData(data);
				
			});
			console.log("1");
			setTimeout(cluster_2,2000); //2秒后执行
		}
		
		function cluster_2(){
			//67 127
			$('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
			$.get('csv/all_clusters_1.csv', function(csv) {

				$('#loadingTip').remove();

				var lines = csv.split('\n'),
					data = [];

				pointSimplifierIns.setData(data);
				
			});
			console.log("2");
			setTimeout(cluster_3,2000); //2秒后执行
		}
		
		function cluster_3(){
			//67 127
			$('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
			$.get('csv/all_clusters_1.csv', function(csv) {

				$('#loadingTip').remove();

				var lines = csv.split('\n'),
					data = [];

				pointSimplifierIns.setData(data);
				
			});
			console.log("3");
			setTimeout(cluster_4,2000); //2秒后执行
		}
		
		function cluster_4(){
			//67 127
			$('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
			$.get('csv/all_clusters_1.csv', function(csv) {

				$('#loadingTip').remove();

				var lines = csv.split('\n'),
					data = [];

				pointSimplifierIns.setData(data);
				
			});
			console.log("4");
			setTimeout(cluster_5,2000); //2秒后执行
		}
		
		function cluster_5(){
			//67 127
			$('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
			$.get('csv/all_clusters_1.csv', function(csv) {

				$('#loadingTip').remove();

				var lines = csv.split('\n'),
					data = [];

				pointSimplifierIns.setData(data);
				
			});
			console.log("5");
			setTimeout(cluster_6,2000); //2秒后执行
		}
		
		function cluster_6(){
				//51 100
			$('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
			$.get('csv/all_clusters_6.csv', function(csv) {

				$('#loadingTip').remove();

				var lines = csv.split('\n'),
					data = [];

				for (var i = 0; i <= 51; i++) {

					data.push({
						lngLatLine: lines[i],
						groupId: 0
					});
				}
				
				for (var i = 52; i <= 100; i++) {

					data.push({
						lngLatLine: lines[i],
						groupId: 1
					});
				}

				pointSimplifierIns.setData(data);
				
			});
			console.log("6");
			setTimeout(cluster_7,2000); //2秒后执行
		}
		
		function cluster_7(){
				//94 153 211 265
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_7.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 94; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 95; i <= 153; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 154; i <= 211; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 212; i <= 265; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_8,2000); //2秒后执行
		}
		
		
		function cluster_8(){
				//83 157 229 284 335 384
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_8.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 83; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 84; i <= 157; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 158; i <= 229; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 230; i <= 284; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 285; i <= 335; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }
			
			for (var i = 336; i <= 384; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 5
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_9,2000); //2秒后执行
		}
		
		function cluster_9(){
				//121 234 301
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_9.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 121; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 122; i <= 234; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 235; i <= 301; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_10,2000); //2秒后执行
		}
		
		
		function cluster_10(){
			/***定义聚类函数***/
		
		//91 173 250 326 401 469
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_10.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 91; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 92; i <= 173; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 174; i <= 250; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 251; i <= 326; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 327; i <= 401; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }
			
			for (var i = 402; i <= 469; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 5
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_11,2000); //2秒后执行
		}
		
		
		function cluster_11(){
			//112 167 222
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_11.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 112; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 0; i <= 167; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 0; i <= 222; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_12,2000); //2秒后执行
		}
		
		function cluster_12(){
			//154 305 402 460 517 573 629 685
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_12.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 154; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 155; i <= 305; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 306; i <= 402; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 403; i <= 460; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 461; i <= 517; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }
			
			for (var i = 518; i <= 573; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 5
                });
            }
			
			for (var i = 574; i <= 629; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 6
                });
            }
			
			for (var i = 630; i <= 685; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 7
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_13,2000); //2秒后执行
		}
		
		function cluster_13(){
			//84 142 199 254 309 363 417
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_13.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 84; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 85; i <= 142; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 143; i <= 199; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 200; i <= 254; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 255; i <= 309; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }
			
			for (var i = 310; i <= 363; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 5
                });
            }
			
			for (var i = 364; i <= 417; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 6
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_14,2000); //2秒后执行
		}
		
		function cluster_14(){
			//130 246 359 414 466 517 568
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_14.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];
				
			for (var i = 0; i <= 130; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }

            for (var i = 131; i <= 246; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 247; i <= 359; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 360; i <= 414; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 415; i <= 466; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }
			
			for (var i = 467; i <= 517; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 5
                });
            }
			
			for (var i = 518; i <= 568; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 6
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_15,2000); //2秒后执行
		}
		
		function cluster_15(){
			//97 183 269 323 377 429
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_15.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 97; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 98; i <= 183; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 184; i <= 269; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 270; i <= 323; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 324; i <= 377; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }
			
			for (var i = 378; i <= 429; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 5
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_16,2000); //2秒后执行
		}
		
		function cluster_16(){
			//104 202 260 318 375 432
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_16.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 104; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 105; i <= 202; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 203; i <= 260; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 261; i <= 318; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 319; i <= 375; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }
			
			for (var i = 376; i <= 432; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 5
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_17,2000); //2秒后执行
		}
		
		function cluster_17(){
			//55 111 167 222
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_17.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 55; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 56; i <= 111; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 112; i <= 167; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 168; i <= 221; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_18,2000); //2秒后执行
		}
		
		function cluster_18(){
			//78 132 183 234 285
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_18.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 78; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 79; i <= 132; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 133; i <= 183; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 184; i <= 234; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 235; i <= 285; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_19,2000); //2秒后执行
		}
		
		function cluster_19(){
			//154 232 296 352
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_19.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 154; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 155; i <= 232; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 233; i <= 296; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 297; i <= 352; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_20,2000); //2秒后执行
		}
		
		function cluster_20(){
			//68 135 201 261 320
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_20.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 68; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 69; i <= 135; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 136; i <= 201; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 202; i <= 261; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }
			
			for (var i = 262; i <= 320; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 4
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_21,2000); //2秒后执行
		}
		
		function cluster_21(){
			//101 192 274 331
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_21.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 101; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 102; i <= 192; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 193; i <= 274; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }
			
			for (var i = 275; i <= 331; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 3
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_22,2000); //2秒后执行
		}
		
		function cluster_22(){
			//59
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_22.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 59; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			setTimeout(cluster_23,2000); //2秒后执行
		}
		
		function cluster_23(){
			//84 169 231
        $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
        $.get('csv/all_clusters_23.csv', function(csv) {

            $('#loadingTip').remove();

            var lines = csv.split('\n'),
                data = [];

            for (var i = 0; i <= 84; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 0
                });
            }
			
			for (var i = 85; i <= 169; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 1
                });
            }
			
			for (var i = 170; i <= 231; i++) {

                data.push({
                    lngLatLine: lines[i],
                    groupId: 2
                });
            }

            pointSimplifierIns.setData(data);
			
        });
			
		}
		
		
    }
	


//绑定事件

$(".select_city").select2();
$(".region_sel").select2();
$(".select_poi").select2();

mapget("play").onclick = function(){
	AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], function(PointSimplifier, $) {initPage(PointSimplifier, $)});
	setTimeout("FLAG = 1;tstart();",2000);
	mapget("pause").style.display='block';
	mapget("stop").style.display='block';
	mapget("play").style.display='none';
}
mapget("stop").onclick = function(){
    tstop();
	mapget("play").style.display='block';
	mapget("pause").style.display='none';
	mapget("stop").style.display='none';
}
mapget("pause").onclick = function(){
    tpause();
	mapget("pause").style.display='none';
	mapget("stop").style.display='none';
	mapget("play").style.display='block';
}

mapget("maprefresh").onclick = function(){
	if(mapget("mapsel").selectedIndex == 0)
		window.location.href = 'index.html';
	if(mapget("mapsel").selectedIndex == 1)
		window.location.href = 'transportation.html';
	if(mapget("mapsel").selectedIndex == 2)
		window.location.href = 'satellite.html';
	if(mapget("mapsel").selectedIndex == 3)
		window.location.href = '3d.html';
}

function chart_sel(){
							if(mapget("chart_sel").selectedIndex==0){
								document.getElementById("table0").style.display = "block";
								document.getElementById("table2").style.display = "none";
							}
							
							if(mapget("chart_sel").selectedIndex==1){
								document.getElementById("table0").style.display = "none";
								document.getElementById("table2").style.display = "block";
							}
}

function chart_sel2(){
							if(mapget("chart_sel2").selectedIndex==0){
								document.getElementById("table3").style.display = "block";
								document.getElementById("table5").style.display = "none";
							}
							
							if(mapget("chart_sel2").selectedIndex==1){
								document.getElementById("table3").style.display = "none";
								document.getElementById("table5").style.display = "block";
							}
}


function chart_sel_liu(){
							if(mapget("chart_sel_liu").selectedIndex==0){
								document.getElementById("table0_liu").style.display = "block";
								document.getElementById("table1_liu").style.display = "none";
							}
							
							if(mapget("chart_sel_liu").selectedIndex==1){
								document.getElementById("table0_liu").style.display = "none";
								document.getElementById("table1_liu").style.display = "block";
							}
}

function chart_sel2_liu(){
							if(mapget("chart_sel2_liu").selectedIndex==0){
								document.getElementById("table3_liu").style.display = "block";
								document.getElementById("table4_liu").style.display = "none";
							}
							
							if(mapget("chart_sel2_liu").selectedIndex==1){
								document.getElementById("table3_liu").style.display = "none";
								document.getElementById("table4_liu").style.display = "block";
							}
}

function modesel(){
	if(mapget("modesel").selectedIndex==0)
		mapget("th_chart2").style.display='none';
	if(mapget("modesel").selectedIndex==1)
		mapget("th_chart2").style.display='block';
}

function modesel_liu(){
	if(mapget("modesel_liu").selectedIndex==0)
		mapget("th_chart2_liu").style.display='none';
	if(mapget("modesel_liu").selectedIndex==1)
		mapget("th_chart2_liu").style.display='block';
}

mapget("show_charts").onclick = function(){
	if(mapget("modesel").selectedIndex==0)
		mapget("div-charts1").style.display='block';
	if(mapget("modesel").selectedIndex==1)
		mapget("div-charts2").style.display='block';
	
}

mapget("show_charts_liu").onclick = function(){
	if(mapget("modesel_liu").selectedIndex==0)
		mapget("div-charts1").style.display='block';
	if(mapget("modesel_liu").selectedIndex==1)
		mapget("div-charts2").style.display='block';
	
}

/***框架操作***/
var iframe1 = document.getElementById('iframe1').contentWindow;
var iframe2_1 = document.getElementById('iframe2_1').contentWindow;
var iframe2_2 = document.getElementById('iframe2_2').contentWindow;

//流量分析
mapget("bar-button").onclick = function(){
	if(mapget("modesel").selectedIndex==0)
		iframe1.window.location.href="charts/bar1.html";
	if(mapget("modesel").selectedIndex==1)
		iframe2_1.window.location.href="charts/bar1.html";
	
}

mapget("bar-button2").onclick = function(){
	if(mapget("modesel").selectedIndex==0)
		iframe1.window.location.href="charts/bar2.html";
	if(mapget("modesel").selectedIndex==1)
		iframe2_1.window.location.href="charts/bar2.html";
	
}

mapget("area-button").onclick = function(){
	if(mapget("modesel").selectedIndex==0)
		iframe1.window.location.href="charts/area.html";
	if(mapget("modesel").selectedIndex==1)
		iframe2_1.window.location.href="charts/area.html";
	
}

mapget("bar-button4").onclick = function(){
		iframe2_2.window.location.href="charts/bar1.html";
	
}

mapget("bar-button5").onclick = function(){
		iframe2_2.window.location.href="charts/bar2.html";
	
}

mapget("area-button2").onclick = function(){
		iframe2_2.window.location.href="charts/area.html";
	
}

//poi与聚类分析分析
mapget("bar-button3").onclick = function(){
	if(mapget("modesel_liu").selectedIndex==0)
		iframe1.window.location.href="charts/bar3d.html";
	if(mapget("modesel_liu").selectedIndex==1)
		iframe2_1.window.location.href="charts/bar3d.html";
	
}

mapget("calendar-button1").onclick = function(){
	if(mapget("modesel_liu").selectedIndex==0)
		iframe1.window.location.href="charts/calendar1.html";
	if(mapget("modesel_liu").selectedIndex==1)
		iframe2_1.window.location.href="charts/calendar1.html";
}

mapget("calendar-button2").onclick = function(){
	if(mapget("modesel_liu").selectedIndex==0)
		iframe1.window.location.href="charts/calendar2.html";
	if(mapget("modesel_liu").selectedIndex==1)
		iframe2_1.window.location.href="charts/calendar2.html";
}


mapget("bar-button6").onclick = function(){
		iframe2_2.window.location.href="charts/bar3d.html";
}

mapget("calendar-button3").onclick = function(){
		iframe2_2.window.location.href="charts/calendar1.html";
}

mapget("calendar-button4").onclick = function(){
		iframe2_2.window.location.href="charts/calendar2.html";
}

//返回主页
mapget("set4-button").onclick = function(){
	window.location.href="index.html";	
}

//关闭按钮
mapget("close-button1").onclick = function(){
	mapget("div-charts1").style.display='none';
}

mapget("close-btn2").onclick = function(){
	mapget("div-charts2").style.display='none';
}

mapget("close-button3").onclick = function(){
	
}

function mapget(element){
    return document.getElementById(element);
}

window.onload=function(){ 
alert("聚类加载完成！可点击时间轴上的播放按钮播放聚类"); 
}

