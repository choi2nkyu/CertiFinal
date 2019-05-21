import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

const vm = new Vue({
  router,
  store,

  template: '<div>I\'m mounted</div>',
  created(){
    console.log('Created');
    
    if(window.localStorage.length>0){
        this.$store.dispatch('retrieveAllData');
        console.log("Retrieving Data");
    }
    
  },
  mounted(){
    console.log('Mounted');
  },

  render: function(h) {
    return h(App)
  },
}).$mount('#app')

