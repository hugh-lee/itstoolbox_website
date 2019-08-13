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

function enableCrossDomain() {
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
            //options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
            //options.url = "http://cors.corsproxy.io/url=" + options.url;
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
        dataType: datatype, //"xml", "html", "script", "json", "jsonp", "text".
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
            <img src="/common/img/busy.gif" width="36px" style="margin-top: 0px; margin-right: 0px;" />
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