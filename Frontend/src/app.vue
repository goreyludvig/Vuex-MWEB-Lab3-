<template>
  <div id="app">
    <messageSystem></messageSystem>
    <searchString></searchString>
    <hr>
    <queryForm></queryForm>
    <hr>
    <input type="button" @click="showAddForm()" value=" Додати водія" />
    <daiTable></daiTable>
    <daiForm></daiForm>
  </div>
</template>

<script>
import Vue from "vue";
import daiTable from "./components/daiTable";
import daiForm from "./components/daiForm";
import searchString from "./components/searchString";
import queryForm from "./components/queryForm";
import messageSystem from "./components/messageSystem";
import axios from "axios";
import { mapActions } from 'vuex';

export default { 
  name: "app",
  components: {
    daiTable,
    daiForm,
    searchString,
    queryForm,
    messageSystem
  },
  data() {
    return {
      };
  },    
  mounted() {    
    this.getDrivers(); 
  },  //методи 
  methods: {
    ...mapActions(["showMessageForTime", "getDrivers", "showAddForm"]),   
  },
  
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>