<template>
    <div>
        <p v-if="drivers.length==0" class="alert">
            Водії відсутні
        </p>
        
        <table v-if="drivers.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('name')">  Ім'я </th>
                <th v-on:click="sort('mark')">  Марка </th>
                <th v-on:click="sort('number')"> Номер </th>
                <th v-on:click="sort('year')"> Рік </th>
                <th></th>
            </tr>
            <daiTableRow v-for="(driver,index) in drivers" 
                v-bind:key="driver._id" 
                v-bind="{driver,index}"
            >             
            </daiTableRow>
        </table>
    </div> 
</template>

<script>
import daiTableRow from "./daiTableRow";
import { mapGetters, mapMutations } from 'vuex';

export default {
    name:"daiTable",
    data(){
        return{

        }
    },
    components:{
        daiTableRow
    },
    methods:{
        ...mapMutations({
            sort:"sortDrivers"
        })
    }  
}
</script>

<style scoped>
    .alert{
        background: yellow;
        color: crimson;
    }
    table, table td{
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
    }
</style>