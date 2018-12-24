let data = {
  index: 0,
  autoReply: null,
  startX: 0,
  endX: 0,
  diviation: 60,
  moveY: 0,
  bgImgFade: 'bgImgLeft-fade',
  logoFade: 'logoLeft-fade',
  titleFade: 'titleLeft-fade',
  buttonFade: 'buttonLeft-fade',
  show: true,
  clicked: false,
  carouselItems: [
    {
      desktopImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/TUM6A0QAMONS1543969712682.jpg',
      mobileImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/TY4GC7M6E53E1543969712687.jpg',
      logo: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/2QLPOR2EBKO81531505740397.png',
      title: '全新戰鬥版',
      button: '現已推出',
      url: 'https://www.blizzard.com/zh-tw/'
    },
    {
      desktopImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/GGEHM39V9LFM1544569766102.jpg',
      mobileImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/QO5H94BW2S3R1544569766102.jpg',
      logo: 'https://d3hmvhl7ru3t12.cloudfront.net/img/pages/events/winter-wonderland/logo/event-logo-zh_TW-e725c50c4a3c810cbebefa5feba5ee73382a65ed517fde8110dd87da949cd24c215711426098925a65bb0a2394254bc2f15887b35841c7a953aa846e24f243cb.png',
      title: '慶祝冬境樂園',
      button: '瞭解詳情',
      url: 'https://worldofwarcraft.com/zh-tw/news/22646760'
    },
    {
      desktopImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/QG5GYWOMSYOR1541100858549.jpg',
      mobileImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/4HMOTRSV6FCY1541100858538.jpg',
      logo: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/AHO79OK9O97G1541100859078.png',
      title: '全新資料片',
      button: '瞭解詳情',
      url: 'https://playhearthstone.com/zh-tw/expansions-adventures/rastakhans-rumble/'
    },
    {
      desktopImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/6BVTRM03YOXE1541100891084.jpg',
      mobileImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/CQ5LPQHH2RNX1541100891106.jpg',
      logo: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/RVVMY2Q0MZ1D1541100890909.png',
      title: '磅礡戰役回歸',
      button: '瞭解詳情',
      url: 'https://playwarcraft3.com/zh-tw/'
    },
    {
      desktopImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/1S1ZYH62ZF8B1534437674168.jpg',
      mobileImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/5FX67SE37ZKW1534437674179.jpg',
      logo: 'https://d9me64que7cqs.cloudfront.net/images/logos/logo-d3.zh-tw-a6e030390e252e8aa8b4b79498d3365a11cf720fbab1756c20fbfdc5ce63011bfb9608c155a09606fd4e77376eb452e993d251745965a278b4df4e826efd8845.png',
      title: '《暗黑破壞神 III》登陸任天堂 Switch',
      button: '瞭解詳情',
      url: 'https://tw.diablo3.com/zh/switch'
    },
    {
      desktopImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/rf/RFP88WMR3NAH1541101183165.jpg',
      mobileImg: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/AOOO49F440KM1541100903503.jpg',
      logo: 'https://bnetcmsus-a.akamaihd.net/cms/gallery/ee/EELFUOUT6QDA1541124843310.png',
      title: '2018 年慈善虛寵',
      button: '瞭解詳情',
      url: 'https://worldofwarcraft.com/zh-tw/news/22646760'
    }
  ]
}


let vm = new Vue({
  el: '#app',
  data: data,
  computed: {
    itemHandler() {
      return this.carouselItems[this.index]
    },
    total() {
      return this.carouselItems.length
    }
  },
  methods: {
    prevNextHandler(change) {
      clearInterval(this.autoReply)
      this.clicked = true
      let assignedIndex = (this.index + change + this.total) % this.total
      let direction = change === -1 ? 'Left' : 'Right'
      this.changeIndex(assignedIndex, direction)
    },
    swipeStart(e) {
      this.startX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX
    },
    swipeEnd(e) {
      this.endX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX
      let finalMove = Math.abs(this.startX - this.endX) - this.diviation
      if(finalMove > 0 && (this.startX - this.endX) > 0) {
        this.prevNextHandler(1)
      }else if(finalMove > 0 && (this.startX - this.endX) < 0) {
        this.prevNextHandler(-1)
      }
    },
    changeIndex(assignedIndex, direction) {
      this.show = false;
      this.index = assignedIndex
      this.bgImgFade = `bgImg${direction}-fade`
      this.logoFade = `logo${direction}-fade`
      this.titleFade = `title${direction}-fade`
      this.buttonFade = `button${direction}-fade`

      setTimeout(() => {
        this.show = true;
      }, 0)
    },
    carouselAutoReply(change) {
      let assignedIndex = (this.index + change) % this.total
      let direction = assignedIndex === 0 ? 'Left' : 'Right'
      this.changeIndex(assignedIndex, direction)
    },
    tabHandler(assignedIndex) {
      clearInterval(this.autoReply)
      this.clicked = true
      if(this.index === assignedIndex) return
      let direction = this.index > assignedIndex ? 'Left' : 'Right'
      this.changeIndex(assignedIndex, direction)
    }
  },
  mounted() {
    this.carouselAutoReply(0)
    this.autoReply = setInterval(this.carouselAutoReply, 6000, 1)

    window.addEventListener('scroll', () => {
      let scrollVal = window.scrollY
      if(scrollVal > 0 && scrollVal < 200) {
        this.moveY = scrollVal * 0.3;
      }
    })
  }
})