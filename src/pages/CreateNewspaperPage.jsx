import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import convert from 'image-file-resize';
import { getImageSize } from 'react-image-size';

import picturePlaceholder from '../assets/picture-placeholder.jpg';
import InputText from '../components/baseComponents/InputText';
import InputTextarea from '../components/baseComponents/InputTextarea';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Title from '../components/baseComponents/Title';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

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

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: 700 }}>
        <form onSubmit={submitHandler}>
          <Stack spacing={2}>
            <Title>Create Newspaper:</Title>
            <Stack direction={'row'} spacing={2} sx={{ width: '100%' }}>
              <Avatar
                variant={'square'}
                src={selectedFile ? preview : picturePlaceholder}
                alt={'newspaper-avatar'}
                sx={{ width: 128, height: 128 }}
              />
              <Stack spacing={2} sx={{ width: '100%' }}>
                <TextField
                  required
                  label={'Name'}
                  name={'name'}
                  placeholder={'Name'}
                  max={80}
                  sx={{ width: '100%' }}
                  onChange={changeInputHandler}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: '30%' }}
                >
                  Upload File
                  <input
                    required
                    type="file"
                    className="file-input"
                    accept=".png, .jpg"
                    multiple={false}
                    onChange={onChangeFileInput}
                    hidden
                  />
                </Button>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <TextField
                required
                label="Description"
                multiline
                minRows={6}
                placeholder={'Description'}
                onChange={changeInputHandler}
                max={300}
                name={'description'}
              />
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant={'body1'} component={'h2'}>
                  It is free now, but it is going to be 50G later ;)
                </Typography>
                <Button
                  type={'submit'}
                  size={'large'}
                  variant={'contained'}
                  disabled={loading}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default connect(null, null)(CreateNewspaperPage);
