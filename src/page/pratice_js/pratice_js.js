/**
 * tabItem数组
 */
var tabItems = $('.tab-item');

/**
 * tab页数组
 */
var listContainers = $('.container-list');

/**
 * 指示器
 */
var indicator = $('#tab-item-indicator');

/**
 * 当前显示的tab
 */
var currentTabIndex = 2;

/**
 * tab切换动画执行时间
 */
var duration = 400;

/**
 * 进入页面默认切换到第三个tab
 */
switchTab(currentTabIndex);

/**
 * 设置tab点击监听事件
 */
tabItems.on('click', function () {
    var index = tabItems.index(this);
    switchTab(index);
});

/**
 * 切换tab
 *
 * @param {number} tabIndex 将要切换的tabIndex
 */
function switchTab(tabIndex) {
    // 每个tab占宽度的百分比
    var tabWidth = 100 / 3;

    // 遍历tab设置tab颜色
    tabItems.each(function (index, element) {
        if (tabIndex === index) {
            element.style.color = "rgb(83, 178, 178)";
        } else {
            element.style.color = "#666";
        }
    });

    // 通过修改left定位执行tab页的切换动画
    listContainers.animate({
        left: (tabIndex * -100) + '%'
    }, duration);

    /**
     * 如果将要切换的index小于当前显示的index，指示器为向左滑动，否则为向右滑动
     * 通过修改宽度和左边距实现指示器的滑动动画
     */
    if (currentTabIndex > tabIndex) {
        indicator.animate({
            width: (tabWidth * 2) + '%',
            marginLeft: (tabWidth * tabIndex) + '%'
        }, duration / 2).animate({
            width: tabWidth + '%'
        }, duration / 2);
    } else if (currentTabIndex < tabIndex) {
        indicator.animate({
            width: (tabWidth * 2) + '%'
        }, duration / 2).animate({
            width: tabWidth + '%',
            marginLeft: (tabWidth * tabIndex) + '%'
        }, duration / 2);
    }

    // 根据index获取数据
    getDataByIndex(tabIndex);
    // 设置当前显示的tabIndex
    currentTabIndex = tabIndex;
}

function showEmpty() {

}

function getDataByIndex(index) {
    // 获取数据并解析，测试代码只要第三页有数据
    if (index === 2) {
        fetch('./data.json')
            .then((response) => response.json())
            .then((jsonData) => showAll(jsonData));
    } else {
        showEmpty();
    }
}

/**
 * 根据传入的json数据在tab页中插入列表数据
 *
 * @param {json} jsonData
 */
function showAll(jsonData) {
    var list = $('#list-3');
    // 先清空原来的元素
    list.children().remove();
    // 遍历json数据，添加列表item元素
    for (let i = 0; i < jsonData.body.woInfos.length; i++) {
        let woInfo = jsonData.body.woInfos[i];
        list.append(createItemElement(woInfo.info));
        // 最后一个item底部不需要分割线
        if (i !== jsonData.body.woInfos.length - 1) {
            list.append(createDividerElement());
        }
    }
}

/**
 * 创建列表item元素
 *
 * @param {jsonData.body.woInfo.info} info
 * @returns element
 */
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

/**
 * 创建列表分割线元素
 *
 * @returns element
 */
function createDividerElement() {
    return $('<div class="list-divider"><div class="list-divider-line"></div></div>');
}