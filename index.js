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
    
    //init search input
    $('#searchTxt').keyup(function (e) {
        filterMenu(e.target.value);
    });

    //share web
    shareWeb();

    // show or hide menu
    initMenuFunction();

    //click menu item
    $('.tool-menu .menuitem').click(clickMenuItem);
    
    // init recently menuitem
    initRecentlyMenu();
    
    $('#feedback').click(function(e) {
        window.open('http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=RHBxcnd0cnV8BDU1aicrKQ');
    });
});


/** init recently menu */
function initRecentlyMenu() {
    $('.recently-menu').append(localStorage.getItem('recentlyMenuItem1') || "");
    $('.recently-menu').append(localStorage.getItem('recentlyMenuItem2') || "");
    $('.recently-menu').append(localStorage.getItem('recentlyMenuItem3') || "");

    $('.recently-menu .menuitem').click(function (i, val) {
        selectMenuItem(this);
    });
}

/** click menu item */
function clickMenuItem(e) {
    e.stopPropagation();

    $('.menuitem a i.fa-check').addClass('hide-fa-check');
    $('.menuitem a i.fa-check').removeClass('fa-check');

    if ($(this).find('ul').length == 0) {
        // recently menu
        var newHtml = this.outerHTML;
        if (newHtml != localStorage.getItem('recentlyMenuItem3') &&
            newHtml != localStorage.getItem('recentlyMenuItem2') &&
            newHtml != localStorage.getItem('recentlyMenuItem1')) {

            if (localStorage.getItem('recentlyMenuItem2') != null)
                localStorage.setItem('recentlyMenuItem3', localStorage.getItem('recentlyMenuItem2'));
            if (localStorage.getItem('recentlyMenuItem1') != null)
                localStorage.setItem('recentlyMenuItem2', localStorage.getItem('recentlyMenuItem1'));
            localStorage.setItem('recentlyMenuItem1', this.outerHTML);

            $('.recently-menu').prepend(this.outerHTML);

            $('.recently-menu .menuitem').each(function (i, val) {
                if (i > 2) {
                    $(val).remove();
                }
            });

            $('.recently-menu .menuitem').click(function (i, val) {
                selectMenuItem(this)
            });
        }

        selectMenuItem(this);
    } else {
        if ($(this).children('a').hasClass("folder-open")) {
            $(this).children('a').removeClass('folder-open');
            $(this).children('a').addClass('folder-close');

            $(this).children('ul').css({display:"none"});
        } else {
            $(this).children('a').removeClass('folder-close');
            $(this).children('a').addClass('folder-open');
            $(this).children('ul').css({display:"block"});
        }
    }
}

function selectMenuItem(menuItem) {
    $('.menuitem a i.fa-check').addClass('hide-fa-check');
    $('.menuitem a i.fa-check').removeClass('fa-check');

    $(menuItem).find("a i").addClass('fa-check');
    $(menuItem).find("a i").removeClass('hide-fa-check');
}

/**show or hide menu */
function initMenuFunction() {
    var toggle = {
        isOpen: false,
        open: function () {
            this.isOpen = true;
            $("body").addClass('status-show');
        },
        close: function () {
            this.isOpen = false;
            $("body").removeClass('status-show');
        }
    };

    $(".mod-mask").click(function () {
        toggle.close();
    });

    $(".menu").click(function () {
        if (toggle.isOpen) {
            toggle.close();
        } else {
            toggle.open();
        }
    });

    $(".side").click(function (e) {
        if (e.target.tagName == 'INPUT')
            return;

        if (e.target.tagName == "A") {
            $(".tool-menu .menuitem .active").removeClass('active');
            $(e.target).parent().addClass('active');
        }

        toggle.close();
    });

    $(".advertise").click(function () {
        toggle.close();
    });
}

/** filter nuenu according to the value of search box */
function filterMenu(filter) {
    filter = filter.toUpperCase();
    $(".tool-menu .menuitem").each(function () {
        if (!filter || filter.trim() == '') {
            $(this).removeClass('tool-menu-hide');
        } else if (this.innerText.indexOf(filter) == -1) {
            $(this).addClass('tool-menu-hide');
        } else {
            $(this).removeClass('tool-menu-hide');
        }
    });
}
