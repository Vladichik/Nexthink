<template>
    <main>
        <IgnoreUrlSection></IgnoreUrlSection>
        <RequestsMonitor></RequestsMonitor>
    </main>
</template>

<script>
  import IgnoreUrlSection from '../components/IgnoreUrlSection';
  import RequestsMonitor from '../components/RequestsMonitor';

  export default {
    components: {
      IgnoreUrlSection,
      RequestsMonitor
    },
    data () {
      return {}
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
