
import React from 'react'
export const GalleryCard = ({ title, photograph }) => {
  return (
<div className="container gallery-container">
<h1 style={{ textAlign: 'center' }}>My Gallery</h1>
  <div className="tz-gallery">
    <div className="row">
      <div className="col-sm-12 col-md-4">
  <p className="page-description text-center">{title}</p>
        <a className="lightbox" href={photograph}>
          <img src={photograph} alt={photograph} />
        </a>
      </div>
    </div>
  </div>
</div>

  )
}

