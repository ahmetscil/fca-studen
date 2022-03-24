 <template>
  <div>
    <div class="row px-0 mt-3">
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <div v-if="lectureStatus == true" class="video">
          <SurveyView v-if="showSurvey" :surveyID="socketSurvey_ID" :lectureID="lectureID" :datas="getSurvey.surveyJS"></SurveyView>
          <iframe v-else :src="videoinfo" width="100%" height="100%" frameborder="0" title="" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

        </div>
        <div v-else-if="lectureStatus == false" class="videoNotStarted">
          <p>The course could not be started automatically <i class="far fa-frown"></i></p>
          <button type="button" class="btn btn-info" @click="startManuel()">
            <i class="fas fa-play"></i> Start Mauel
          </button>
        </div>
        <div v-else class="noting">
          bağlantı kurulamadı
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 videoActionsArea">
        <div class="videoChatBox">
          <ul>
            <li v-for="(l,i) in liveMessages" :key="i">
              <p>{{l}}</p>
            </li>
          </ul>
        </div>
        <div class="videoChat">
          <div class="row">
            <div class="col-10">
              <textarea class="form-control" v-model="sendMessToInstructor" rows="3"></textarea>
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-warning" @click="sendMessageToInstructor(sendMessToInstructor)"><i class="fas fa-paper-plane"></i></button>
            </div>
          </div>
          <div class="sendFeedback">
            <span class="sfb sfbPositive" @click="student_feedback(1)">
              <i class="far fa-grin fa-2x"></i>
            </span>
            <span class="sfb sfbNegative" @click="student_feedback(2)">
              <i class="far fa-frown fa-2x"></i>
            </span>
            <span class="sfb sfbUnderstood" @click="student_feedback(3)">
              <i class="far fa-laugh-wink fa-2x"></i>
            </span>
            <span class="sfb sfbNotUnderstood" @click="student_feedback(4)">
              <i class="far fa-meh-rolling-eyes fa-2x"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 videoInfo">
        <h3>Lecture Title</h3>
        <h5>DepartmentName - CourseName - InstructorName</h5>
        <h5>25.07.2019 17:47</h5>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'App',
    data: () => ({
	    user_ID: null,
	    user_email: null,
	    user_type: 'student',
	    lectureID: null,
      user_name: null,
      sendMessToInstructor: '',
      liveMessages: [],
    }),
    destroyed() {
      this.$store.dispatch("goodbySocket");
      this.$store.dispatch("quitLesson", {...this.lecture, id: this.lectureID});
    },
    mounted() {
      this.goToLivePage();
      this.item_ID = `${this.$route.params.url}`;
        this.lectureID = this.$route.params.url,
      this.startManuel();
      TweenMax.to('.pageLoader', 1, { width: '0px', left: '100%', ease: Expo.easeOut })
      setInterval(() => {
        this.goToLivePage()
      }, 10000);
      
    },
    computed: {
      ...mapState(['lectureStatus','videoinfo','getSurvey','showSurvey','socketSurvey_ID'])
    },
    methods: {
      ...mapMutations(['goToLivePage']),
      toggleNav() {
        $("#wrapper").toggleClass("toggled");
      },
      startManuel() {
        this.$store.dispatch('startLesson', {...this.lecture, 
          item_in_lecture_in: parseInt(this.$route.params.url),
          user_name: localStorage.getItem('userName'),
          user_ID: parseInt(localStorage.getItem('userID')),
          user_email: localStorage.getItem('userEmail'),
          user_type: localStorage.getItem('user_type')
        })
      },
      sendMessageToInstructor(e) {
        this.$store.dispatch("sendMessageToLesson", {...this.mss, id: this.lectureID, message: e});
        this.liveMessages.push(e);
        this.sendMessToInstructor = ''
      },
      student_feedback(e) {
        this.$store.dispatch("sendFeedback", {...this.feedback, id: this.$route.params.url, what: e});
      }
    }
  }
</script>
<style lang="sass">
  .sendFeedback
    width: 100%
    margin-top: 1rem
    position: relative
    text-align: center
    cursor: pointer
    border-radius: 5px
    overflow: hidden
    .sfb
      width: 25%
      line-height: 60px
      padding-top: 10px
      float: left
    .sfbPositive
      background: #cddc39
      color: #353434
      &:hover
        background: darken(#cddc39,5%)
    .sfbNegative
      background: #b549c7
      color: #ffecec
      &:hover
        background: darken(#b549c7,5%)
    .sfbUnderstood
      background: #FF9800
      color: #1d2021
      &:hover
        background: darken(#FF9800,5%)
    .sfbNotUnderstood
      background: #f44336
      color: #353434
      &:hover
        background: darken(#f44336,5%)
  .video
    width: 100%
    height: 80vh
    overflow: hidden
    background: #000
    border-radius: 10px
  .videoNotStarted
    width: 100%
    height: 80vh
    overflow: hidden
    background: #000
    border-radius: 10px
    color: #fff
    text-align: center
    padding-top: 36vh
    font-size: 20px
  .videoActionsArea
    height: 80vh
    position: relative
    .videoChatBox
      border-radius: 5px
      height: 60vh
      overflow: auto
      margin-bottom: 2vh
      & ul
        list-style: none
        padding: 5px
        & li
          float: right
          text-align: right
          padding: 4px 10px 7px 25px
          font-size: 13px
          background: #1e425870
          width: -webkit-fit-content
          width: -moz-fit-content
          width: fit-content
          clear: both
          color: #e2e2e2
          font-weight: lighter
          margin-bottom: 8px
          border-radius: 5px 0px 0px 15px
          border-bottom: 5px #00000080 solid
  .videoInfo
    margin-top: 0.5rem
    color: #fff
    & h3
      padding: 0px
      margin: 0px
      font-size: 20px
      font-weight: lighter
    & h5
      padding: 0px
      margin: 10px 0px
      font-size: 14px
      font-weight: lighter
  .videoChat
    height: 18vh
    float: right
    width: 100%
    .form-control
      width: 100%
      background: #1e425870
      color: #e2e2e2
      border: none
      font-size: 13px
  // .sfbPositive
  // .sfbNegative
  // .sfbNotr
  // .sfbQuestion
</style>