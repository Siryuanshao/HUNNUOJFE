<template>
  <canvas :id="id">你的浏览器不支持HTML5 canvas</canvas>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      dataArr: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        canvas: {},
        ctx: {},
        dataMap: [],
        mousePosition: {},
        radius : null,
        ox : null,
        oy : null,
        cMargin: null,
        cSpace: null,
        cHeight: null,
        tWidth: null,
        tHeight: null,
        posX: null,
        posY: null,
        textX: null,
        textY: null,
        startAngle: null,
        endAngle: null,
        lineStartAngle : null,
        line : null,
        textPadding : null,
        colorPalette : [
          '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
          '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
          '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
          '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
        ]
      }
    },
    mounted () {
      this.getChart()
    },
    methods: {
      getChart: function () {
        // 获得canvas上下文
        this.canvas = document.getElementById(this.id)
        if (this.canvas && this.canvas.getContext) {
          this.ctx = this.canvas.getContext('2d')
        }
        // 图表初始化
        this.initChart()
        // 绘制比例图
        this.drawMarkers()
        // 绘制动画
        this.pieDraw()
        // 监听鼠标移动
        this.addListener()
      },
      initChart: function () {
        // 图表信息
        this.cMargin = 20;
        this.cSpace = 100;

        this.canvas.width = this.canvas.parentNode.getBoundingClientRect().width * 2
        this.canvas.height = this.canvas.width / 3 * 2

        this.canvas.style.height = this.canvas.height / 2 + 'px'
        this.canvas.style.width = this.canvas.width / 2 + 'px'
        this.cHeight = this.canvas.height - this.cMargin*2;

        // 饼状图信息
        this.radius = this.canvas.height / 3  // 半径  高度的1/3
        this.ox = this.canvas.width / 2  + this.cSpace// 圆心
        this.oy = this.canvas.height / 2
        this.tWidth = 50; //图例宽和高
        this.tHeight = 20;

        this.posX = this.cMargin;
        this.posY = this.cMargin;
        this.textX = this.posX + this.tWidth + 15;
        this.textY = this.posY + 18;
        this.startAngle = this.endAngle = Math.PI / 2; //起始弧度 结束弧度

        this.startAngle = this.endAngle = Math.PI / 2 // 起始弧度 结束弧度

        // 将传入的数据转化百分比
        let total = 0
        for (let i = 0; i < this.dataArr.length; i++) {
          total += this.dataArr[i].value
        }
        if(total === 0) total = 1
        for (let i = 0; i < this.dataArr.length; i++) {
          this.dataMap.push(this.dataArr[i].value / total)
        }
        // 指示线 和 文字
        this.lineStartAngle = - this.startAngle
        this.line = 30 // 画线的时候超出半径的一段线长
        this.textPadding = 10 // 文字与线之间的间距
      },
      transToPercent: function(value) {
        return (value * 100).toFixed(2) + '%'
      },
      drawMarkers : function() {
        this.ctx.font = 'normal 24px 微软雅黑'
        this.ctx.textAlign="left";
        let colorPaletteLength = this.colorPalette.length
        for (let i = 0; i < this.dataArr.length; i++){
          //绘制比例图及文字
          this.ctx.fillStyle = this.colorPalette[i % colorPaletteLength]
          this.ctx.fillRect(this.posX, this.posY + 40 * i, this.tWidth, this.tHeight);
          this.ctx.moveTo(this.posX, this.posY + 40 * i);
          this.ctx.font = 'normal 24px 微软雅黑';
          let percent = this.dataArr[i].name + "：" + this.transToPercent(this.dataMap[i]);
          this.ctx.fillText(percent, this.textX, this.textY + 40 * i)
        }
      },
      pieDraw: function (mouseMove) {
        this.ctx.font = 'normal 24px 微软雅黑'
        let colorPaletteLength = this.colorPalette.length
        for (let n = 0; n < this.dataArr.length; n++) {
          this.ctx.fillStyle = this.ctx.strokeStyle = this.colorPalette[n % colorPaletteLength]
          this.ctx.lineWidth = 1
          this.lineStartAngle += this.dataMap[n] * Math.PI * 2// 结束弧度
        }

        // 设置旋转
        this.ctx.save()
        this.ctx.translate(this.ox, this.oy)
        this.ctx.rotate(Math.PI)

        for (let j = 0; j < this.dataArr.length; j++) {
          // 绘制饼图
          this.endAngle = this.endAngle + this.dataMap[j] * Math.PI * 2 // 结束弧度

          this.ctx.beginPath()
          this.ctx.moveTo(0, 0) // 移动到到圆心
          this.ctx.arc(0, 0, this.radius, this.startAngle, this.endAngle, false) // 绘制圆弧

          this.ctx.fillStyle = this.colorPalette[j % colorPaletteLength]

          if (mouseMove && this.ctx.isPointInPath(this.mousePosition.x * 2, this.mousePosition.y * 2)) {
            this.ctx.globalAlpha = 0.8
          }

          this.ctx.closePath()
          this.ctx.fill()
          this.ctx.globalAlpha = 1

          this.startAngle = this.endAngle // 设置起始弧度
          if (j === this.dataArr.length - 1) {
            this.startAngle = this.endAngle = Math.PI / 2 // 起始弧度 结束弧度
          }
        }
        this.ctx.restore()
      },
      addListener : function() {
        this.canvas.addEventListener('mousemove', (e) => {
          if (e.offsetX || e.offsetX === 0) {
            this.mousePosition.x = e.offsetX
            this.mousePosition.y = e.offsetY
          } else if (e.layerX || e.layerX === 0) {
            this.mousePosition.x = e.layerX
            this.mousePosition.y = e.layerY
          }
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.drawMarkers()
          this.pieDraw(true)
        })
      }
    },
    watch: {
      dataArr: function () {
        this.getChart()
      }
    }
  }
</script>

<style>

</style>
