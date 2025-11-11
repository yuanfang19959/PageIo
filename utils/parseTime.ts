import moment from 'moment';

export default function handleTimeBlog(times) {
  // 确保正确解析 UTC 时间
  const dateTimeStamp = moment.utc(times).local().valueOf();
  let result = '';
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let now = new Date().getTime();
  const diffValue = now - dateTimeStamp;
  
  if (diffValue < 0) {
    return (result = '刚刚');
  }
  
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  
  if (parseInt(dayC.toString()) > 3) {
    // 显示本地时区的日期
    result = '' + moment.utc(times).local().format('YYYY-MM-DD');
  } else if (parseInt(dayC.toString()) > 1) {
    result = '' + parseInt(dayC.toString()) + ' 天前';
  } else if (parseInt(dayC.toString()) == 1) {
    result = '昨天';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC.toString()) + ' 小时前';
  } else if (minC >= 5) {
    result = '' + parseInt(minC.toString()) + ' 分钟前';
  } else {
    result = '刚刚';
  }
  
  return result;
}