<script setup>
import { computed, provide, ref, watch } from 'vue'
import axios from 'axios'
import Header from './components/header.vue'

import Drawer from './components/drawer.vue'

const carts = ref([])
const isCreatingOrder = ref(false)

const drawerOpen = ref(false)

const totalPrice = computed(() => carts.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const cartIsEmpty = computed(() => carts.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const addToCart = (item) => {
  carts.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  carts.value.splice(carts.value.indexOf(item), 1)
  item.isAdded = false
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://565e10af03542bf8.mokky.dev/orders', {
      items: carts.value,
      totalPrice: totalPrice.value
    })

    carts.value = []

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}

watch(
  carts,
  () => {
    localStorage.setItem('carts', JSON.stringify(carts.value))
  },
  { deep: true }
)

provide('cart', {
  carts,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
    :button-disabled="cartButtonDisabled"
  />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
