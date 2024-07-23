import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyServiceRe = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getToyLabels,
    getToyLabelCounts,
}

function query(filterBy = {}, sortBy) {
    console.log(sortBy);
    return httpService.get(BASE_URL, { filterBy, sortBy })
    // if (!filterBy.txt) filterBy.txt = ''
    // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    // const regExp = new RegExp(filterBy.txt, 'i')
    // return storageService.query(STORAGE_KEY)
    //     .then(toys => {
    //         return toys.filter(toy =>
    //             regExp.test(toy.) &&
    //             toy.price <= filterBy.maxPrice
    //         )
    //     })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}





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

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: _getRandomLabels(),
    }
}


function getToyLabels() {
    return httpService.get(BASE_URL + 'labels')
}


function getToyLabelCounts() {
    return httpService.get(BASE_URL + 'labels/count')
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}
