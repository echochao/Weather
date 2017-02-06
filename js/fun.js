	function getWeather(){
		var $p=$("#province");
		var $c=$("#city");
		var $w= $("#weather")  
		var Fun={};

		var n;

		var code;

		Fun.getPro=function(){
			$.ajax({
				type:"get",
		       	url: 'ajax/city.json',
		        dataType: 'json',
		        success: function (r) {
					for(var i=0;i<r["citycode"].length;i++){	
						var op=$("<option></option>");
						op.text(r["citycode"][i].province);
						$p.append(op);
					}
				}
			})
		}

		Fun.getCity=function(){
			var province=$p.val();
			$.ajax({
				type:"get",
		       	url: 'ajax/city.json',
		        dataType: 'json',
		        success: function (r) {
		        	console.log(r);
		        	xx=r;
					for(var i=0;i<r["citycode"].length;i++){
						if(province==r["citycode"][i].province){
							n=i;
							for(var j=0;j<r["citycode"][n].city.length;j++){
								var op=$("<option></option>");
								op.text(r["citycode"][n].city[j].name);
								$c.append(op);
							}							
							console.log(n);
						}
					}
				}
			})
		}

		Fun.getCode=function(){
			var cityname=$c.val();
			$.ajax({
				type:"get",
		       	url: 'ajax/city.json',
		        dataType: 'json',
		        success: function (r) {
					for(var i=0;i<r["citycode"][n].city.length;i++){
					if(cityname==r["citycode"][n].city[i].name){
						code=r["citycode"][n].city[i].code;	
					}
					}
				}
			})

		}

		Fun.getWeatherinfo=function(){
			var urls="http://www.weather.com.cn/data/cityinfo/"+code+".html";
			console.log(urls);
			// $.getJSON("http://query.yahooapis.com/v1/public/yql", { 
			// 	q:"select * from json where url="+"\""+urls+"\"", 
   //              format: "json"  
   //              }, function(data) {  
   //              if (data.query.results) {  
   //              var w = data.query.results.weatherinfo;
   //              console.log(w); 
   //              $w.html("");
   //              for( var k in w){
   //              	console.log(k+": "+w[k])
   //              	var p=$("<p></p>");
			// 		p.text(k+": "+w[k]);
			// 		$w.append(p);
   //              }

   //          	}else{console.log("error")}	
   //     		})
   			$.ajax({
		       	url: 'http://query.yahooapis.com/v1/public/yql',
		        data:{
		        	q : "select * from json where url="+"\""+urls+"\"",
		        	format : "json"
		        },
		        type:'get',
		        cache:false,
		        success: function (data) {
					if (data.query.results) {  
	                	var w = data.query.results.weatherinfo;
	                	console.log(w); 
	               		$w.html("");
	                	for( var k in w){
	                		console.log(k+": "+w[k])
	                		var p=$("<p></p>");
							p.text(k+": "+w[k]);
							$w.append(p);
						}
					}
				},
				beforeSend(){
					console.log('succss');
					$w.html('<p>等待中...</p>')
				},
				error: function(){
					console.log("error");
				}				
			})		
		}

		console.log(Fun);
		return Fun;
	}

	var s=getWeather();

	s.getPro();

	$("#province").change(function(event) {
		if($("#province").val()!=0){
			$("#city").html("<option value='0'>---请选择---</option>");
			$("#weather").html("<div id='weather'>请选择城市</div>");
			s.getCity();
		}else{
			$("#city").html("<option value='0'>---请选择---</option>");
		};
	});

	$("#city").change(function(event) {
		s.getCode();
	});
	
	$("#btn").click(function(event) {
		if($("#c").val()!=0) s.getWeatherinfo();
	});

