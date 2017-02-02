import './UploadPhotoBlock.less';

function handleImageUpload(event, nodeId, uploadPhotoCallback) {
  let reader = new FileReader();
  let file = event.target.files[0];

  reader.onloadend = () => {
    const file = file;
    const imagePreviewUrl = reader.result;
    uploadPhotoCallback(nodeId, {img: imagePreviewUrl});
  };

  reader.readAsDataURL(file);
}

const UploadPhotoBlock = (props) => {
  return props.show ?
    <div className="upload-photo-block">
      <input type="file" onChange={(event) => handleImageUpload(event, props.nodeId, props.editNode)}/>
    </div> : null;
};

UploadPhotoBlock.propTypes = {
  show: React.PropTypes.bool,
  nodeId: React.PropTypes.number,
  editNode: React.PropTypes.func,
};

export default UploadPhotoBlock;