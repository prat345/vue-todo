<script setup lang="ts">
import { reactive, ref } from 'vue'

const formData = reactive({
  password: '',
  email: ''
})
// const getFormData = () => {
//   return formData
// }
// defineExpose({
//   getFormData
// })

// const props = defineProps({
//   modelValue: {
//     type: Object,
//     required: true
//   }
// })
// const emit = defineEmits(['update:modelValue'])
// const updateFormData = (value: string, field: string) => {
//   emit('update:modelValue', { ...props.modelValue, [field]: value })
// }

const email = defineModel('email')
const password = defineModel('password')
</script>

<template>
  <div class="">
    <h1>Child</h1>
    <form action="">
      <div class="form-control">
        <input type="email" name="email" placeholder="email" v-model="email" />
      </div>
      <div class="form-control">
        <input type="password" name="password" placeholder="password" v-model="password" />
      </div>

      <!-- <div class="form-control">
        <button type="submit" @click.prevent="handleSubmit">submit</button>
      </div> -->
    </form>
  </div>
</template>

<style scoped>
.form-control {
  @apply mb-3;
}
.form-control > input {
  @apply border px-2 py-2;
}
</style>
