import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { toyServiceRe } from '../services/toy.service.remote.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy, setSort } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    console.log(toys)
    useEffect(() => {
        console.log(toys);
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')

            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }
    function onSetSort(sortBy) {
        setSort(sortBy)
    }

    function onRemoveToy(ToyId) {
        removeToyOptimistic(ToyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove Toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add Toy')
            })
    }



    return (
        <div>

            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter}
                    sortBy={sortBy}
                    onSetSort={onSetSort} />
                {!isLoading && toys.length > 0
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}

                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}