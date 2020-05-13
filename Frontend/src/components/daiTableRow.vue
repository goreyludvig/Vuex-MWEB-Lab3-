<template>
    <tr>        
        <td> {{index+1}} </td>
        <td> {{dai.name}} </td>
        <td> {{dai.mark}} </td>
        <td> {{dai.number}} </td>
        <td> {{new Date(dai.year).toLocaleDateString()}} </td>
        <td>
            <input type="button" value="Вилучити" @click="deleteDriver(driver)">
            <input type="button" value="Редагувати" @click="showUpdateForm(driver)">
        </td>        
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"daiTableRow",
    props:{
        index:Number,
        book:Object        
    },
    data(){   
        return{

        }
    },
    methods:{        
        ...mapActions(["deleteDriver", "showUpdateForm"]),
        updated(){
        console.log(this.driver);
        }  
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>