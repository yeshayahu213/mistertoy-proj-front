import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams } from "react-router-dom"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h5>Price: ${toy.price}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            <p>
                <Link to="/toy/nJ5L4">Next toy</Link>
            </p>
        </section>
    )
}