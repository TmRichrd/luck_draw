var index = 0
var disabledBtn = false
var list = []
var drawIndex = null
// 挂载请求后的数据，渲染dom
function init () {
  $.get('./db.json', data => {
    list = data
    let boxsEl = document.createElement('div')
    boxsEl.className = 'draw_boxs'
    for (let i = 0; i < data.length; i++)
    {
      let boxEl = document.createElement('div')
      boxEl.className = 'draw'
      let imgEl = document.createElement('img')
      imgEl.src = data[i].img
      let pEl = document.createElement('p')
      pEl.innerHTML = data[i].title
      boxEl.append(imgEl);
      boxEl.append(pEl);
      boxsEl.append(boxEl)
    }
    let btnEl = document.createElement('button')
    btnEl.className = 'draw_btn'
    btnEl.innerHTML = '点击抽奖'
    boxsEl.append(btnEl)
    $('.draw_content').append(boxsEl);
    $('.loading_views').hide();
    $('.draw_content').show();
    $('.draw_boxs')[0].children[index].className = 'draw active'
    startDraw()
  })
}
init()
// 点击抽奖
function startDraw () {
  $('.draw_btn').click(function (e) {
    e.preventDefault();
    // 初始化属性
    $('.draw').removeClass('active');
    index = 0
    $('.draw_boxs')[0].children[index].className = 'draw active'
    drawIndex = null
    disabledBtn = false
    var times = null
    var time = null
    // 等待3s后随机产生一个数字 用于确认中奖的索引 先让他转几圈
    setTimeout(() => {
      drawIndex = Math.round(Math.random() * 9)
    }, 3000);
    $('.draw_btn').attr('disabled', !disabledBtn);
    times = setInterval(() => {
      if (!disabledBtn)
      {
        time = setTimeout(() => {
          index++
          if (index == 9) index = 1
          $('.draw').removeClass('active');
          $('.draw_boxs')[0].children[index - 1].className = 'draw active'
        }, 100);
      }
      if (drawIndex == index)
      {
        disabledBtn = !disabledBtn
        $('.draw_btn').attr('disabled', false);
        window.clearTimeout(time)
        window.clearInterval(times)
        let title = list[drawIndex].title
        setTimeout(() => {
          alert(title)
        }, 80);
      }
    }, 100);
  });
}