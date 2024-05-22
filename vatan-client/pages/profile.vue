<template>
  <div>
    <h1>Профиль пользователя</h1>
    <p>Имя: {{ user.firstName }}</p>
    <p>Фамилия: {{ user.lastName }}</p>
    <p>Email: {{ user.email }}</p>
    <div>
      <h2>Посетил</h2>
      <ul>
        <li v-for="attraction in visitedAttractions" :key="attraction.id">
          {{ attraction.name }}
        </li>
      </ul>
    </div>
    <div>
      <h2>Хочу посетить</h2>
      <ul>
        <li v-for="attraction in wishlistAttractions" :key="attraction.id">
          {{ attraction.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      visitedAttractions: [],
      wishlistAttractions: []
    };
  },
  async fetch() {
    const userId = this.$store.state.user.id;
    const userResponse = await this.$axios.get(`/users/${userId}`);
    this.user = userResponse.data;
    const visitedResponse = await this.$axios.get(`/visited-attractions`);
    this.visitedAttractions = visitedResponse.data.filter(attraction => attraction.user.id === userId);
    const wishlistResponse = await this.$axios.get(`/wishlist-attractions`);
    this.wishlistAttractions = wishlistResponse.data.filter(attraction => attraction.user.id === userId);
  }
}
</script>
