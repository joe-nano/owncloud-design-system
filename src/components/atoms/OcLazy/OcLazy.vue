<template>
  <div ref="target">
    <slot v-if="visible" />
    <template v-else>LOADING</template>
  </div>
</template>
<script>
import { onUnmounted, ref, watch } from "@vue/composition-api";

export default {
  name: "OcLazy",
  status: "POC",
  release: "1.0.0",
  props: {
    enabled: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const visible = ref(!props.enabled);
    const target = ref();
    const observer = new IntersectionObserver(([{isIntersecting}]) => {
      if(!isIntersecting){
        return
      }

      visible.value = true;
      observer.unobserve(target.value);
    }, {
      rootMargin: '100px 0px 100px 0px'
    });

    watch(target, () => {
      observer.observe(target.value);
    });

    onUnmounted(() => observer.disconnect());

    return {
      target,
      visible
    };
  }
};
</script>