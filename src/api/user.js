import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登录接口
export const userLoginService = ({ username, password }) =>
  request.post('api/login', { username, password })

// 获取用户信息接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93851860
export const userGetInfoService = () => request.get('/my/userinfo')

// 获取个人信息接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850056
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

// 上传头像接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850054
export const userUploadAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

// 修改密码接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850055
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
