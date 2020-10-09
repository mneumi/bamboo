const { request } = require("../../utils/request.js");

Page({
  onLoad() {
    this.setData({
      currentPage: 0,
      done: false,
      loading: false,
      networkError: false,
      list: []
    });

    this.updateArticleList(this.data.currentPage);
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
      wx.stopPullDownRefresh();
    }).catch(err => {
      this.setData({
        networkError: true,
        loading: false
      });
      wx.stopPullDownRefresh();
    });
  },
  handleBtnClick(event) {
    const postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: `/pages/article-detail/index?postid=${postId}`,
    });
  }
});