<template>
  <div>
    <h1>{{ attraction.name }}</h1>
    <p>{{ attraction.description }}</p>
    <!-- Дополнительные данные о достопримечательности -->
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const { data } = await $axios.get(`/attractions/${params.id}`);
    return {
      attraction: data
    };
  }
}
</script>
