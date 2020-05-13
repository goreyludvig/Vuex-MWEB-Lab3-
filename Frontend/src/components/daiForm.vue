<template>
  <form v-if="visible" @submit.prevent>
    <label>Ім'я<input type="text" v-model="dai.name" required /></label><br />
    <label>Марка<input type="text" v-model="dai.mark" required /></label><br />
    <label>Номер<input type="number" v-model="dai.number" /></label><br />
    <label>Рік випуску<input type="number" v-model.number="dai.year" min="1885" step="1" /></label><br />
    <input type="button" @click="save" value="Зберегти" />
     <input type="button" @click="hideForm" value="Відміна">
  </form>
</template>

<script>
import setInput from "./setInput";
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "daiForm",
  data() {
    return {
    }
  },
  components: {
    setInput
  },
  computed:{
        ...mapState({
            driver:"formDriver",
            visible:"formVisible",
            newMode:"formNewMode"
        })
    },
  methods:{
        ...mapActions(["patchDriver","postDriver"]),
        ...mapMutations(["hideForm"]),
        async save(){
            if (this.newMode)
                await this.postDriver(this.driver);
            else
                await this.patchDriver(this.driver);    
            this.hideForm();         
        }
    }
}
</script>
<style scoped>
    form{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white ;
    }
</style>