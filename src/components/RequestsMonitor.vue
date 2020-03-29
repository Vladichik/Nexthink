<template>
    <section class="requests-monitor">
        <h3>Requests Monitor</h3>
        <ul class="requests-lists" v-if="requests_list.length">
            <li v-for="request in requests_list" :key="request.timeStamp" :class="{'ignored': !request.accepted}">
                <span>{{request.initiator}}</span>
                <span>{{request.requestId}}</span>
                <span>{{getRowStatus(request)}}</span>
            </li>
        </ul>
        <list-placeholder v-if="!requests_list.length"></list-placeholder>
    </section>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  import ListPlaceholder from './EmptyMonitorViewPlaceholder'

  export default {
    name: 'RequestsMonitor',
    components: {
      ListPlaceholder
    },
    data () {
      return {
        requests_list: []
      }
    },
    created () {
      this.initiateRequestsListener()
    },
    computed: {
      ...mapState(['ignored_urls'])
    },
    methods: {
      /**
       * This function sets the status of Requests Monitor lists row IGNORED/SENDING/SENT
       * @param request - Object with relevant request data
       * @return {string}
       */
      getRowStatus: (request) => {
        return !request.accepted ? 'IGNORED' : request.accepted && request.done ? 'SENT' : request.accepted ? 'SENDING...' : ''
      },

      /**
       * Function that initiates listener for browser http requests.
       */
      initiateRequestsListener () {
        const self = this
        browser.runtime.onMessage.addListener(function (msg) {
          msg.accepted = !self.ignored_urls.includes(msg.initiator)
          const alreadyExists = self.requests_list.some(url => url.requestId === msg.requestId)
          if (!alreadyExists) {
            self.requests_list.unshift(msg)
          }
          self.sendRequestDataToServer(msg)
        })
      },

      /**
       * This part sends requst data to server
       * @param msg - object that contains request data
       */
      sendRequestDataToServer (msg) {
        if (msg.accepted) {
          axios.post('https://jsonplaceholder.typicode.com/posts', msg).then(resp => {
            const foundRequest = this.requests_list.find(item => item.requestId === resp.data.requestId)
            if (foundRequest) {
              foundRequest.done = true
            }
          })
        }
      }
    }
  }
</script>

<style lang="sass">
    @import "../mixins"
    .requests-monitor
        overflow: hidden
        padding: 10px 0 0 10px
        +setGrid(null, null, auto 1fr, 10px, "rows")

    .requests-lists
        overflow: auto

        li
            padding: 0 0 0 5px
            align-items: center
            background: lightgreen
            color: green
            border-bottom: solid 1px #7dd67d
            height: 30px
            +setGrid(1fr auto 80px, 5px, null, null, "columns")

            span
                &:first-child
                    +ellipsis()

                &:last-child
                    display: flex
                    justify-content: flex-end
                    font-weight: bold
                    padding: 0 5px 0 0

            &.ignored
                background: #f0aaaf
                color: red
                border-bottom: solid 1px #e09a9f

</style>
