import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function ToyList({ toys, onRemoveToy }) {
    console.log('Rendering List')
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>

                        <button >
                            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                        </button>
                    </div>
                </li>)}
        </ul>
    )
}

ToyList.propTypes = {
    toys: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemoveToy: PropTypes.func,
}

// ToyList.propTypes = {
//     Toys(props, propName, cmpName) {
//         if(!Array.isArray(props[propName])) {
//             throw new Error('Bad prop type for Toys')
//         }
//     }
// }