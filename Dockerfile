FROM node:6.10.3-slim
#node6.10.3精简版做开发镜像
RUN apt-get update \    && apt-get install -y nginx
#安装 nginx
WORKDIR /app
#指定工作路径
COPY . /app/
#将当前目录文档全部copy到指定工作目录下
EXPOSE 80
#服务端口
RUN  npm install \   
     && npm run build \ 
     && cp -r dist/* /var/www/html \   
     && rm -rf /app
#安装依赖
#构建vue
#将dist目录copy到nginx目录下
#删除工作目录减少镜像体积
CMD ["nginx","-g","daemon off;"]

#以前台的方式启动nginx服务
