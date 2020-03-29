<template>
    <aside class="ignore-section">
        <header>
            <div class="ignore-input">
                <input type="url" name="URL" placeholder="Paste URL you'd like to ignore" v-model="ignore_model">
                <button class="ok-btn" :disabled="!ignore_model.length" @click="updateUrlToIgnoreList(null, true)">Add
                </button>
            </div>
        </header>
        <h3>Ignored URLs:</h3>
        <ul class="ignored-urls-list">
            <li v-for="(url, index) in ignored_urls" :key="index">
                <span :title="url">{{url}}</span>
                <button class="red-btn" @click="updateUrlToIgnoreList(url,false)">Delete</button>
            </li>
        </ul>
    </aside>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'IgnoreUrlSection',
    data () {
      return {
        ignore_model: '',
        baseRegex: '^https?:\\/\\/[^#?\\/]+'
      }
    },
    computed: {
      ...mapState(['ignored_urls'])
    },
    methods: {
      ...mapMutations(['updateIgnoredList']),
      /**
       * This function is called each timee user adds new URL to ignoree list
       * or removes URL from ignore list
       * @param url - String
       * @param flag - is TRUE if url should be added to ignore list
       */
      updateUrlToIgnoreList (url, flag) {
        this.updateIgnoredList({
          url: url ? url : this.ignore_model.match(this.baseRegex)[0],
          append: flag
        })
        flag ? this.ignore_model = '' : null
      }
    }
  }
</script>

<style lang="sass">
    @import "../mixins"
    .ignore-section
        overflow: hidden
        padding: 5px 0 0 10px
        max-width: 340px
        +shadowGenerator(0px 2px 3px 0px rgba(0, 0, 0, 0.3))
        +setGrid(null, null, 50px auto 1fr, 5px, "rows")

    header
        padding: 5px 10px 0 0

    h3
        margin: 0

    .ignore-input
        padding: 0
        border: none
        height: 100%
        position: relative
        +setGrid(1fr 50px, 10px, null, null, "columns")

        input
            width: 100%
            height: 40px
            outline: none
            font-size: 13px
            padding: 2px 5px
            box-sizing: border-box

    .url-not-valid
        color: red
        position: absolute
        bottom: -15px
        left: 0

    .ignored-urls-list
        overflow: auto
        padding: 0 10px 0 0

        li
            height: 40px
            border-bottom: solid 1px $dark_grey
            align-items: center
            +setGrid(1fr auto, 10px, null, null, "columns")

            .red-btn
                height: 30px

        span
            color: $main_blue
            +ellipsis()

</style>
