 <template>
  <div class="activities">
    <div class="headerUser row">
      <div class="userText col-9">
        <h4>MEF UNIVERSITY</h4>
        <p>ahmet selim çil</p>
      </div>
      <div class="col-3">
        <div class="userImg">
          <img src="">
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <ul>
      <li class="nav-item" v-for="activity in activities" :key="activity.title">
        {{activity.title}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data: () => ({
      activities: [
        { title: 'Introduction to Computer Engineering	', url: 'Introduction'},
        { title: 'Computer Programming (Java)	', url: 'Computer'},
        { title: 'Calculus I	', url: 'Calculus'},
        { title: 'Physics I	', url: 'Physics'},
        { title: 'Physics I Lab	', url: 'Physics'},
        { title: 'English for Academic Purposes I	', url: 'English'},
        { title: 'Turkish Language and Literature I	', url: 'Turkish'},
      ]
    })
  }
</script>
<style lang="sass">
  .activities
    background: #191919
    color: #CACACA
    height: 100vh
    top: 0px
    right: 0px
    & ul
      padding: 0 10px
      margin: 0
      list-style: none
      height: 80vh
      overflow: auto
      & li
        background: #000
        color: #CACACA
        line-height: 30px
        overflow: hidden
        border-radius: 5px
        margin-bottom: 5px
        padding: 5px 10px
    .headerUser
      position: relative
      margin-bottom: 10px
      .userText
        float: left
        text-align: right
        padding-top: 10px
        & h4
          font-size: 16px
          font-weight: bold
          color: #CACACA
          padding: 0px
          margin: 0 0 0 0
        & p
          font-size: 10px
          font-weight: lighter
          color: #fff
      .userImg
        float: right
        width: 100%
        height: 50px
        background: #323232
</style>
