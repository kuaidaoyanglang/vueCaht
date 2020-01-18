<template>
  <div class="emojiWrap" ref="emojis" id="emoji">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in emojiArr" :key="index">
        <div
          class="emojiWrap"
          v-for="(emoji,index) in item"
          @click="emojiDom(emoji)"
          :key="index"
          v-html="emoji"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "emoji",
  props: ["emojiList"],
  data() {
    return {
      emojiArr: [],
      cursorPositions: {}
    };
  },
  mounted() {
    new this.Swiper(this.$refs.emojis, {
      observer: true
    });
    this.emojiArr = this.commonality.subGroup(this.emojiList, 20);
    this.$on("cursorPositions", val => {
      this.cursorPositions = val;
    });
  },
  methods: {
    emojiDom(emojiDom) {
      this.$emit("emojiDomInfo", emojiDom);
    }
  }
};
</script>

<style lang="less" scoped>
.emojiWrap {
  display: inline-block;
  margin: 25px;
}
/deep/ .swiper-slide {
  left: -2px;
  top: 22px;
  width: 375px;
}
</style>
