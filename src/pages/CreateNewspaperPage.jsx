import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import convert from 'image-file-resize';
import { getImageSize } from 'react-image-size';

import picturePlaceholder from '../assets/picture-placeholder.jpg';
import InputText from '../components/baseComponents/InputText';
import InputTextarea from '../components/baseComponents/InputTextarea';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import Avatar from '../components/baseComponents/Avatar';

const CreateNewspaperPage = () => {
  const [state, setState] = useState({
    name: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [croppedFile, setCroppedFile] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeInputHandler = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onChangeFileInput = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
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
      }).then(resp => {
        setPreview(URL.createObjectURL(resp));
        setCroppedFile(resp);
      }).catch(error => {
        console.log(error);
      });
    }).catch((errorMessage) => {});

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const submitHandler = event => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('description', state.description);
    formData.append('avatar', croppedFile);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/newspapers/`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
    }).then((response) => {
      setLoading(false);
      setState({
        name: '',
        description: '',
      });
      setCroppedFile(undefined);
      setPreview(undefined);
      setSelectedFile(undefined);
      event.target.reset();

      navigate(`/newspaper/${response.data.newspaper_id}`);
    }).catch((error) => {
      setLoading(false);
    });
  };

  return <div className="page">
    <form className="create-newspaper-container col" onSubmit={submitHandler}>
      <div className="row">
        <Avatar
          src={selectedFile ? preview : picturePlaceholder}
          alt="avatar-placeholder"
          className={'avatar-huge'}
          mr={20}
          mb={20}
        />
        <div className="avatar-name col">
          <InputText
            changeInputHandler={changeInputHandler}
            max={50}
            label="Name"
            name="name"
            className={"name-input"}
          />
          <input
            type="file"
            className="file-input"
            accept=".png, .jpg"
            multiple={false}
            onChange={onChangeFileInput}
          />
        </div>
      </div>
      <InputTextarea
        changeInputHandler={changeInputHandler}
        max={500}
        label="Description"
        name="description"
        className="description-input"
      />
      <div className="settings row">
        <label className={"small-content-p"}>It is free now, but it is going to be 50G later ;)</label>
        <button
          type="submit"
          disabled={loading}
          className={"medium-gray-button"}
        >
          Create
        </button>
      </div>
    </form>
  </div>;
};

export default connect(null, null)(CreateNewspaperPage);

function BackAndHelp () {
  return <div className="back-more row">
    <Link to="/news">
      <button className="back-button">Back</button>
    </Link>
    <Link to="/news">
      <button className="back-button">Help</button>
    </Link>
  </div>;
}

