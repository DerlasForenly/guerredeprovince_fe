import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getImageSize } from 'react-image-size';
import convert from 'image-file-resize';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  setPreviewAvatarFile,
  setSelectedAvatarFile
} from '../../redux/user/actions';

function UpdateAvatar ({ user, selectedFile, previewFile, setPreviewAvatarFile, setSelectedAvatarFile }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const onChangeFileInput = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedAvatarFile(undefined);
      return;
    }

    setSelectedAvatarFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewAvatarFile(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    let img = new Image();
    img.src = objectUrl;

    getImageSize(img.src).then(({ width, height }) => {
      convert({
        file: selectedFile,
        width: 1028,
        height: 1028,
        type: selectedFile.type.slice(6, selectedFile.type.length)
      }).then(response => {
        setPreviewAvatarFile(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch((errorMessage) => {});

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, setPreviewAvatarFile]);

  const onReset = e => {
    setPreviewAvatarFile(null);
  }

  const submitHandler = event => {
    event.preventDefault();

    if (previewFile === null || previewFile === undefined) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('avatar', previewFile);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/users/${user.id}`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
    }).then((response) => {
      setLoading(false);
      setSelectedAvatarFile(null);
      setPreviewAvatarFile(null);
      event.target.reset();
    }).catch((error) => {
      setLoading(false);
    });
  };

  return <form className="col" onSubmit={submitHandler}>
    <input
      type="file"
      accept=".png, .jpg, .jpeg"
      className="input-avatar"
      multiple={false}
      onChange={onChangeFileInput}
    />
    <div className="update-clear row">
      <button
        className="update-avatar-button"
        type="submit"
        disabled={!previewFile}
      >
        Update
      </button>
      <button className="update-avatar-button" type="reset" onClick={onReset}>Clear</button>
    </div>
  </form>
}


const mapDispatchToProps = {
  setPreviewAvatarFile,
  setSelectedAvatarFile,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    selectedFile: state.user.avatarForm.selectedFile,
    previewFile: state.user.avatarForm.previewFile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAvatar);