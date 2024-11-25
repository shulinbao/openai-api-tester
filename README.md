# openai-api-tester

[English](https://github.com/shulinbao/openai-api-tester/blob/main/README-en.md)

一个可以部署在cloudflare worker上的Openai格式API测试工具

目前可以实现以下功能：
- 多个渠道的API测试，需要填写`API_ENDPOINTS`环境变量
- 自定义渠道密钥，使用`AUTHORIZATION`环境变量
- 当错误时返回错误响应内容
- 超时10秒以上自动返回错误

由于[one-api](https://github.com/songquanpeng/one-api)及衍生API管理系统的渠道管理，只能测试渠道的响应时间，而不能测试渠道的具体问题，本工具旨在用最低的成本解决这一痛点。

## 部署方法
1. 在您Cloudflare的`Workers & Pages`标签页中，新建一个Worker
2. 输入名称并点击`Deploy`
3. 进入Worker的设置，点击右上角`Edit Code`，将本项目`worker.js`的内容复制进去，再点击右上角的`Deploy`保存
4. 重新回到Worker的设置，选择`Settings`标签页，并找到`Variables and Secrets`，按照下方的环境变量说明设置您的环境变量，并点击`Deploy`保存
5. 访问Worker的网站，点击`Start Testing`开始测试

## 环境变量
| 环境变量   | 内容   | 类型   | 说明   |
|---------|---------|---------|---------|
| API_ENDPOINTS   | API服务器地址   | Type   | 不需要`v1`及之后的内容。多个服务器之间用逗号分隔，示例：`api.1.com,api.2.com,api.3.com`   |
| AUTHORIZATION   | API密钥   | Secret   | 示例`sk-xxxxxxxx`   |

## 常见问题
### 我的不同API服务器有不同的密钥，如何设置？
目前暂不支持，等待更新。
### API正常，但测试结果返回`Unexpected token 'e', "error code: 1042" is not valid JSON`怎么回事？
您的API可能运行在Cloudflare Worker上。Cloudflare不允许API和本项目同时在一个账号下的Worker中运行。请考虑创建一个小号。
