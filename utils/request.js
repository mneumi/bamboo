const baseURL = "http://192.168.31.54:10086"

function request({
  url,
  method = "GET",
  params = {},
  timeout = 5000,
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method,
      params,
      timeout,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
        wx.showToast({
          icon: "none",
          title: '网络异常，请稍后再试',
          duration: 2000
        })
      }
    });
  });
}

module.exports = {
  request
}