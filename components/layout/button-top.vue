<template>
  <div>
    <div>
      <v-btn
        :small="$vuetify.breakpoint.xs"
        :class="$vuetify.breakpoint.xs ? 'mr-n3 mb-2' : ''"
        fab
        dark
        fixed
        bottom
        right
        class="primary"
        :style="{ bottom: '65px' }"
        @click="scrollToEnd"
      >
        <v-icon
          :small="$vuetify.breakpoint.xs"
          large
          :class="[scrollToBottom ? 'flashing-button' : '']"
        >
          {{ scrollToBottom ? " mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopOnlineAdminButtonTop",

  data() {
    return {
      scrollToBottom: false,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollTop + windowHeight >= documentHeight) {
        this.scrollToBottom = true;
      } else {
        this.scrollToBottom = false;
      }
    },
    scrollToEnd() {
      if (this.scrollToBottom) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.font-size {
  font-size: 15px;
}
</style>
