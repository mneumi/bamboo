const baseURL = "http://192.168.31.54:10086"

function request({
  url,
  method = "GET",
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method,
      timeout: 5000,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

module.exports = {
  request
}