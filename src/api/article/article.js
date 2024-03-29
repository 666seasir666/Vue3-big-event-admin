import request from '@/utils/request'

// 分类：获取文章分类接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850053
export const artGetChannelService = () => request.get('/my/cate/list')

// 分类：添加文章分类接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850052
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 分类：编辑-文章分类接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850051
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)

// 分类：删除-文章分类接口
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850049
export const artDeleteChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章：获取文章列表
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850788
export const artGetArticleListService = (params) =>
  request.get('/my/article/list', { params })

// 文章：添加/发布文章
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850059
export const artPublishService = (data) => request.post('/my/article/add', data)

// 文章：获取文章详情
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850060
export const artGetDetailService = (id) =>
  request.get('/my/article/info', { params: { id } })

// 文章：编辑文章详情
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850973
export const artEditService = (data) => request.put('my/article/info', data)

// 文章：删除文章
// 接口地址：https://apifox.com/apidoc/shared-26c67aee-0233-4d23-aab7-08448fdf95ff/api-93850061
export const artDelService = (id) =>
  request.delete('my/article/info', { params: { id } })
