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