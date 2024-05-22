<template>
  <div>
    <h1>{{ attraction.name }}</h1>
    <p>{{ attraction.description }}</p>
    <div>
      <h2>Отзывы</h2>
      <ul>
        <li v-for="review in attraction.reviews" :key="review.id">
          <strong>{{ review.user.firstName }} {{ review.user.lastName }}:</strong> {{ review.comment }} ({{ review.rating }} / 5)
        </li>
      </ul>
      <div v-if="$store.getters.isAuthenticated">
        <h3>Добавить отзыв</h3>
        <form @submit.prevent="submitReview">
          <div>
            <label for="rating">Рейтинг</label>
            <select v-model="newReview.rating" id="rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label for="comment">Комментарий</label>
            <textarea v-model="newReview.comment" id="comment"></textarea>
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
      <div v-else>
        <p>Войдите, чтобы оставить отзыв.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attraction: {},
      newReview: {
        rating: 5,
        comment: ''
      }
    };
  },
  async asyncData({ params, $axios }) {
    const { data } = await $axios.get(`/attractions/${params.id}`);
    return {
      attraction: data
    };
  },
  methods: {
    async submitReview() {
      try {
        const userId = this.$store.state.user.id;
        const attractionId = this.attraction.id;
        await this.$axios.post('/reviews', {
          user: userId,
          attraction: attractionId,
          ...this.newReview
        });
        const { data } = await this.$axios.get(`/attractions/${attractionId}`);
        this.attraction = data;
        this.newReview.rating = 5;
        this.newReview.comment = '';
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
