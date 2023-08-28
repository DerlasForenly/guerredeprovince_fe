import { connect } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import convert from 'image-file-resize';
import { getImageSize } from 'react-image-size';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import { useSnackbar, withSnackbar } from 'notistack';

import picturePlaceholder from '../assets/picture-placeholder.jpg';
import Title from '../components/baseComponents/Title';
import { setLoading } from '../redux/app/actions';


const CreateNewspaperPage = ({ loading, setLoading }) => {
  const { enqueueSnackbar } = useSnackbar();
  const nameInput = useRef();
  const descriptionInput = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [croppedFile, setCroppedFile] = useState();
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
    setError('');

    const formData = new FormData();
    formData.append('name', nameInput.current.value);
    formData.append('description', descriptionInput.current.value);
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
      enqueueSnackbar('Newspaper has been created!')
      setLoading(false);
      setCroppedFile(undefined);
      setPreview(undefined);
      setSelectedFile(undefined);

      navigate(`/newspaper/${response.data.newspaper_id}`);
    }).catch((error) => {
      setError(error.response.data.message);
      setLoading(false);
    });
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, width: '100%' }}>
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
                  inputRef={nameInput}
                  required
                  label={'Name'}
                  name={'name'}
                  placeholder={'Name'}
                  max={80}
                  sx={{ width: '100%' }}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: '30%' }}
                  type="button"
                >
                  Upload File*
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
                inputRef={descriptionInput}
                label="Description"
                multiline
                minRows={6}
                placeholder={'Description'}
                max={300}
                name={'description'}
              />
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                {
                  error ?
                    <Typography variant={'body1'} component={'h2'} color={'red'}>
                      {error}
                    </Typography> :
                    <Typography variant={'body1'} component={'h2'}>
                      It is free now, but it is going to be 50G later ;)
                    </Typography>
                }
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

const mapDispatchToProps = {
  setLoading,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.app.loading,
  };
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(CreateNewspaperPage));
