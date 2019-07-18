## vuecli3
### 这是一个基于Vue.js的,使用Vue-cli3.0和webpack搭建的项目

#### 安装node_modules
```
npm install
```
#### 本地调试和热重载
```
npm run serve
```
#### 本地正式环境调试和热重载
```
npm run dev
```
#### 打包成为测试环境的文件
```

```
#### 打包成为正式环境的文件
```
npm run build
```
#### 依赖要求
    node 11.1.0 虽然package.json版本要求6.0.0就可以,但是最好使用11.1.0版本的;
##### 描述    
    在项目中使用了VueRouter和Vuex,使用了VueRouter进行页面的切换,使用Vuex储存一些变量;
    在.env文件中配置本地热重载测试环境地址,在.evn.dev文件中配置本地热重载正式环境地址,在.env.production文件中配置正环境打包地址;
    使用rem,1rem=50px;
    vuecli3环境变量配置
    [参考](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F/)
    ...   

### 使用的插件和UI库
    MintUI
    clipboard :这个插件是用来复制的;
    VueScroller:这是一个区域滑动插件,上拉加载,下来刷新;
    moment:主要用来把时间戳转化为时间格式;

### 遇到的一些bug
####
