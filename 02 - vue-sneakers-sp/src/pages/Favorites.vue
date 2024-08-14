<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import CardList from '../components/cardList.vue'

const favorites = ref([])

// const removeFromFavorite = async (item) => {
//   item.isFavorite = false
//   await axios.delete(`https://565e10af03542bf8.mokky.dev/favorites/${item.favoriteId}`)
//   item.favoriteId = null
// }

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://565e10af03542bf8.mokky.dev/favorites?_relations=items`
    )

    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои Закладки</h2>
  <CardList :items="favorites" is-favorites />
</template>
