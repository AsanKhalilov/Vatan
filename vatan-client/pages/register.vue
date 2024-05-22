<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <div>
        <label for="firstName">Имя</label>
        <input type="text" v-model="firstName" id="firstName" />
      </div>
      <div>
        <label for="lastName">Фамилия</label>
        <input type="text" v-model="lastName" id="lastName" />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" />
      </div>
      <div>
        <label for="password">Пароль</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const { data } = await this.$axios.post('/auth/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        });
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
