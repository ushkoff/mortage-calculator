<template>
  <div class="container">
    <h5 class="text-uppercase text-muted">> Banks Management</h5>

    <div class="row justify-content-between">

      <div class="col-5">

          <!-- CREATE BANK -->

          <form v-if="!isEdit" class="create-bank-form mt-4" @submit.prevent="createBank()">
            <h4>Create bank</h4>
            <div class="form-group mt-3">
              <label for="bankName">Bank name</label>
              <input type="text" class="form-control" id="bankName" placeholder="Enter title..." v-model="name">
              <span v-if="$v.name.$dirty && !$v.name.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <div class="form-group mt-3">
              <label for="interestRate">Interest rate</label>
              <input type="text" class="form-control" id="interestRate" placeholder="Enter rate in %..." v-model="rate">
              <span v-if="$v.rate.$dirty && !$v.rate.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <div class="form-group mt-3">
              <label for="maxLoan">Maximum loan</label>
              <input type="text" class="form-control" id="maxLoan" placeholder="Enter amount in $..." v-model="loan">
              <span v-if="$v.loan.$dirty && !$v.loan.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <div class="form-group mt-3">
              <label for="minDownPayment">Minimum down payment</label>
              <input type="text" class="form-control" id="minDownPayment" placeholder="Enter amount in $..." v-model="payment">
              <span v-if="$v.payment.$dirty && !$v.payment.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <div class="form-group mt-3">
              <label for="loanTerm">Loan term</label>
              <input type="text" class="form-control" id="loanTerm" placeholder="Enter term in months..." v-model="term">
              <span v-if="$v.term.$dirty && !$v.term.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <button class="btn btn-success mt-3" type="submit">Create bank</button>
          </form>

          <!-- EDIT BANK -->

          <form v-if="isEdit && currentBank != null" class="edit-bank-form mt-4" @submit.prevent="editBank(currentBank.id)">
            <h4>Edit bank "{{ currentBank.title }}"</h4>
            <div class="form-group mt-3">
              <label for="bankName">Bank name</label>
              <input type="text" class="form-control" id="bankName" placeholder="Enter title..." v-model="name">
              <span v-if="$v.name.$dirty && !$v.name.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <div class="form-group mt-3">
              <label for="interestRate">Interest rate</label>
              <input type="text" class="form-control" id="interestRate" placeholder="Enter rate in %..." v-model="rate">
              <span v-if="$v.rate.$dirty && !$v.rate.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <div class="form-group mt-3">
              <label for="maxLoan">Maximum loan</label>
              <input type="text" class="form-control" id="maxLoan" placeholder="Enter amount in $..." v-model="loan">
              <span v-if="$v.loan.$dirty && !$v.loan.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <div class="form-group mt-3">
              <label for="minDownPayment">Minimum down payment</label>
              <input type="text" class="form-control" id="minDownPayment" placeholder="Enter amount in $..." v-model="payment">
              <span v-if="$v.payment.$dirty && !$v.payment.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <div class="form-group mt-3">
              <label for="loanTerm">Loan term</label>
              <input type="text" class="form-control" id="loanTerm" placeholder="Enter term in months..." v-model="term">
              <span v-if="$v.term.$dirty && !$v.term.required" class="calc-error text-danger">This input is required.</span>
            </div>
            <button class="btn btn-success mt-3" type="submit">Edit bank</button>
          </form>

      </div>

      <!-- BANKS LIST -->

      <div class="col-6">
        <div class="bank-ticket card bg-light mt-4" :key="bank.id" v-for="bank in banks">
          <div class="card-header d-flex justify-content-between">
            <span class="d-block">Bank "{{ bank.title }}"</span>
            <div>
              <button class="btn btn-outline-success" @click.prevent="startEditBank(bank.id)">Edit</button>
              <button class="btn btn-outline-danger" @click.prevent="deleteBank(bank.id)">Delete</button>
            </div>
          </div>
          <div class="card-body">
            <ul>
              <li class="interest-rate">Interest rate: {{ bank.interestRate }}%</li>
              <li class="max-loan">Maximum loan: {{ bank.maximumLoan }}$</li>
              <li class="min-down-payment">Minimum down payment: {{ bank.minimumDownPayment }}$</li>
              <li class="loan-term">Loan term: {{ bank.loanTerm }} months</li>
            </ul>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'banks-management-component',
  data: () => ({
    banks: [],
    name: '',
    rate: '',
    loan: '',
    payment: '',
    term: '',
    isEdit: false,
    currentBank: null
  }),
  validations: {
    name: { required },
    rate: { required },
    loan: { required },
    payment: { required },
    term: { required }
  },
  methods: {
    async loadBanks () {
      await fetch(this.$api + '/bank').then(r=>r.json()).then((response) => {
        this.banks = response.data
      }).catch((e) => { throw e })
    },
    async createBank() {
      // Validation
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      
      const b = {
        title: this.name,
        interest_rate: this.rate,
        max_loan: this.loan,
        min_down_payment: this.payment,
        loan_term: this.term
      }

      /**
       * Fixing error ERR_HTTP2_PROTOCOL_ERROR
       * (000webhost backend hosting)
       * 
       * In order for http2 to work for the client's post request,
       * it is necessary to rewrite the request via XMLHttpRequest
       */

      // await fetch(this.$api + '/bank/store', {
      //   method: 'post',
      //   body: JSON.stringify(newBank),
      //   headers: {
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // }).then(() => {
      //   console.log('Bank successfully saved in ' + process.env.VUE_APP_TITLE + ' website storage')
      //   alert('Bank has been successfully added!')
      // }).catch((e) => {
      //   console.log(e)
      //   alert('Error: ' + e)
      // })

      var http = new XMLHttpRequest()
      var params = 'title=' + b.title + '&interest_rate=' + b.interest_rate+ '&max_loan=' + b.max_loan 
        +'&min_down_payment=' + b.min_down_payment + '&loan_term=' + b.loan_term
      http.open('POST', this.$api + '/bank/store', true)

      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

      http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200) {
            console.log('Bank successfully saved in ' + process.env.VUE_APP_TITLE + ' website storage')
            alert('Bank has been successfully added!')
          }
      }
      http.send(params)

      this.resetFormData()
      this.loadBanks()
    },
    async deleteBank(id) {
      await fetch(this.$api + '/bank/' + id + '/delete' , { method: 'post' }).then(() => {
        console.log('Bank successfully deleted.')
        alert('Bank has been deleted successfully!')
      }).catch((e) => {
        console.log(e)
        alert('Error: ' + e)
      })

      this.loadBanks()
    },
    async startEditBank(id) {
      await fetch(this.$api + '/bank/' + id).then(r=>r.json()).then((response) => {
       this.currentBank = response.data
       this.isEdit = true
        this.name = this.currentBank.title
        this.rate = this.currentBank.interestRate
        this.loan = this.currentBank.maximumLoan
        this.payment = this.currentBank.minimumDownPayment
        this.term = this.currentBank.loanTerm
      }).catch((e) => { throw e })
    },
    async editBank(id) {
      // Validation
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      const b = {
        title: this.name,
        interest_rate: this.rate,
        max_loan: this.loan,
        min_down_payment: this.payment,
        loan_term: this.term
      }

      /**
       * Fixing error ERR_HTTP2_PROTOCOL_ERROR
       * (000webhost backend hosting)
       * 
       * In order for http2 to work for the client's post request,
       * it is necessary to rewrite the request via XMLHttpRequest
       */

      // await fetch(this.$api + '/bank/' + id + '/update', {
      //   method: 'post',
      //   body: JSON.stringify(newBank),
      //   headers: { 'Access-Control-Allow-Origin': '*' }
      // }).then(() => {
      //   console.log('Bank successfully updated in ' + process.env.VUE_APP_TITLE + ' website storage')
      //   alert('Bank has been successfully edited!')
      // }).catch((e) => {
      //   console.log(e)
      //   alert('Error: ' + e)
      // })

      var http = new XMLHttpRequest()
      var params = 'title=' + b.title + '&interest_rate=' + b.interest_rate+ '&max_loan=' + b.max_loan 
        +'&min_down_payment=' + b.min_down_payment + '&loan_term=' + b.loan_term
      http.open('POST', this.$api + '/bank/' + id + '/update', true)

      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

      http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200) {
            console.log('Bank successfully updated in ' + process.env.VUE_APP_TITLE + ' website storage')
            alert('Bank has been successfully edited!')
          }
      }
      http.send(params)

      this.resetFormData()
      this.loadBanks()
      this.isEdit = false
      this.currentBank = null
    },
    resetFormData() {
      this.name = ''
      this.rate = ''
      this.loan = ''
      this.payment = ''
      this.term = ''
      this.loadBanks()
    }
  },
  async created () {
    this.loadBanks()
  }
}
</script>

<style scoped>

.bank-ticket .card-header span {
  color: rgb(75, 75, 196);
  font-weight: 400;
  font-size: 22px;
}

.bank-ticket .card-header .btn:first-child {
  margin-right: 0.5em !important;
}

.calc-error {
  font-weight: 600;
}

</style>
