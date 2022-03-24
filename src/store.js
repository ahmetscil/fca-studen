/* eslint-disable no-case-declarations */
/* eslint-disable no-debugger */
/* eslint no-undef: "error" */
/* eslint-env browser */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Toasted from 'vue-toasted'
import { router } from './router'
Vue.use(Vuex)
Vue.use(Toasted)
const connection = new WebSocket('wss://3smg9tk01m.execute-api.eu-west-1.amazonaws.com/Prod')
const store = new Vuex.Store({
  state: {
    site: [],
    siteName: 'FCA',
    apiLink: 'https://iuzh9u0mo7.execute-api.eu-west-1.amazonaws.com/prod/',
    access_token: null,
    themeClasses: {
      containerClass: 'container-fluid ',
      mainClass: 'col-md-9 col-lg-10 ml-sm-auto col-lg-10 px-2',
      navigationClass: 'sidebar shadow col-md-3 col-lg-2 bg-light d-none d-sm-none d-md-block ',
      headerClass: 'col-md-9 ml-sm-auto col-lg-10 px-2 navbar fixed-top flex-md-nowrap p-0 shadow ',
      navbarClass: 'navbar-brand col-sm-3 col-md-2 mr-0 ',
      dataListClass: 'dataList'
    },
    selectedTheme: {
      containerClass: 'body02',
      navigationClass: 'sidebar02',
      headerClass: 'navbar02',
      navbarClass: 'navbar-brand02',
      dataListClass: 'dataList02'
    },
    // socket
    lectureStatus: false,
    lectureID: null,
    videoinfo: '',
    getSurvey: [],
    showSurvey: false,
    socketSurvey_ID: '',
    // socket
    returnNumber: 0,
    messlist: [],
    messlistNewMessageCount: 0,
    breadmenu: [],
    getLecture: [],
    getLectureData: [],
    getLectureItems: [],
    getItems: [],
    selSingle: null,
    seluniversityID: null,
    seluniversityName: null,
    selfacultyID: null,
    selfacultyName: null,
    seldepartmentID: null,
    seldepartmentName: null,
    selcourseID: null,
    selcourseName: null,
    pageLoader: true,
    showStudent: [],
    studentHomeData: [],
    getUser: [],
    returncode: {
      200: "Succes",
      301: "Access Token Has Expired.",
      302: "account has no acces to reach/create to this",
      401: "The username or password is incorrect",
      402: "Password reset required for the user",
      403: "User does not exist.",
      404: "An account with the given email already exists.",
      405: "NEW_PASSWORD_REQUIRED",
      406: "acces token does not fit the format",
      407: "Student does not exist.",
      408: "Instructor does not exist.",
      409: "No Data!",
      500: "Web socket erros",
      501: "First password changing must be done with tempPassword.",
      502: "Attempt limit exceeded, please try after some time.",
      503: "User with this email is not found.",
      504: "Expired Code. Invalid code provided, please request a code again.",
      505: "Wrong Code. Invalid verification code provided, please try again.",
      601: "There is a University with this name",
      602: "There is Department with this name in this faculty.",
      603: "There is a Faculty with this name in this university.",
      604: "There is a User with this email.",
      606: "There is no lecture with this ID",
      701: "This instructor and course relation is already exist.",
      702: "This student and course relation is already exist.",
      703: "There is a Course with this name in this Department. and same term",
      704: "There is no University with this name.",
      705: "There is no Faculty with this name in this university.",
      706: "There is no Department with this name in this faculty.",
      707: "There is no University with this University_ID.",
      708: "There is no Faculty with this ID in this university.",
      801: "Lecture already deleted.",
      802: "Not implemented user type homepage data.",
      999: "User email and user ID are not same",
      1212: "uni enabld bu db update error",
      4002: "update list fields not okey",
      4003: "Body field is emty",
      4004: "Needed Values not include in the body.",
      4005: "More Than one Optional value. Send only one option",
      4008: "Admin user can not create with APIs. Please connect us",
      4099: "No item in this lecture",
      6006: "Unssiqn error",
      6066: "User delete error",
      6666: "couse delete error",
      7077: "user not exist or already deleted",
      8022: "Update error",
      11999: "live lecture data coulnt save to db",
      19999: "live lecture data coulnt save to s3",
      99998: "surveryJS info coudt insertedto db",
      99999: "surveryJS File coudt insertedto s3"
    }
  },
  mutations: {
    clearUnreadMessage(state) {
      state.messlistNewMessageCount = 0
    },
    clearToken(state) {
      state.userToken = ''
      localStorage.removeItem('user_type')
      localStorage.removeItem('id_token')
      localStorage.removeItem('access_token')
      localStorage.removeItem('siteToken')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userName')
      localStorage.removeItem('userAvatar')
      localStorage.removeItem('userUniversity')
      localStorage.removeItem('userFaculty')
      localStorage.removeItem('userDepartment')
    },
    goToLivePage(state) {
      state.themeClasses.containerClass = 'container-fluid ' + state.selectedTheme.containerClass
      state.themeClasses.mainClass = 'col-md-12 col-lg-12 ml-sm-auto px-2'
      state.themeClasses.navigationClass = 'd-none'
      state.themeClasses.headerClass = 'col-md-12 ml-sm-auto col-lg-12 px-2 navbar fixed-top flex-md-nowrap p-0 shadow ' + state.selectedTheme.headerClass
      state.themeClasses.dataListClass = 'dataList ' + state.selectedTheme.dataListClass
    },
    homePage(state) {
      state.themeClasses.containerClass = 'container-fluid'
      state.themeClasses.mainClass = 'col-md-12 ml-sm-auto col-lg-12 px-2'
      state.themeClasses.navigationClass = 'd-none'
      state.themeClasses.headerClass = 'd-none'
    },
    returnNormal(state) {
      state.themeClasses.containerClass = 'container-fluid ' + state.selectedTheme.containerClass
      state.themeClasses.mainClass = 'col-md-9 col-lg-10 ml-sm-auto px-2'
      state.themeClasses.navigationClass = 'sidebar shadow col-md-3 col-lg-2 bg-light d-none d-sm-none d-md-block ' + state.selectedTheme.navigationClass
      state.themeClasses.navbarClass = 'navbar-brand col-md-12 mr-0 shadow ' + state.selectedTheme.navbarClass
      state.themeClasses.headerClass = 'col-md-9 ml-sm-auto col-lg-10 px-2 navbar fixed-top flex-md-nowrap p-0 shadow ' + state.selectedTheme.headerClass
      state.themeClasses.dataListClass = 'dataList ' + state.selectedTheme.dataListClass
    },
    setBread(state, payload) {
      switch (payload.what) {
        case 'university':
          this.dispatch('breadcrumb', { ...this.select, what: 'university', id: payload.id, name: payload.name })
          break
        case 'faculty':
          this.dispatch('breadcrumb', { ...this.select, what: 'faculty', id: payload.id, name: payload.name })
          break
        case 'department':
          this.dispatch('breadcrumb', { ...this.select, what: 'department', id: payload.id, name: payload.name })
          break
        case 'course':
          this.dispatch('breadcrumb', { ...this.select, what: 'course', id: payload.id, name: payload.name })
          break
      }
    },
    selectTheme(state, payload) {
      localStorage.setItem('selectedTheme', payload.what)
      setTimeout(() => {
        switch (payload.what) {
          case 'dark':
            state.themeClasses.containerClass = 'container-fluid body01'
            state.themeClasses.navigationClass = 'sidebar shadow col-md-3 col-lg-2 bg-light d-none d-sm-none d-md-block sidebar01'
            state.themeClasses.headerClass = 'col-md-9 ml-sm-auto col-lg-10 px-2 navbar fixed-top flex-md-nowrap p-0 shadow navbar01'
            state.themeClasses.navbarClass = 'navbar-brand col-md-12 mr-0 shadow navbar-brand01'
            state.themeClasses.dataListClass = 'dataList dataList01'
            state.selectedTheme.containerClass = 'body01'
            state.selectedTheme.navigationClass = 'sidebar01'
            state.selectedTheme.headerClass = 'navbar01'
            state.selectedTheme.navbarClass = 'brand01'
            state.selectedTheme.dataListClass = 'dataList01'
            break
          case 'colourful':
            state.themeClasses.containerClass = 'container-fluid body02'
            state.themeClasses.navigationClass = 'sidebar shadow col-md-3 col-lg-2 bg-light d-none d-sm-none d-md-block sidebar02'
            state.themeClasses.headerClass = 'col-md-9 ml-sm-auto col-lg-10 px-2 navbar fixed-top flex-md-nowrap p-0 shadow navbar02'
            state.themeClasses.navbarClass = 'navbar-brand col-md-12 mr-0 shadow navbar-brand02'
            state.themeClasses.dataListClass = 'dataList dataList02'
            state.selectedTheme.containerClass = 'body02'
            state.selectedTheme.navigationClass = 'sidebar02'
            state.selectedTheme.headerClass = 'navbar02'
            state.selectedTheme.navbarClass = 'navbar-brand02'
            state.selectedTheme.dataListClass = 'dataList02'
            break
          case 'light':
            state.themeClasses.containerClass = 'container-fluid body03'
            state.themeClasses.navigationClass = 'sidebar shadow col-md-3 col-lg-2 bg-light d-none d-sm-none d-md-block sidebar03'
            state.themeClasses.headerClass = 'col-md-9 ml-sm-auto col-lg-10 px-2 navbar fixed-top flex-md-nowrap p-0 shadow navbar03'
            state.themeClasses.navbarClass = 'navbar-brand col-md-12 mr-0 shadow navbar-brand03'
            state.themeClasses.dataListClass = 'dataList dataList03'
            state.selectedTheme.containerClass = 'body03'
            state.selectedTheme.navigationClass = 'sidebar03'
            state.selectedTheme.headerClass = 'navbar03'
            state.selectedTheme.navbarClass = 'brand03'
            state.selectedTheme.dataListClass = 'dataList03'
            break
          default:
            break
        }
        TweenMax.to('.pageLoader', 1, { width: '0px', left: '100%', ease: Expo.easeOut })
      }, 500)
    }
  },
  actions: {
    initAuth({ state }) {
      if (!localStorage.getItem('userToken')) {
        router.push({ name: 'Auth' })
        return false
      } else {
        state.token = localStorage.getItem('siteToken')
      }
    },
    login({ state }, authData) {
      return axios.put(
        state.apiLink + 'authenticate', { email: authData.email, password: authData.password }, { method: 'PUT' },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      ).then(response => {
        TweenMax.to('.pageLoader', 1, { width: '0px', left: '100%', ease: Expo.easeOut })
        let ret = response.data.status
        switch (ret) {
          case 200:
            let usertype = response.data.data.user_type
            if (usertype === 'student') {
              connection.send(JSON.stringify({
                "message": "setConnectionMetaData", "data": {
                  user_name: response.data.data.name_surname,
                  user_ID: parseInt(response.data.data.user_ID),
                  user_email: response.data.data.email,
                  user_type: response.data.data.user_type
                }
              }));

              localStorage.setItem('access_token', response.data.access_token)
              localStorage.setItem('id_token', response.data.id_token)
              localStorage.setItem('user_type', response.data.data.user_type)
              localStorage.setItem('userID', response.data.data.user_ID)
              localStorage.setItem('userEmail', response.data.data.email)
              localStorage.setItem('userName', response.data.data.name_surname)
              localStorage.setItem('userAvatar', response.data.data.user_profile_picture)
              localStorage.setItem('userUniversity', response.data.data.user_university_name)
              localStorage.setItem('userFaculty', response.data.data.user_faculty_name)
              localStorage.setItem('userDepartment', response.data.data.user_department_name)
              localStorage.setItem('userDepartmentID', response.data.data.user_department_ID)
              localStorage.setItem('selectedTheme', 'colourful')
              location.href = '/MyPage'
            }
            break
          case 402:
            Vue.toasted.show(state.returncode[ret], {
              type: 'error',
              duration: 2500,
              keepOnHover: true,
              theme: 'bubble'
            })
            router.push({ name: 'ChangePassword' })
            break
          case 405:
            Vue.toasted.show(state.returncode[ret], {
              type: 'error',
              duration: 2500,
              keepOnHover: true,
              theme: 'bubble'
            })
            router.push({ name: 'ChangeTempPassword' })
            break
          default:
            Vue.toasted.show(state.returncode[ret], {
              type: 'error',
              duration: 2500,
              keepOnHover: true,
              theme: 'bubble'
            })
            this.dispatch('logout')
            break
        }
      })
    },
    logout({ commit }) {
      commit('clearToken')
      router.push({ name: 'Auth' })
    },
    goodbySocket({ state }, lecture) {
      connection.onclose = (event) => {
        console.log(event);
      }
      connection.onmessage = (event) => {
        console.log(event.data)
      }
      connection.send(JSON.stringify({
        "message": "setConnectionMetaData", "data": {
          'item_in_lecture_out': parseInt(lecture.lectureID)
        }
      }));
      state.lectureStatus = false
    },
    startLesson({ state }, lecture) {
      connection.onclose = (event) => {
        console.log(event);
      }
      connection.onmessage = (event) => {
        var mess_data = JSON.parse(event.data);
        console.log(mess_data)
        switch (mess_data.type) {
          case 'groupCommand':
            switch (mess_data.command_code) {
              case 10:
                state.videoinfo = mess_data.jitsi_url
                break
              case 20:
                state.videoinfo = mess_data.vimeo_url
                state.showSurvey = false
                break
              case 14:
                state.socketSurvey_ID = mess_data.survey_ID
                this.dispatch('getSurveyJS', {...this.survey, id: mess_data.survey_ID})
                localStorage.setItem('pim_id', mess_data.pim_id)
                break
              case 15:
                state.showSurvey = false
                state.returnNumber = 2
                break
            }
            break
          case 'privateMess':
            state.messlist.push({ type: 'text', author: mess_data.sender_info.user_ID, data: { text: mess_data.text } })
            state.messlistNewMessageCount = 1
            break
        }
      }
      connection.send(JSON.stringify({
        "message": "setConnectionMetaData", "data": {
          'item_in_lecture_in': parseInt(lecture.item_in_lecture_in),
          'user_name': lecture.user_name,
          'user_ID': parseInt(lecture.user_ID),
          'user_email': lecture.user_email,
          'user_type': lecture.user_type,
        }
      }));
      state.lectureStatus = true
      Vue.toasted.show('Connected', {
        type: 'info',
        duration: 2500,
        keepOnHover: true,
        theme: 'bubble'
      })
    },
    getSurveyJS({state}, survey) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')
      axios.put(state.apiLink + 'data/get-surveyjs', {
        survey_ID: survey.id,
        access_token: localStorage.getItem('access_token')
      }).then(response => {
        $('#surveysLoader').hide()
        let ret = response.data.status
        switch (ret) {
          case 200:
            state.getSurvey = response.data.data
            state.showSurvey = true
            break
          default:
            Vue.toasted.show(state.returncode[ret], {
              type: 'error',
              duration: 2500,
              keepOnHover: true,
              theme: 'bubble'
            })
            break
        }
      }).catch((error) => {
        console.log(error)
        Vue.toasted.show('Please sign in again.', {
          type: 'error',
          duration: 2500,
          keepOnHover: true,
          theme: 'bubble'
        })
        this.dispatch('logout')
      })
    },
    startSocket({ state }, user) {
      connection.send(JSON.stringify({
        "message": "setConnectionMetaData", "data": {
          user_name: user.user_name,
          user_ID: parseInt(user.user_ID),
          user_email: user.user_email,
          user_type: user.user_type,
          item_in_lecture: parseInt(user.item_in_lecture)
        }
      }));
      connection.onclose = event => {
        var mess_data = JSON.parse(event.data);
        console.log(mess_data);
      }
      connection.onmessage = event => {
        var mess_data = JSON.parse(event.data);
        console.log(mess_data);
      }
    },
    quitLesson({ state }, lecture) {
      connection.send(JSON.stringify({
        "message": "setConnectionMetaData", "data": {
          'item_in_lecture_out': parseInt(lecture.id)
        }
      }));
      state.lectureStatus = false
    },
    sendFeedback({ state }, feedback) {
      connection.send(JSON.stringify({
        "message": "commandMessage", "data": {
          'to_lecture_item': parseInt(feedback.id),
          'command': feedback.what
        }
      }));
    },
    sendMessageToLesson({ state }, mss) {
      connection.send(JSON.stringify({
        'message': 'sendMessage', 'data': {
          'to_lecture_item': parseInt(mss.id),
          'message': mss.message
        }
      }));  
    },
    sendSurveyResult({ state }, mss) {
      console.log(mss)
      let surveyData = JSON.stringify({
        'message': 'sendMessage', 'data': {
          'pim_id': parseInt(mss.pim_id),
          'lecture_ID': parseInt(mss.id),
          'survey_ID': parseInt(mss.survey),
          'student_email': mss.student,
          'survey_result': mss.data,
        }
      })
      connection.send(surveyData);
      state.showSurvey = false

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')
      axios.put(state.apiLink + 'survey/save-result', {
        'student_id': parseInt(localStorage.getItem('userID')),
        'item_id': parseInt(mss.id),
        'survey_id': mss.survey,
        'pim_id': mss.pim_id,
        'responce': mss.data
      })
      .then(response => {
        console.log(response)
        Vue.toasted.show('Your answers were successfully sent', {type: 'info',duration: 2500,keepOnHover: true,theme: 'bubble'})

      }).catch((error) => {
        console.log(error)
        $('#lectureLoader').hide()
        Vue.toasted.show('Please sign in again.', {
          type: 'error',
          duration: 2500,
          keepOnHover: true,
          theme: 'bubble'
        })
        this.dispatch('logout')
      })

    },
    sendStudentMessage({ state }, getmessage) {
      console.log(getmessage)
      state.messlist.push(
        {
          type: 'text', author: getmessage.from,
          data:
            { text: getmessage.message.data.text }
        })
      connection.send(
        JSON.stringify({ message: "sendMessage", data: getmessage })
      );
    },
    getLecture({state}, selected) {
      if (selected.id) {
        $('#lectureLoader').show()
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')
        axios.put(state.apiLink + 'list-all/items', {
          lecture_ID: selected.id
        }).then(response => {
          state.getLecture = response.data
          state.getLectureData = response.data.data.items
          let ret = response.data.status
          $('#lectureLoader').hide()
          switch (ret) {
            case 200:
              break
            case 4099:
              Vue.toasted.show(state.returncode[ret], {
                type: 'error',
                duration: 2500,
                keepOnHover: true,
                theme: 'bubble'
              })
              break
            default:
              Vue.toasted.show(state.returncode[ret], {
                type: 'error',
                duration: 2500,
                keepOnHover: true,
                theme: 'bubble'
              })
              break
          }
        }).catch((error) => {
          console.log(error)
          $('#lectureLoader').hide()
          Vue.toasted.show('Please sign in again.', {
            type: 'error',
            duration: 2500,
            keepOnHover: true,
            theme: 'bubble'
          })
          this.dispatch('logout')
        })
      } else {
        this.$router.push({
          name: 'MyPage'
        })
      }
    },
    getLectureItems({state}, lecture) {
      if (lecture.lect) {
        $('#lectureLoader').show()
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')
        axios.put(state.apiLink + 'list-all/items', {
          lecture_ID: lecture.lect
        }).then(response => {
          state.getLectureItems = response.data.data
          let ret = response.data.status
          $('#lectureLoader').hide()
          switch (ret) {
            case 200:
              break
            case 4099:
              Vue.toasted.show(state.returncode[ret], {
                type: 'error',
                duration: 2500,
                keepOnHover: true,
                theme: 'bubble'
              })
              break
            default:
              Vue.toasted.show(state.returncode[ret], {
                type: 'error',
                duration: 2500,
                keepOnHover: true,
                theme: 'bubble'
              })
              break
          }
        }).catch((error) => {
          console.log(error)
          $('#lectureLoader').hide()
          Vue.toasted.show('Please sign in again.', {
            type: 'error',
            duration: 2500,
            keepOnHover: true,
            theme: 'bubble'
          })
          this.dispatch('logout')
        })
      } else {
        this.$router.push({
          name: 'MyPage'
        })
      }
    },
    getItems({
      state
    }, selected) {
      if (selected.id) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')
        axios.put(state.apiLink + 'data/get-any', {
          item_ID: selected.id,
          access_token: localStorage.getItem('access_token')
        }).then(response => {
          state.getItems = response.data.data
          let ret = response.data.status
          switch (ret) {
            case 200:
              break
            case 302:
              router.push({
                name: 'Auth'
              })
              break
            default:
              Vue.toasted.show(state.returncode[ret], {
                type: 'error',
                duration: 2500,
                keepOnHover: true,
                theme: 'bubble'
              })
              break
          }
        }).catch((error) => {
          console.log(error)
          Vue.toasted.show('Please sign in again.', {
            type: 'error',
            duration: 2500,
            keepOnHover: true,
            theme: 'bubble'
          })
          this.dispatch('logout')
        })
      } else {
        this.$router.push({
          name: 'MyPage'
        })
      }
    },
    getBread({ state }, selected) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')
      switch (selected.where) {
        case 'clear':
          state.breadmenu = []
          break
        case 'university':
          axios.put(state.apiLink + 'data/get-path?', {
            university_ID: selected.what,
            access_token: localStorage.getItem('access_token')
          }).then(response => {
            state.breadmenu = response.data.data
            localStorage.setItem('selectedUniversity', state.breadmenu.university_ID)
          })
          break
        case 'faculty':
          axios.put(state.apiLink + 'data/get-path?', {
            faculty_ID: selected.what,
            access_token: localStorage.getItem('access_token')
          }).then(response => {
            state.breadmenu = response.data.data
            localStorage.setItem('selectedUniversity', state.breadmenu.university_ID)
            localStorage.setItem('selectedFaculty', state.breadmenu.faculty_ID)
          })
          break
        case 'department':
          axios.put(state.apiLink + 'data/get-path?', {
            department_ID: selected.what,
            access_token: localStorage.getItem('access_token')
          }).then(response => {
            state.breadmenu = response.data.data
            localStorage.setItem('selectedUniversity', state.breadmenu.university_ID)
            localStorage.setItem('selectedFaculty', state.breadmenu.faculty_ID)
            localStorage.setItem('selectedDepartment', state.breadmenu.department_ID)
          })
          break
        case 'course':
          axios.put(state.apiLink + 'data/get-path?', {
            course_ID: selected.what,
            access_token: localStorage.getItem('access_token')
          }).then(response => {
            state.breadmenu = response.data.data
            localStorage.setItem('selectedUniversity', state.breadmenu.university_ID)
            localStorage.setItem('selectedFaculty', state.breadmenu.faculty_ID)
            localStorage.setItem('selectedDepartment', state.breadmenu.department_ID)
            localStorage.setItem('selectedCourses', state.breadmenu.course_ID)
          })
          break
        case 'user':
          axios.put(state.apiLink + 'data/get-path?', {
            user_ID: selected.what,
            access_token: localStorage.getItem('access_token')
          }).then(response => {
            state.breadmenu = response.data.data
          })
          break
      }
    },
    getUser({ state }, selected) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')
      axios.put(state.apiLink + 'data/user-detail', {
        user_email: selected.usermail,
        access_token: localStorage.getItem('access_token')
      }).then(response => {
        state.getUser = response.data.data
        $('#studentLoader').hide()
        $('#instructorLoader').hide()
        let ret = response.data.status
        switch (ret) {
          case 200:
            this.dispatch('getBread', { ...this.selected, where: 'user', what: state.getUser.user_ID })
            break
          default:
            Vue.toasted.show(state.returncode[ret], {
              type: 'error',
              duration: 2500,
              keepOnHover: true,
              theme: 'bubble'
            })
            break
        }
      }).catch((error) => {
        console.log(error)
        Vue.toasted.show('Lütfen yeniden oturum açın.', {
          type: 'error',
          duration: 2500,
          keepOnHover: true,
          theme: 'bubble'
        })
        this.dispatch('logout')
      })
    },
    loadStudentHomePage({ state }, selectedUser) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token')
      axios.put(state.apiLink + 'data/homepage', {
        email: localStorage.getItem('userEmail'),
        user_type: 'student'
      }).then(response => {
        $('#studentHomepageLoader').hide()
        let ret = response.data.status
        switch (ret) {
          case 200:
            break
          case 302:
            router.push({ name: 'Auth' })
            break
          default:
            Vue.toasted.show(state.returncode[ret], {
              type: 'error',
              duration: 2500,
              keepOnHover: true,
              theme: 'bubble'
            })
            break
        }
        state.studentHomeData = response.data.data
      }).catch((error) => {
        console.log(error)
        Vue.toasted.show('Lütfen yeniden oturum açın.', {
          type: 'error',
          duration: 2500,
          keepOnHover: true,
          theme: 'bubble'
        })
        this.dispatch('logout')
      })
    },
    breadcrumb({ state }, selected) {
      switch (selected.what) {
        case 'university':
          state.seluniversityID = selected.id
          state.seluniversityName = selected.name
          state.selfacultyID = null
          state.selfacultyName = null
          state.seldepartmentID = null
          state.seldepartmentName = null
          state.selcourseID = null
          state.selcourseName = null
          state.selSingle = null
          break
        case 'faculty':
          state.selfacultyID = selected.id
          state.selfacultyName = selected.name
          state.seldepartmentID = null
          state.seldepartmentName = null
          state.selcourseID = null
          state.selcourseName = null
          state.selSingle = null
          break
        case 'department':
          state.seldepartmentID = selected.id
          state.seldepartmentName = selected.name
          state.selcourseID = null
          state.selcourseName = null
          state.selSingle = null
          break
        case 'course':
          state.selcourseID = selected.id
          state.selcourseName = selected.name
          state.selSingle = null
          break
        case 'user':
          state.seluniversityID = null
          state.seluniversityName = null
          state.selfacultyID = null
          state.selfacultyName = null
          state.seldepartmentID = null
          state.seldepartmentName = null
          state.selcourseID = null
          state.selcourseName = null
          state.selSingle = selected.name
          break
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      if (localStorage.getItem('access_token')) {
        state.accessToken = localStorage.getItem('access_token')
        return true
      } else {
        return false
      }
    }
  }
})
export default store
