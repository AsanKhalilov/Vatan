<template>
  <div>
    <h1>Админ-панель</h1>
    <div>
      <h2>Управление достопримечательностями</h2>
      <ul>
        <li v-for="attraction in attractions" :key="attraction.id">
          {{ attraction.name }}
          <button @click="editAttraction(attraction.id)">Редактировать</button>
          <button @click="deleteAttraction(attraction.id)">Удалить</button>
        </li>
      </ul>
      <h3>Добавить новую достопримечательность</h3>
      <form @submit.prevent="addAttraction">
        <div>
          <label for="name">Название</label>
          <input type="text" v-model="newAttraction.name" id="name" />
        </div>
        <div>
          <label for="description">Описание</label>
          <textarea v-model="newAttraction.description" id="description"></textarea>
        </div>
        <button type="submit">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attractions: [],
      newAttraction: {
        name: '',
        description: ''
      }
    };
  },
  async fetch() {
    const { data } = await this.$axios.get('/attractions');
    this.attractions = data;
  },
  methods: {
    async addAttraction() {
      try {
        await this.$axios.post('/attractions', this.newAttraction);
        const { data } = await this.$axios.get('/attractions');
        this.attractions = data;
        this.newAttraction.name = '';
        this.newAttraction.description = '';
      } catch (error) {
        console.error(error);
      }
    },
    async editAttraction(id) {
      // Логика редактирования достопримечательности
    },
    async deleteAttraction(id) {
      try {
        await this.$axios.delete(`/attractions/${id}`);
        const { data } = await this.$axios.get('/attractions');
        this.attractions = data;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
