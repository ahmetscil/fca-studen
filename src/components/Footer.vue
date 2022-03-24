 <template>
  <footer>

<beautiful-chat
      :participants="participants"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messlist"
      :newMessagesCount="messlistNewMessageCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showEmoji="false"
      :showFile="false"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      @onType="handleOnType" />
  </footer>
</template>
<script>
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      icons:{
        open:{
          img: OpenIcon,
          name: 'default',
        },
        close:{
          img: CloseIcon,
          name: 'default',
        },
        file:{
          img: FileIcon,
          name: 'default',
        },
        closeSvg:{
          img: CloseIconSvg,
          name: 'default',
        },
      },
      participants: [
        {
          id: 'user1',
          name: 'Matteo',
          imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
        {
          id: 'user2',
          name: 'Support',
          imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        }
      ],
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      
      isChatOpen: false,
      showTypingIndicator: '',
      colors: {
        header: {
          bg: 'linear-gradient(45deg, #1f1227, #614767)',
          text: '#ffffff'
        },
        launcher: {
          bg: '#614767'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#614767',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: 'rgb(201, 255, 218)',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      },
      alwaysScrollToBottom: false,
      messageStyling: true
    }
  },
  computed: {
    ...mapState(['messlist','messlistNewMessageCount'])
  },
  methods: {
    ...mapMutations(['clearUnreadMessage']),
    sendMessage (text) {
      if (text.length > 0) {
        this.messlistNewMessageCount = this.isChatOpen ? this.messlistNewMessageCount : this.messlistNewMessageCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      this.$store.dispatch('sendStudentMessage', {...this.getmessage, from: 'me', to: 35, message: message})
    },
    openChat () {
      this.isChatOpen = true
      this.clearUnreadMessage()
    },
    closeChat () {
      this.isChatOpen = false
    },
    handleScrollToTop () {
  	},
    handleOnType () {
      // kullanıcı mesaj kutusuna bir şeyler yazıyor
    },
    focus() {
      console.log('focus')
    }
  }
}
</script>
<style lang="sass">

</style>