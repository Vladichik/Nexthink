<template>
    <section class="requests-monitor">
        <h3>Requests Monitor</h3>
        <ul class="requests-lists">
            <li v-for="request in requests_list" :key="request.timeStamp" :class="{'ignored': !request.accepted}">
                <span>{{request.initiator}}</span>
                <span>{{request.requestId}}</span>
                <span>{{getRowStatus(request)}}</span>
            </li>
        </ul>
    </section>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from "axios";

  export default {
    name: 'RequestsMonitor',
    data() {
      return {
        requests_list: []
      }
    },
    created () {
      const self = this;
      browser.runtime.onMessage.addListener(function (msg) {
        msg.accepted = !self.ignored_urls.includes(msg.initiator);
        self.requests_list.unshift(msg);
        if (msg.accepted) {
          axios.post('https://jsonplaceholder.typicode.com/posts', msg).then(resp => {
            const foundRequest = self.requests_list.find(item => item.requestId === resp.data.requestId);
            if (foundRequest) {
              foundRequest.done = true;
            }
          })
        }
      });
    },
    computed: {
      ...mapState(["ignored_urls"])
    },
    methods: {
      /**
       * This function sets the status of Requests Monitor lists row IGNORED/SENDING/SENT
       * @param request - Object with relevant request data
       * @return {string}
       */
      getRowStatus: (request) => {
        return !request.accepted ? "IGNORED" : request.accepted && request.done ? "SENT" : request.accepted ? "SENDING..." : "";
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
            align-items: center
            background: lightgreen
            color: green
            height: 25px
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

</style>
