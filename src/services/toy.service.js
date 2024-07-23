
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'ToyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getDefaultSort
}

function query(filterBy = {}, sortBy = {}) {
    console.log(sortBy)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            let filteredToys = toys.filter(toy =>
                toy.price <= filterBy.maxPrice
            )
            if (sortBy.type) {
                const sortDirection = sortBy.desc ? -1 : 1
                if (sortBy.type === 'name') {
                    filteredToys.sort((t1, t2) => { return t1.name.localeCompare(t2.name) * sortDirection })
                }
                else if (sortBy.type === 'price') {
                    filteredToys.sort((t1, t2) => { return (t1[sortBy.type] - t2[sortBy.type]) * sortDirection })
                }


            }
            return Promise.resolve(filteredToys)
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    console.log(toy);
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line

        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        price: '',
        name: '',
        labels: [],
        createdAt: 1631031801011,
        inStock: true,
    }
}

function getRandomToy() {
    return {
        price: utilService.getRandomIntInclusive(1000, 9000),
        _id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,

    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']


function getDefaultFilter() {
    return {
        txt: '',
        inStock: null,
        labels: [],
        maxPrice: ''
    }
}

function getDefaultSort() {
    return { type: '', desc: false }
}