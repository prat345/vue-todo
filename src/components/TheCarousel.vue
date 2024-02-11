<template>
  <section>
    <div class="relative flex flex-col items-center justify-center gap-y-4">
      <div class="overlay absolute z-[-1] h-full w-full bg-black"></div>
      <div class="absolute z-20 text-4xl text-white">Lorem picsum</div>
      <button
        @click="prev"
        class="translate-y-up absolute left-10 top-1/2 z-[5] text-4xl text-white"
      >
        {{ '<' }}
      </button>
      <button
        @click="next"
        class="translate-y-up absolute right-10 top-1/2 z-[5] text-4xl text-white"
      >
        {{ '>' }}
      </button>
      <div class="max-h-[500px] w-full overflow-hidden">
        <img
          v-for="(img, idx) in images"
          :key="img"
          :src="`https://picsum.photos/id/${img}/1000/600`"
          :class="['fade', 'w-full', count === idx ? 'block' : 'hidden']"
          alt=""
        />
      </div>
      <div class="absolute bottom-10 text-2xl font-semibold text-gray-100">{{ count + 1 }} / 4</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const images = ref<number[]>([15, 18, 29, 35])
const count = ref<number>(0)
const interval = ref<ReturnType<typeof setInterval>>()

const loopImages = () => {
  interval.value = setInterval(() => {
    next()
  }, 5000)
}

const prev = () => {
  count.value = (count.value - 1 + images.value.length) % images.value.length
}
const next = () => {
  count.value = (count.value + 1) % images.value.length
}
onMounted(loopImages)
onBeforeUnmount(() => clearInterval(interval.value))
</script>

<style scoped>
.translate-y-up {
  transform: translateY(-50%);
}

.fade {
  animation-name: fade;
  animation-duration: 1.2s;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
