export default function (t, showTime) {
  if (!t) return '';
  var time = t;
  let date = (typeof time === 'number') ? new Date(time) : new Date((time || '').replace(/-/g, '/'));
  let diff = (((new Date()).getTime() - date.getTime()) / 1000);
  let dayDiff = Math.floor(diff / 86400);

  let isValidDate = Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());

  if (!isValidDate) {
    console.error('not a valid date');
  }
  const formatDate = function (date) {
    let today = new Date(date);
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    if (year === (new Date()).getFullYear()) {
      if (showTime) {
        return `${month}月${day}日 ${hour}:${minute}`;
      } else {
        return `${month}月${day}日`;
      }
    } else {
      if (showTime) {
        return `${year}年${month}月${day}日 ${hour}:${minute}`;
      } else {
        return `${year}年${month}月${day}日`;
      }
    }
  };

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 3) {
    return formatDate(date);
  }
  
  if (dayDiff === 0) {
    return (diff < 60 && '刚刚') ||
      (diff < 120 && '1分钟前') ||
      (diff < 3600 && (Math.floor(diff / 60) + '分钟前')) ||
      (diff < 7200 && '1小时前') ||
      (diff < 86400 && (Math.floor(diff / 3600) + '小时前'));
  } else if (dayDiff < 3) {
    return dayDiff + '天前';
  }
};
