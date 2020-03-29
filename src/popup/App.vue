<template>
    <main>
        <IgnoreUrlSection></IgnoreUrlSection>
        <RequestsMonitor></RequestsMonitor>
    </main>
</template>

<script>
  import IgnoreUrlSection from '../components/IgnoreUrlSection'
  import RequestsMonitor from '../components/RequestsMonitor'

  export default {
    components: {
      IgnoreUrlSection,
      RequestsMonitor
    },
    created () {
      this.getAll();
    },
    methods: {
      // SOLUTION FOR QUIZ QUESTION 2 ==================================//
      GetItem1 (callback) {
        setTimeout(function () {
          callback({ value: Math.random() * 100 })
        }, Math.floor(Math.random() * 3000))
      },

      GetItem2 (callback) {
        setTimeout(function () {
          callback({ value: Math.random() * 100 })
        }, Math.floor(Math.random() * 5000))
      },

      getAll () {
        const tasks = [this.GetItem1, this.GetItem2]
        const allPromises = tasks.map(task => {
          return new Promise(resolve => {
            task(function (result) {
              resolve(result)
            })
          })
        })

        Promise.all(allPromises)
          .then(results => {
            if (results && results.length) {
              let sum = 0
              results.forEach(result => {
                sum = sum + result.value
              })
              console.log(`Quiz question 2 result: ${sum.toFixed(2)}`)
            }
          }).catch(error => {
          console.log(error.message)
        })
      }
      // END OF SOLUTION FOR QUIZ QUESTION 2 ==================================//
    }
  }
</script>

<style lang="sass">
    @import "../mixins"
    body
        width: 700px
        height: 550px

    main
        height: 100%
        +setGrid(1fr 1fr, 5px, null, null, "columns")

</style>
