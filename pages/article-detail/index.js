Page({
  data: {
    isCollected: false,
    postId: -1
  },
  onLoad: function (options) {
    const postId = options.postid;

    let isCollected = false;
    const keyName = `postId-${postId}`;

    let articlesStorage = wx.getStorageSync('articlesStorage');

    if (!articlesStorage) {
      articlesStorage = {
        [keyName]: false
      };
    } else if (articlesStorage && !articlesStorage.hasOwnProperty(keyName)) {
      articlesStorage[keyName] = false;
    } else {
      isCollected = articlesStorage[keyName];
    }

    wx.setStorageSync('articlesStorage', articlesStorage);

    this.setData({
      postId,
      isCollected
    });
  },
  changeCollect() {
    const articlesStorage = wx.getStorageSync('articlesStorage');

    const keyName = `postId-${this.data.postId}`;

    articlesStorage[keyName] = !articlesStorage[keyName];
    wx.setStorageSync('articlesStorage', articlesStorage);

    this.setData({
      isCollected: !this.data.isCollected
    });

    let toastHint = '已收藏文章';
    
    if (!articlesStorage[keyName]) {
      toastHint = '已取消收藏';
    }
    
    wx.showToast({
      title: toastHint,
      icon: "none",
      duration: 2000
    });
  },
  onShare() {
    wx.showActionSheet({
      itemList: ['分享到QQ','分享到微信'],
    });
  }
})