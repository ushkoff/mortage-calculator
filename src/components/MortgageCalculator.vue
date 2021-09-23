<template>
  <div class="container">
    <h5 class="text-uppercase text-muted">> Mortgage calculator</h5>

    <div class="row justify-content-between">
      <div class="col-5">

        <!-- Mortgage calculator -->

        <form class="mortgage-calculator-form mt-4" @submit.prevent="calculateMortgage()">
          <h4>Calculate mortgage payment</h4>
          <div class="form-group mt-3">
            <label for="initialLoan">Initial loan</label>
            <input type="text" class="form-control" id="initialLoan" placeholder="Enter amount in $..." v-model="initialLoan">
            <span v-if="$v.initialLoan.$dirty && !$v.initialLoan.required" class="calc-error loan-error text-danger">This input is required.</span>
            <span v-if="$v.initialLoan.$dirty && !$v.initialLoan.maxValue" class="calc-error loan-error text-danger">You are asking for more $ than the bank can provide</span>
          </div>
          <div class="form-group mt-3">
            <label for="downPayment">Down payment</label>
            <input type="text" class="form-control" id="downPayment" placeholder="Enter amount in $..." v-model="downPayment">
            <span v-if="$v.downPayment.$dirty && !$v.downPayment.required" class="calc-error payment-error text-danger">This input is required.</span>
            <span v-if="$v.downPayment.$dirty && !$v.downPayment.minValue" class="calc-error payment-error text-danger">Your down payment is too small for this bank</span>
          </div>
          <div class="form-group mt-3">
            <label for="chooseBank">Bank</label><br>
            <select id="chooseBank" v-model="chosenBankId" class="form-select" @change="setCurrentBank(chosenBankId)">
              <option value="" disabled selected>Select bank</option>
              <option  v-for="bank in banks" :key="bank.id" :value="bank.id">{{ bank.title }}</option>
            </select>
            <span v-if="$v.chosenBankId.$dirty && !$v.chosenBankId.required" class="calc-error payment-error text-danger">Please, choose the bank</span>
            <div v-if="chosenBankId != ''">
              <ul class="mt-3">
                <li class="interest-rate">Interest rate: {{ currentBank.interestRate }}%</li>
                <li class="max-loan">Maximum loan: {{ currentBank.maximumLoan }}$</li>
                <li class="min-down-payment">Minimum down payment: {{ currentBank.minimumDownPayment }}$</li>
                <li class="loan-term">Loan term: {{ currentBank.loanTerm }} months</li>
              </ul>
            </div>
          </div>
          <button class="btn btn-success mt-3" type="submit">Calculate</button>
        </form>

      </div>

      <div class="col-6">
        <span class="result d-block mt-4">M = ${{ result }}</span>
        <div class="formula mt-5">
          <h4>Our approach:</h4>
          <img src="../../public/img/Formula.png" alt="formula-picture" class="mt-3 d-block">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxValue, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'mortgage-calculator-component',
  data: () => ({
    initialLoan: '',
    downPayment: '',
    chosenBankId: '',
    banks: [],
    currentBank: {
      maximumLoan: Number.MAX_VALUE,
      minimumDownPayment: -1,
    },
    result: '[fill the form...]'
  }),
  validations() {
    return {
      initialLoan: { required, maxValue: maxValue(this.currentBank.maximumLoan) },
      downPayment: { required, minValue: minValue(this.currentBank.minimumDownPayment) },
      chosenBankId: { required }
    }
  },
  methods: {
    calculateMortgage() {
      //
      // Validation
      //
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      //
      // Calculate the value
      //
      const b = this.currentBank
      const M = this.initialLoan * (((b.interestRate/100) / 12) * Math.pow((1 + (b.interestRate/100) / 12), b.loanTerm))
                /
                (Math.pow((1 + (b.interestRate/100) / 12), b.loanTerm) - 1)

      this.result = M.toFixed(2)
    },
    async loadBanks () {
      await this.$http.get(this.$api + '/bank').then((response) => {
        this.banks = response.data.data
      }).catch((e) => { throw e })
    },
    async setCurrentBank(id) {
      await this.$http.get(this.$api + '/bank/' + id).then((response) => {
        this.currentBank = response.data.data
      }).catch((e) => { throw e })
    }
  },
  async created() {
    this.loadBanks()
  }
}
</script>

<style scoped>

.result {
  font-size: 45px;
  color: rgb(253, 75, 30);
}

.calc-error {
  font-weight: 600;
}

</style>
