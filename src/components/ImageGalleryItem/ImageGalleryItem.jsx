function ImageGalleryItem({ photos, onClick }) {
  return photos.map(el => (
    <li className="gallery-item" key={el.id}>
      <img
        className="imageGalleryItem"
        src={el.webformatURL}
        alt={el.tags}
        onClick={() => onClick(el.largeImageURL)}
      />
    </li>
  ));
}

export default ImageGalleryItem;
