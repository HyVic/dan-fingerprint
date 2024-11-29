import { defineStore, acceptHMRUpdate } from "pinia";

export const useStore = defineStore({
    id: "index",
    state: () => ({
        currentSpeciesName: '',// 当前物种名称
        currentSpeciesId: 0,// 当前物种 ID
        speciesList: [{ id: 0, species_name: 'aa' }],// 物种列表
        userName: ''
    }),
    getters: {
        myName: (state) => {
            return `getters ${state.name}`
        }
    },
    actions: {
        setCurrentVariety(value: number) {
            this.currentSpeciesId = value
        },
        logout() {
            this.userName = ''
            this.currentSpeciesId = 0
            this.speciesList = [{ id: 0, species_name: '' }]
        }
    },
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        key: "storekey", // 修改为 sessionStorage，默认为 localStorage
        storage: window.sessionStorage
    },
});

/* if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
} */