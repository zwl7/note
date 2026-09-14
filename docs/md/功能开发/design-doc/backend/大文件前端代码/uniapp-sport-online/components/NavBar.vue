<template>
  <view class="nav-bar" :style="headerStyle">
    <view class="commonHead_wrap" :style="{ height: menuHeight * 2 + 'rpx', marginTop: menuTop * 2 + 'rpx' }">
      <view class="commonHead_left">
        <!-- 首页logo -->
        <view class="logo_box logo" v-if="!showBack">
          <slot name="left"></slot>
        </view>
        <!-- 普通页面返回按钮 -->
        <view class="back" v-if="showBack" @click="handleBack">
          <uni-icons type="left" size="24" :color="backColor"></uni-icons>
        </view>
      </view>
      <view class="commonHead_right" :style="{ color: titleColor }">
        {{ title }}
      </view>
    </view>
  </view>
  <view v-if="showSafe" :style="{ height: navBarHeight * 2 + 'rpx', backgroundColor: navColor }"></view>
</template>

<script>
export default {
  name: "navBar",
  props: {
    title: {
      type: String,
      default: "",
    },
    showBack: {
      type: Boolean,
      default: false,
    },
    backColor: {
      type: String,
      default: "#fff",
    },
    titleColor: {
      type: String,
      default: "#fff",
    },
    navColor: {
      type: String,
      default: "#fff",
    },

    showSafe: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      navBarHeight: 0,
      menuRight: 0,
      menuWidth: 0,
      menuTop: 0,
      menuHeight: 0,
      headerStyle: {},
    }
  },
  created() {
    const app = getApp()
    let { menuRight, menuTop, navBarHeight, menuHeight, menuWidth } = app.globalData
    this.menuHeight = menuHeight
    this.menuTop = menuTop
    this.navBarHeight = navBarHeight
    this.menuWidth = menuWidth
    this.menuRight = menuRight
    this.headerStyle = {
      height: `${navBarHeight * 2}rpx`,
      paddingLeft: `30rpx`,
      paddingRight: `${menuRight * 2}rpx`,
      backgroundColor: this.navColor,
    }
  },
  methods: {
    handleBack() {
      uni.navigateBack({
        fail(err) {
          console.log(err)
          uni.switchTab({
            url: "/pages/tabbar/home/index",
          })
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.nav-bar {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  z-index: 99999;
  top: 0;

  .left {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.commonHead_wrap {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}

.commonHead_left {
  font-size: 30rpx;
  align-items: center;
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;

  .left_box {
    display: flex;
    align-items: center;
    max-width: 50vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .logo_box {
    height: 100%;
    width: 244rpx;
    background-size: contain;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
  }
}

.commonHead_right {
  font-size: 30rpx;
  width: 100%;
  height: 100%;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
  color: #fff;
  font-size: 34rpx;
}

.commonHead_right_text {
  margin: 0 auto;
  line-height: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 282rpx;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 32rpx;
}

.right_logo {
  display: block;
  width: 74rpx;
  height: 74rpx;
  float: right;
}
</style>
