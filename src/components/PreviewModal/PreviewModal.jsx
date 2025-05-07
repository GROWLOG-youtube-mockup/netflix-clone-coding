import '../../styles/PreviewModal.css';

import React from 'react';

function PreviewModal({ selectedMovie, setModalOpen }) {
  console.log(selectedMovie, setModalOpen);

  return (
    <div className="preview-layout">
      <div className="preview-title-wrapper">
        <div className="preview-title-background">
          <img src="" alt="" />
        </div>
        <div className="button-layout">
          <button type="button">PLAY</button>
          <button type="button">HAS</button>
          <button type="button">LIKE</button>
        </div>
      </div>

      <div className="preview-detail-container">
        <div className="meta-data">
          <span>detail</span>
        </div>
        <div>
          <span>detail</span>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
