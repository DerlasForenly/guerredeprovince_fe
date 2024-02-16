import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Title from '../components/baseComponents/Title';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'js-cookie';
import picturePlaceholder from '../assets/picture-placeholder.jpg';
import Avatar from '@mui/material/Avatar';
import { getImageSize } from 'react-image-size';
import convert from 'image-file-resize';

const CreatePartyPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [croppedFile, setCroppedFile] = useState();
  const [error, setError] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const nameInput = useRef();
  const descriptionInput = useRef();
  const tagInput = useRef();

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

  const onSubmitHandler = e => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', nameInput.current.value);
    formData.append('tag', tagInput.current.value);
    formData.append('description', descriptionInput.current.value);
    formData.append('avatar', croppedFile);

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/parties`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
    }).then((response) => {
      enqueueSnackbar('New party has been founded!')
      setLoading(false);
      setCroppedFile(undefined);
      setPreview(undefined);
      setSelectedFile(undefined);

      /**
       * @todo update navigate
       */
      navigate(`/party/${response.data.party.id}`);
    }).catch((error) => {
      setError(error.response.data.message);
      setLoading(false);
    });
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <form onSubmit={onSubmitHandler}>
          <Paper sx={{ p: 2, width: '100%' }}>
            <Stack spacing={2}>
              <Title>Create party</Title>
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
                  <TextField
                    inputRef={tagInput}
                    required
                    label={'Tag'}
                    name={'tag'}
                    placeholder={'Tag'}
                    max={5}
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
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography component={'h2'} variant={'body1'}>{error}</Typography>
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
          </Paper>
        </form>
      </Stack>
    </Container>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePartyPage);