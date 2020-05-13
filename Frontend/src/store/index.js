import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        messages: [],
        drivers: [],
        searchString: "",
        formVisible: false,
        formDriver: {},
        formNewMode: true
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredDrivers(state) {
            let result = state.drivers;
            if (state.searchString)
                result = result.filter(driver =>
                    driver.title.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setDrivers(state, drivers) {
            state.drivers = drivers;
        },
        addDriver(state, driver) {
            state.drivers.push(drivers);
        },
        removeDriver(state, driver) {
            const index = state.drivers.indexOf(driver);
            state.drivers.splice(index, 1);
        },
        updateDriver(state, driver) {
            const index = state.drivers.findIndex(b => b._id == driver._id);
            Vue.set(state.drivers, index, driver);
        },
        sortDrivers(state, field) {
            state.drivers.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormDriver(state) {
            Object.assign(state.formDriver, {
                name: "",
                mark: "",
                number: "",
                year: 0
            });
        },
        setFormDriver(state, driver) {
            state.formDriver = driver;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getDrivers(context) {
            try {
                let resp = await axios.get("http://localhost:5000/driver");
                context.commit("setDrivers", resp.data);
                await context.dispatch("showMessageForTime", { message: "Водіїв завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getDriverById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/driver/${id}`);
                await context.dispatch("showMessageForTime", { message: "Водіїв завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getDriversByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/driver", { params: query });
                context.commit("setDrivers", resp.data);
                await context.dispatch("showMessageForTime", { message: "Водіїв завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postDriver(context, driver) {
            try {
                let resp = await axios.post("http://localhost:5000/driver", driver);
                context.commit("addDriver", resp.data);
                await context.dispatch("showMessageForTime", { message: "Водіїв додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deleteDriver(context, driver) {
            try {
                let resp = await axios.delete(`http://localhost:5000/driver/${driver._id}`);
                context.commit("removeDriver", resp.data);
                await context.dispatch("showMessageForTime", { message: "Водіїв вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchDriver(context, driver) {
            try {
                let resp = await axios.patch(`http://localhost:5000/driver/${driver._id}`, driver);
                context.commit("updateDriver", resp.data);
                await context.dispatch("showMessageForTime", { message: "Водіїв оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, driver) {
            driver = await context.dispatch("getDriverById", driver._id);
            context.commit("setFormDriver", driver);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormDriver");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;