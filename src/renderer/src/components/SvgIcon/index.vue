<template>
  <span :class="svgClass">
    <svg aria-hidden="true">
      <use :xlink:href="symbolId" rel="external nofollow" fill="currentColor" style="fill: currentColor" />
    </svg>
  </span>
</template>

<script lang="ts">
// svg 组件
export default {
  name: 'svg-icon',
  props: {
    name: {
      type: String,
      required: true
    },
    class: {
      type: String,
      default: ''
    }
  },

  computed: {
    symbolId() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      return this.class ? 'svg-icon ' + this.class : 'svg-icon';
    }
  }
};
</script>

<style lang="scss">
.svg-icon {
  svg {
    width: 1em;
    height: 1em;
    margin-bottom: 0.125em;
    vertical-align: middle;
  }
  &,
  & * {
    fill: currentColor !important;
  }
}
</style>
