<script setup>
import { inject } from 'vue'
import CartItem from './cartItem.vue'

const { carts, removeFromCart } = inject(['cart'])
</script>

<template>
  <div class="flex flex-col gap-4" v-auto-animate>
    <CartItem
      v-for="cart in carts"
      :key="cart.id"
      :title="cart.title"
      :image-url="cart.imageUrl"
      :price="cart.price"
      @on-click-remove="() => removeFromCart(cart)"
    />
  </div>
</template>
