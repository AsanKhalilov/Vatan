<template>
  <div>
    <h1>Профиль пользователя</h1>
    <p>Имя: {{ user.firstName }}</p>
    <p>Фамилия: {{ user.lastName }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      user: {}
    };
  },
  async fetch() {
    const { data } = await this.$axios.get('/users/me');
    this.user = data;
  }
}
</script>
