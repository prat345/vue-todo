<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  nextTick,
  onBeforeUnmount,
  onBeforeMount,
  onDeactivated
} from 'vue'
import { useRoute } from 'vue-router'
import { modifyUrlDisplay } from '../mixin'

interface YTEvent {
  target: any
  data: number
}

nextTick(() => {
  initYoutube()
  // query.value = modifyUrlDisplay(route)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
})

// youtube
const route = useRoute()
const duration = ref(0)
const player1 = ref()
const player2 = ref()
let playerState = ref(0)
let currentTime = ref(0)
let time = ref(0)
let query = computed(() => route.query)
let params = computed(() => route.params)

const ytConfigs = computed(() => ({
  height: '100%',
  width: '100%',
  // videoId: getYouTubeId(props.vdo_link), // 30min: Fbo4pttBZ9k,  2hr: KTFH4P8unUQ , 4hr: 1GNsWa_EZdw, 6hr: I_xLMmNeLDY, 25hr: V_xro1bcAuA
  videoId: '5TU51H3DaKk', // 30min: Fbo4pttBZ9k,  2hr: KTFH4P8unUQ , 4hr: 1GNsWa_EZdw, 6hr: I_xLMmNeLDY, 25hr: V_xro1bcAuA
  host: 'https://www.youtube-nocookie.com',
  playerVars: {
    autoplay: 0,
    modestbranding: 0,
    autohide: 0,
    showinfo: 0,
    controls: 1,
    enablejsapi: 0,
    origin: 'http://localhost:5173'
  }
}))

const initYoutube = () => {
  let tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  let firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
  tag.onload = setupPlayer
}

const setupPlayer = () => {
  // @ts-ignore
  new window['YT'].ready(() => {
    // @ts-ignore
    player1.value = new window['YT'].Player('yt-player1', {
      ...ytConfigs.value,
      events: {
        onReady: (e: YTEvent) => onPlayerReady(e, 1),
        onStateChange: (e: YTEvent) => onPlayerStateChange(e, 1)
      }
    })
    // @ts-ignore
    player2.value = new window['YT'].Player('yt-player2', {
      ...ytConfigs.value,
      playerVars: { ...ytConfigs.value.playerVars, controls: 0 },
      events: {
        onReady: (e: YTEvent) => onPlayerReady(e, 2),
        onStateChange: (e: YTEvent) => onPlayerStateChange(e, 2)
      }
    })
  })
}

// calls when the video player is ready
const onPlayerReady = (event: YTEvent, playerId: number) => {
  // player 1 main player, player 2 muted
  switch (playerId) {
    case 1:
      duration.value = event.target.getDuration()
      window.addEventListener('message', onMessage)
      break
    case 2:
      event.target.mute()
      break
  }
  // @ts-ignore
  playerState.value = window['YT'].PlayerState.UNSTARTED
}

/**
 * calls when video state change
 * -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
 */
const onPlayerStateChange = (event: YTEvent, playerId: number) => {
  // sync both players, pause on player 1 -> set pause player 2
  const self = playerId === 1 ? player1.value : player2.value
  const target = playerId === 1 ? player2.value : player1.value

  playerState.value = event.data
  switch (event.data) {
    // @ts-ignore
    case window['YT'].PlayerState.PLAYING:
      target.playVideo()
      break
    // @ts-ignore
    case window['YT'].PlayerState.PAUSED:
      target.pauseVideo()
      break
    // @ts-ignore
    case window['YT'].PlayerState.BUFFERING:
      target.seekTo(self.getCurrentTime())
      break
    // @ts-ignore
    case window['YT'].PlayerState.ENDED:
      // @ts-ignore
      target.stopVideo(window['YT'].PlayerState.ENDED)
      break
    // @ts-ignore
    case window['YT'].PlayerState.CUED:
      break
  }
}

const onMessage = (event: MessageEvent) => {
  if (event.source === player1.value.getIframe().contentWindow) {
    let data = JSON.parse(event.data)
    currentTime.value = Math.floor(data.info.currentTime)
  }
}

const setTime = () => {
  player1.value.seekTo(time.value)
  player1.value.playVideo()
}

const triggerPlayer = () => {
  // @ts-ignore
  playerState.value === window['YT'].PlayerState.PLAYING
    ? player1.value.pauseVideo()
    : player1.value.playVideo()
}

const encryptParams = (params) => {
  return btoa(params)
}

// Function to modify the URL display
// const modifyUrlDisplay = (route: any) => {
//   if (route.query.en) {
//     const bytes = CryptoJS.AES.decrypt(decodeURIComponent(route.query.en), 'kopkap')
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
//   } else {
//     const params = [...Object.values(route.query)].join('&') // Extract parameters
//     // const encryptedParams = encryptParams(params) // Encrypt the parameters
//     const encryptedParams = CryptoJS.AES.encrypt(JSON.stringify(route.query), 'kopkap').toString()
//     const newUrl = `${window.location.origin + route.path}/?en=${encodeURIComponent(encryptedParams)}` // Create the new URL

//     window.history.replaceState('', '', newUrl)

//     return route.query
//   }
// }
</script>

<template>
  <p>q:{{ query }}</p>
  <p>p:{{ params }}</p>
  <p>
    <router-link
      :to="{
        name: 'tran',
        params: {
          vid: +params.vid + 1,
          id: +params.id + 1,
          type: +params.type + 1,
          ref: params.ref
        }
      }"
      >change route
    </router-link>
  </p>
  <main class="relative">
    <div class="mx-auto flex justify-center gap-4">
      <button @click.prevent="triggerPlayer" class="rounded bg-red-500">trigger</button>
      <input type="number" v-model="time" class="rounded border-black bg-white p-2 text-black" />
      <button @click.prevent="setTime" class="rounded bg-blue-500">set time</button>
    </div>

    <div class="mx-auto aspect-video max-w-[800px] overflow-hidden rounded-md">
      <div id="yt-player1" loading="lazy"></div>
    </div>

    <div class="mx-auto aspect-video max-w-[800px] overflow-hidden rounded-md">
      <div id="yt-player2" loading="lazy"></div>
    </div>
  </main>
</template>
