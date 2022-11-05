var tabItems = $('.tab-item');
var indicator = $('#tab-item-indicator');
var tabItemArray = Array.prototype.slice.call(tabItems);

tabItems.on('click', function () {
    var index = tabItemArray.indexOf(this);
    changeTab(index);
});

changeTab(2);

function changeTab(index) {
    indicator.animate({ marginLeft: (33.3 * index) + '%' });
    // tabItemArray[index].css("background-color", "yellow");
    getDataByIndex(index);
}

function showEmpty() {
    var list = $('#container-list');
    list.children().remove();
}

function getDataByIndex(index) {
    if (index === 2) {
        fetch('./data.json')
            .then((response) => response.json())
            .then((json) => showAll(json));
    } else {
        showEmpty();
    }
}

function showAll(jsonStr) {
    var list = $('#container-list');
    for (let i = 0; i < jsonStr.body.woInfos.length; i++) {
        let woInfo = jsonStr.body.woInfos[i];
        list.append(createItemElement(woInfo.info));
        if (i !== jsonStr.body.woInfos.length - 1) {
            list.append(createDividerElement());
        }
    }
}

function createItemElement(info) {
    return $(
        '<div class="list-item">' +
            '<div class="list-item-header item-child">' +
                '<div class="list-item-title item-text">名称：' + info.ORDER_TITLE + '</div>' +
                '<div class="list-item-tag item-text">待设计派发</div>' +
            '</div>' +
            '<div class="list-item-time item-child item-text">期望时间：' + info.REQ_FIN_DATE + '</div>' +
            '<div class="list-item-project item-child item-text">所属工程：' + info.PROJECT_NAME + '</div>' +
        '</div>'
    );
}

function createDividerElement() {
    return $('<div class="list-divider"><div class="list-divider-line"></div></div>');
}