const { request } = require("../../utils/request.js");

Page({
  data: {
    currentPage: 0,
    done: false,
    loading: false,
    list: []
  },
  onLoad() {
    this.setData({
      currentPage: 0,
      done: false,
      loading: false,
      list: []
    });

    this.updateArticleList(this.data.currentPage);

    wx.stopPullDownRefresh();
  },
  onPullDownRefresh() {
    this.onLoad();
  },
  onReachBottom() {
    this.updateArticleList(this.data.currentPage);
  },
  updateArticleList(page) {
    if (this.data.done) {
      return;
    }

    this.setData({
      loading: true
    });

    request({
      url: `/article?page=${page}`,
    }).then(data => {
      const newList = [...this.data.list, ...data.list];
      this.setData({
        list: newList,
        done: data.done,
        currentPage: this.data.currentPage + 1,
        loading: false
      });
    })
  }
});