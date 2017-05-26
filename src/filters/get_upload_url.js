var config = require('config/config.json');
export default (url, width = 0, height = 0, cut = 1) => {
  if (!url) { 
    return '';
  }
  let thumbUrl = '';
  // if (url.indexOf('http') === 0) {
  //   return url;
  // }
  let size = '';
  let cutStr = '';
  let flag = '';
  if (!width && !height) {
    width = 80;
  }
  if (width === 0) {
    size = `x` + height;
    flag = 'r';
  } else if (height === 0) {
    size = width + 'x';
  } else {
    size = width + 'x' + height;
    flag = 'r';
  }
  if (cut) {
    cutStr = `/gravity/Center/crop/${size}`;
  }
  if (url) {
    // thumbUrl = config.cdn.images + url + `?imageMogr2/quality/95/thumbnail/!${size}${flag}${cutStr}`; 
    thumbUrl = url + `?imageMogr2/quality/95/thumbnail/!${size}${flag}${cutStr}`; 
  } else {
    // thumbUrl = `${config.cdn.images}/404.png?imageMogr2/thumbnail/!${size}${flag}${cutStr}`; 
    thumbUrl = `${config.cdn.images}/404.png?imageMogr2/thumbnail/!${size}${flag}${cutStr}`; 
  }
  return thumbUrl;
};
