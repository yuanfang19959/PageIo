import moment from 'moment';

export default function handleTimeBlog(times) {
  const dateTimeStamp = moment(times).valueOf();
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
  if (parseInt(dayC) > 3) {
    result = '' + moment(dateTimeStamp).format('YYYY-MM-DD');
  } else if (parseInt(dayC) > 1) {
    result = '' + parseInt(dayC) + ' 天前';
  } else if (parseInt(dayC) == 1) {
    result = '昨天';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + ' 小时前';
  } else if (minC >= 5) {
    result = '' + parseInt(minC) + ' 分钟前';
  } else result = '刚刚';
  return result;
}