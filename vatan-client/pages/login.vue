<template>
  <div>
    <h1>Авторизация</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" />
      </div>
      <div>
        <label for="password">Пароль</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
