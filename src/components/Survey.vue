<template>
  <div class="survey__backgr" id="surveyCreatorContainer">
    <survey :survey="getSurveyData"></survey>
  </div>
</template>
<script>
import * as SurveyVue from 'survey-vue'
var Survey = SurveyVue.Survey
Survey.cssType = 'bootstrap'
import * as widgets from 'surveyjs-widgets'
import 'inputmask/dist/inputmask/phone-codes/phone.js'
import { init as customWidget } from '../customwidget'
widgets.icheck(SurveyVue)
widgets.select2(SurveyVue)
widgets.inputmask(SurveyVue)
widgets.jquerybarrating(SurveyVue)
// widgets.jqueryuidatepicker(SurveyVue)
widgets.nouislider(SurveyVue)
widgets.select2tagbox(SurveyVue)
widgets.signaturepad(SurveyVue)
widgets.sortablejs(SurveyVue)
widgets.ckeditor(SurveyVue)
widgets.autocomplete(SurveyVue)
widgets.bootstrapslider(SurveyVue)
customWidget(SurveyVue)
SurveyVue.Serializer.addProperty('question', 'tag:number')
let model
  import { mapState, mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    Survey
  },
  props: ['datas','surveyID','lectureID'],
  data() {
    return {
      survey: model
    }
  },
  watch: {
    returnNumber: function (e) {
      if (e === 2) {
        console.log(e)
        this.getSurveyData()
      }
    }
  },
  computed: {
    ...mapState(['returnNumber']),
    getSurveyData: function() {
      console.log('asd')
      var vm = this
      model = new SurveyVue.Model(this.datas)
      model.onComplete.add(function (result) {
        vm.sendSurveyRes(result.data)
      })
      return model
    }
  },
  mounted() {
    console.log(this.returnNumber)
  },
  methods: {
    sendSurveyRes(e){
      this.$store.dispatch('sendSurveyResult', {
        ...this.mss, 
        id: this.lectureID, 
        survey: this.surveyID, 
        student: localStorage.getItem('userEmail'), 
        pim_id: localStorage.getItem('pim_id'), 
        data: e
      })
    }
  }
}
</script>
<style scoped lang="sass">
  .survey__backgr
    background: #fff
</style>