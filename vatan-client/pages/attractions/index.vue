<template>
  <div>
    <h1>Список достопримечательностей</h1>
    <div>
      <label for="location">Местоположение</label>
      <input type="text" v-model="location" id="location" />
      <label for="type">Тип</label>
      <select v-model="type" id="type">
        <option value="">Все</option>
        <option value="дворец">Дворец</option>
        <option value="природный объект">Природный объект</option>
        <!-- Другие типы -->
      </select>
      <button @click="filterAttractions">Применить фильтры</button>
    </div>
    <div v-for="attraction in filteredAttractions" :key="attraction.id">
      <nuxt-link :to="`/attractions/${attraction.id}`">{{ attraction.name }}</nuxt-link>
    </div>
    <div>
      <button @click="prevPage" :disabled="page === 1">Назад</button>
      <button @click="nextPage">Вперед</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attractions: [],
      location: '',
      type: '',
      page: 1,
      perPage: 10
    };
  },
  computed: {
    filteredAttractions() {
      let filtered = this.attractions;
      if (this.location) {
        filtered = filtered.filter(attraction => attraction.location.includes(this.location));
      }
      if (this.type) {
        filtered = filtered.filter(attraction => attraction.type === this.type);
      }
      return filtered.slice((this.page - 1) * this.perPage, this.page * this.perPage);
    }
  },
  async fetch() {
    const { data } = await this.$axios.get('/attractions');
    this.attractions = data;
  },
  methods: {
    filterAttractions() {
      this.page = 1;
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    nextPage() {
      if ((this.page * this.perPage) < this.filteredAttractions.length) {
        this.page++;
      }
    }
  }
}
</script>
