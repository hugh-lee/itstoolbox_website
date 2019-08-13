// if (window.top != window.self) {
//     window.top.location.href = 'http://qq.ip138.com/converter.htm';
// }


// var _hmt = _hmt || [];
// (function () {
//     var hm = document.createElement("script");
//     hm.src = "//hm.baidu.com/hm.js?ecdd6f3afaa488ece3938bcdbb89e8da";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
// })();

//回到顶部
(function(){
	var frameWindow = $('#contentframe').prop('contentWindow');
	var frameDoc = frameWindow.document;
    var scroll = function(){
        //var top = document.documentElement.scrollTop||document.body.scrollTop;
    	var top = frameDoc.documentElement.scrollTop || frameDoc.body.scrollTop;
        var display = (top > 420) ? 'block' : 'none';
        
        $(".goback").css({"display": display);
    }  
    frameWindow.onscroll = scroll;
    
    $(".goback").click(function(){
    		var frameDoc = $('#contentframe').prop('contentWindow').document;
    		if (frameDoc.documentElement)
    			frameDoc.documentElement.scrollTop = 0;
    		if (frameDoc.body)
    			frameDoc.body.scrollTop = 0;
    		
//    		$("body,html").animate({scrollTop:0}, 1000);
    	});
    }    
})();
	

function enableCrossDomain() {
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
            // options.url = http + '//cors-anywhere.herokuapp.com/' +
			// options.url;
            // options.url = "http://cors.corsproxy.io/url=" + options.url;
            options.url = http + '//127.0.0.1:8080/' + options.url;
        }
    });
}



function request(ops) {
    if (!ops) {
        return;
    }

    var url = ops.url;
    var method = ops.method ? ops.method : 'POST';
    var datatype = ops.datatype ? ops.datatype : 'json';
    var contentType = ops.contentType ||  "application/x-www-form-urlencoded; charset=utf-8";
    var async = !(false === ops.async);
    var header = ops.header || {};
    var data = ops.request;
 
    if (ops.files) {
        data = new FormData();
        data.append('request', ops.request);
        for (file of ops.files) {
            data.append(file.name, file);
        }
    }

    $.ajax({
        type: method,
        async: async,
        url: url,
        header : header,
        cache: false,
        data: data,
        processData: false,
        contentType: contentType,
        dataType: datatype, // "xml", "html", "script", "json", "jsonp", "text".
        beforeSend: function () {
            showProgress();
        },
        complete: function (XMLHttpRequest, textStatus) {
            hideProgress();
        },
        success: function (data) {
            ops.success(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus == 'parsererror') {
                ops.success(data);
                return;
            }

            if (ops.error) {
                ops.error(XMLHttpRequest, textStatus,
                    errorThrown);
            }

            if (!ops.notShowErrWin) {
                showErrWin(textStatus + "\n" + errorThrown);
            }
        }
    });
}


function showProgress() {
    if ($('#progressWin').length == 0) {
        let errWinHtml = `
          <div id="progressWin" style="display: none; position: fixed;top:45%;left:45%;z-index: 10001;" class="modal-x">
            <img src="common/img/busy.gif" width="36px" style="margin-top: 0px; margin-right: 0px;" />
            <i class='fa fa-refresh fa-spin'></i>
            <div style="opacity: 0.6;" class="modal-overlay"></div>
          </div>
        `;
        $("body").append(errWinHtml)
    }

    $('#progressWin').show();
}

function hideProgress() {
    $('#progressWin').hide();
}

function showErrWin(msg) {
    if ($('#errWin').length == 0) {
        let errWinHtml = `
                <div id="errWin" class="modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                             <h5 class="modal-title">Error Information</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div id="err-msg-content" class="modal-body">
                                <p>Modal body text goes here.</p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          </div>
                    </div>
                 </div>
              </div>
            `;
        $("body").append(errWinHtml)
    }
    $('#err-msg-content').html(msg);
    $('#errWin').modal({
        keyboard: true
    })
}

function closeErrWin() {
    $('#err-msg-content').html('');
    $('#errWin').hide();
}


function displayReferences() {
    request({
        url: 'data.json',
        method: 'get',
        success: function (data) {
            $('.wrapper').append(`<div class="container-fluid pull-left">
                <div>
                    <h6>其他参考网站</h6>
                </div>
                <div id="references" class="row">
                    <div class="card hover" style="width: 100px; height:60px; margin: 8px;">
                        <img class="card-img-top" src="https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png"
                            style="width:90px;height: 20px;margin: 5px;" alt="Card image cap">
                        <div class="text-center ng-binding text-center">Mattermost</div>
                    </div>
                    <div class="card hover" style="width: 100px; height:60px; margin: 8px;">
                        <img class="card-img-top" src="https://img.alicdn.com/tfs/TB1Ly5oS3HqK1RjSZFPXXcwapXa-238-54.png"
                            style="width:90px;height: 20px;margin: 5px;" alt="Card image cap">
                        <div class="text-center ng-binding text-center">Mattermost</div>
                    </div>
                </div>

            </div>`);
            $('#references').empty();
            var html = data.references.map(function (item) {
                let li = `<a href="${item.url}" target="_blank"><div class="card hover" style="width: 100px; height:60px; margin: 8px;" >
                    <img class="card-img-top" src="${item.image}"
                        style="width:90px;height: 20px;margin: 5px;" alt="${item.image}">
                    <div class="text-center ng-binding text-center">${item.title}</div>
                </div></a>`;
                $('#references').append(li);
            });
        }
    });
}

function setIframeContent(iframe, content) {
    iframe.src = "data:text/html;charset=utf-8," + content;
}

function backToTop() {
	// 回到顶部
	(function(){
	    var $mod_goback = DOMUtil.getElementsByClassName('mod-goback')[0];
	    if($mod_goback){
	        var scroll = function(){
	            var top = document.documentElement.scrollTop||document.body.scrollTop;
	            $mod_goback.style.display = top>420?'block':'none';
	        }  
	        window.onscroll = scroll;
	    }
	})();
}
function enableShare() {
	window._bd_share_config = {
		"common" : {
			"bdSnsKey" : {},
			"bdText" : "",
			"bdMini" : "1",
			"bdMiniList" : [ "mshare", "qzone", "tsina", "fbook", "tqq", "twi",
					"weixin", "linkedin", "copy", "sqq" ],
			"bdPic" : "",
			"bdStyle" : "0",
			"bdSize" : "16"
		},
		"slide" : {
			"type" : "slide",
			"bdImg" : "1",
			"bdPos" : "right",
			"bdTop" : "87.5"
		},
		"image" : {
			"viewList" : [ "qzone", "tsina", "tqq", "renren", "weixin" ],
			"viewText" : "分享到：",
			"viewSize" : "32"
		},
		"selectShare" : {
			"bdContainerClass" : null,
			"bdSelectMiniList" : [ "qzone", "tsina", "tqq", "renren", "weixin" ]
		}
	};
	with (document)
		0[(getElementsByTagName('head')[0] || body)
				.appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
				+ ~(-new Date() / 36e5)];
}


function shareWeb() {
    var $share = document.getElementById('J_share');
    if ($share) {
        $share.innerHTML = `<div class="bdsharebuttonbox">
            <a href="#" class="bds_more" data-cmd="more"></a>
            <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
            <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
            <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
            <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
            <a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网"></a>
        </div>`;
        window._bd_share_config = {
            "common": {
                "bdSnsKey": {},
                "bdText": "",
                "bdMini": "2",
                "bdMiniList": false,
                "bdPic": "",
                "bdStyle": "1",
                "bdSize": "16"
            },
            "share": {}
        };
        with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
    }
};

$(document).ready(function () {
    enableCrossDomain();
    parseCurrentIp();
    displayReferences();

    $('button').click(function click(e) {
        var result = checkIpDomain();
        if (result.domain)
            queryDomain(result.domain);
        else
            queryIp(result.ip);
    });
});


function parseCurrentIp() {
    $('#localIp').html(returnCitySN.cip);
    $('#nation').html(returnCitySN.cname);
}

function queryIp(ip) {
    var url = `http://www.ip138.com/ips138.asp?ip=${ip}&action=2`;
    request({
        url: url,
        method: 'get',
        datatype: 'text',
        contentType: 'text/html; charset=gb2312',
        success: function (str) {
            var start = str.indexOf('<ul class="ul1"><li>本站数据');
            var end = str.indexOf('</ul>', start);
            $('#comment').html(str.substring(start, end))
        }
    });
}

function queryDomain(domain) {
    var url = `http://site.ip138.com/${domain}/whois.htm`;
    request({
        url: url,
        method: 'get',
        datatype: 'text',
        contentType: 'text/html; charset=gb2312',
        success: function (str) {
            var start = str.indexOf('<div class="whois" id="whois">');
            var end = str.indexOf('</div>', start);
            $('#comment').html(str.substring(start, end))
        }
    });
}

function checkIpDomain() {
    $("#ipdomain").focus();

    var value = $("#ipdomain").val();
    value = value.replace(/^http(s)?:\/\//, '').replace(/\/$/, '');
    if (!value.length) {
        showErrWin("请输入IP或则域名！");
        return false;
    } else if (value.match(/[A-Za-z_-]/)) {
        if (!value.match(reg['domain'])) {
            showErrWin('域名格式错误！');
            return false;
        }
        return {
            domain: value
        };
    } else {
        var arr = value.split(".");
        if (arr.length != 4) {
            aleshowErrWinrt("不是正确的IP");
            return false;
        } else {
            for (var i = 0; i < 4; i++) {
                if (isNaN(arr[i]) || arr[i].length < 0 || arr[i] > 255) {
                    aleshowErrWinrt("不是正确的IP");
                    return false;
                }
            }
        }
        return {
            ip: value
        };
    }

}

///////////////////////////////////////////////////////
var reg = {
    mobile: /^1[3|4|5|6|7|8|9][0-9]{5,9}$/,
    zip: /^\d{4,6}$/,
    zone: /^0\d{2,6}$/,
    id: /^\d{15}$|^\d{18}$|^\d{17}[xX]$/,
    domain: /^([a-zA-Z0-9][-a-zA-Z0-9]{0,62}\.)+([a-zA-Z]{2,63})\.?$/
};
var check = {
    'mobile': function () {
        var value = this.mobile.value.trim();
        if (!value.length) {
            alert('手机号不能为空！');
            this.mobile.focus();
            return false;
        } else if (!value.match(reg['mobile'])) {
            alert('不是完整的11位手机号或者正确的手机号前七位！');
            this.mobile.focus();
            return false;
        }
    },
    'ip': function () {
        var value = $("ipdomain").ip.value.trim();
        value = value.replace(/^http(s)?:\/\//, '').replace(/\/$/, '');
        if (!value.length) {
            this.ip.focus();
            return false;
        } else if (value.match(/[A-Za-z_-]/)) {
            if (!value.match(reg['domain'])) {
                alert('域名格式错误！');
                this.ip.focus();
                return false;
            }
        } else {
            var arr = value.split(".");
            if (arr.length != 4) {
                alert("不是正确的IP");
                this.ip.focus();
                return false;
            } else {
                for (var i = 0; i < 4; i++) {
                    if (isNaN(arr[i]) || arr[i].length < 0 || arr[i] > 255) {
                        alert("不是正确的IP");
                        this.ip.focus();
                        return false;
                    }
                }
            }
        }
        this.ip.value = value;
    },
    'zip': function () {
        var value = this.zip.value.trim();
        if (!value.match(reg['zip'])) {
            alert('请输入邮政编码前4-6位！');
            this.zip.focus();
            return false;
        }
    },
    'zone': function () {
        var value = this.zone.value.trim();
        if (!value.match(reg['zone'])) {
            alert('请输入以“0”开头的3-7位区号！');
            this.zone.focus();
            return false;
        }
    },
    'area': function () {
        var value = this.area.value.trim();
        if (!value.length) {
            alert('请输入地址！');
            this.area.focus();
            return false;
        } else if (value.length < 2) {
            alert('地址至少要有2个字！');
            this.area.focus();
            return false;
        }
    },
    'id': function () {
        var value = this.userid.value.trim();
        if (!value.match(reg['id'])) {
            alert('请输入15位或18位身份证号！');
            this.userid.focus();
            return false;
        }
    }
}
