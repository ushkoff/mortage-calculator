<template>
  <div id="app">
    <div class="container">
      <header>
        <div class="logo text-center mt-5">
          <h3>Mortgage Calculator</h3>
          <img src="../public/img/House.png" alt="house-picture" class="mt-3">
        </div>

        <div class="menu">
          <nav class="navbar navbar-light bg-light mt-3">
              <ul class="navbar-nav flex-row">
                <button class="btn btn-success" type="button" @click="!isBanksComponentOpened ? $router.push({ path: 'banks-management' }) : null">Banks management</button>
                <button class="btn btn-danger" type="button" @click="!isCalculatorComponentOpened ? $router.push({ path: 'mortgage-calculator' }) : null">Mortgage calculator</button>
              </ul>
          </nav>
        </div>
      </header>
    </div><!-- /.container -->

    <div class="mt-4">
      <banksManagementComponent v-if="isBanksComponentOpened && !isCalculatorComponentOpened"/>
      <mortgageCalculatorComponent v-if="isCalculatorComponentOpened && !isBanksComponentOpened"/>
    </div>
  </div><!-- /#app -->
</template>

<script>
import banksManagementComponent from '@/components/BanksManagement'
import mortgageCalculatorComponent from '@/components/MortgageCalculator'

export default {
  name: 'App',
  components: {
    banksManagementComponent,
    mortgageCalculatorComponent
  },
  computed: {
    isBanksComponentOpened () {
      return this.$route.name === 'banks-management'
    },
    isCalculatorComponentOpened () {
      return this.$route.name === 'mortgage-calculator'
    }
  },
  created()
  {
    this.$route.name !== 'banks-management' && this.$route.name !== 'mortgage-calculator'
      ? this.$router.push({ path: 'banks-management' }) : null
  }
}
</script>

<style scoped>

#app {
  padding-bottom: 200px;
}

nav .btn:first-child {
  margin-right: 1em !important;
}

</style>
