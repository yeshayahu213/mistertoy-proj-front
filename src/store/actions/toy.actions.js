import { toyService } from "../../services/toy.service.js";
import { toyServiceRe } from "../../services/toy.service.remote.js";
import { showSuccessMsg } from "../../services/event-bus.service.js";
import {
    ADD_TOY, TOY_UNDO, REMOVE_TOY,
    SET_TOYS, SET_FILTER_BY,
    SET_IS_LOADING, UPDATE_TOY, SET_SORT_BY
} from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy
    console.log(filterBy, sortBy);
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyServiceRe.query(filterBy, sortBy)
        .then(toys => {
            console.log(toys);
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('TOY action -> Cannot load TOYs', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyServiceRe.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('TOY action -> Cannot remove TOY', err)
            throw err
        })
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyServiceRe.remove(toyId)
        .then(() => {
            showSuccessMsg('Removed TOY!')
        })
        .catch(err => {
            store.dispatch({ type: TOY_UNDO })
            console.log('TOY action -> Cannot remove TOY', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyServiceRe.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}
export function setSort(sortBy = toyServiceRe.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}