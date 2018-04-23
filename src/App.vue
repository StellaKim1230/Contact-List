<template>
  <div id="container">
    <div class="page-header">
      <h1 class="text-center">연락처 관리 어플리케이션</h1>
      <p>(Dynamic Component + EventBus + Axios)</p>
    </div>
    <component :is="currentView"></component>
    <contactList></contactList>
    <paginate ref="pagebuttons"
      :page-count="totalpage"
      :page-range="7"
      :margin-pages="3"
      :click-handler="pageChanged"
      :prev-text="'이전'"
      :next-text="'다음'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>
  </div>
</template>

<script>
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import UpdatePhoto from './components/UpdatePhoto'

import CONF from './Config'
import Constant from './constant'
import Paginate from 'vuejs-paginate'
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components : {
    ContactList,
    ContactForm,
    UpdatePhoto,
    Paginate
  },
  computed: _.extend({
    totalpage : function(){
      var totalcount = this.contactlist.totalcount
      var pagesize = this.contactlist.pagesize
      return Math.floor((totalcount -1) / pagesize) + 1
    }
  }, mapState([
      'contactlist', 'currentView'
    ]) 
  ),
  mounted() {
    this.$store.dispatch(Constant.FETCH_CONTACTS)
  },
  methods: {
    pageChanged: function(page) {
      this.$store.dispatch(Constant.FETCH_CONTACTS, { pageno: page })
    }
  },
  watch : {
    'contactlist.pageno' : function(page) {
      this.$refs.pagebuttons.selected = page -1
    }
  }
}
</script>

<style lang="scss">
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");

#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smmothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
