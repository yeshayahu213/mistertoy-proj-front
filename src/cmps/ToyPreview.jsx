import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>name: <span>{toy.name && toy.name}</span></p>
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
            <h1 className={toy.inStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </h1>
        </article>
    )
}
{/* <Link to={`/toy/${toy._id}`}>
<article className="toy-preview">
  <h1 className="toy-name">{toy.name}</h1>
  {isImgLoading && <div className="skeleton-loader"></div>}
  <div className="img-container">
    <img
      src={`https://robohash.org/${toy.name}?set=set4`}
      alt={toy.name}
      onLoad={handleImageLoad}
      style={{ display: isImgLoading ? 'none' : 'block' }}
    />
  </div>
  <h1>Price: ${toy.price}</h1>
  <h1 className={toy.inStock ? 'green' : 'red'}>
    {toy.inStock ? 'In stock' : 'Not in stock'}
  </h1>
</article>
</Link> */}