import { observable, action, makeObservable, runInAction } from 'mobx'
import axios from 'axios'

export class RestaurantStore {
    constructor() {
        this.getRestaurants()
        this.restaurants = []
        makeObservable(this, {
            restaurants: observable,
            getRestaurants: action,
            updateRestaurant: action,
            deleteRestaurant: action,
            addRestaurant: action
        })
    }

    getRestaurants = async () => {
        try {
            this.restaurants = []
            let restaurants = await axios.get('/restaurants')
            runInAction(() => {
                restaurants.data.map(restaurant =>
                    this.restaurants.push(restaurant)
                )
            })
        } catch (error) {
            console.log(error.toString())
        }
    }

    async updateRestaurant(id, name, type, phone, location) {
        try {
            await axios.put("/restaurant", { id, name, type, phone, location })
            runInAction(() => {
                const i = this.restaurants.findIndex(r => r.id === id)
                this.restaurants[i] = { id, name, type, phone, location }
            })
        } catch (error) {
            console.log(error.toString())
        }
    }

    async deleteRestaurant(id) {
        try {
            await axios.delete(`/restaurant/${id}`)
            runInAction(() => {
                const i = this.restaurants.findIndex(r => r.id === id)
                this.restaurants.splice(i, 1)
            })
        } catch (error) {
            console.log(error.toString())
        }
    }

    async addRestaurant(name, type, phone, location) {
        try {
            const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
            await axios.post("/restaurant", { name, type, phone, location })
            runInAction(() => {
                this.restaurants.push({ id, name, type, phone, location })
            })
        } catch (error) {
            console.log(error.toString())
        }
    }
}