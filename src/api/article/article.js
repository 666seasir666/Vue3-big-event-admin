import request from '@/utils/request'

// 获取文章分类接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850053
export const artGetChannelService = () => request.get('/my/cate/list')

// 添加文章分类接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850052
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 编辑-文章分类接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850051
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

// 删除-文章分类接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850049
export const artDeleteChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })
