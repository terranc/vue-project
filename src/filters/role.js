export default function (role) {
  if (!role) return '';
  switch (role) {
    case 'admin': 
      return '管理员';
    case 'writer': 
      return '少数派作者';
    case 'user': 
      return '普通用户';
  }
};
