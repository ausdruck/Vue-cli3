var u = navigator.userAgent;
var flag;
var myFunction;
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if (isIOS) {
  document.body.addEventListener('focusin', () => {  //软键盘弹起事件
    flag = true;
    clearTimeout(myFunction);
  })
  document.body.addEventListener('focusout', () => { //软键盘关闭事件
    flag = false;
    if (!flag) {
      myFunction = setTimeout(function () {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })//重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)

      }, 200);
    } else {

    }
  })
} else {

}