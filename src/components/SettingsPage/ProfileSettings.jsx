import Title from '../../components/baseComponents/Title';
import { LinearProgress, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { getImageSize } from 'react-image-size';
import convert from 'image-file-resize';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import TextField from '@mui/material/TextField';

function ProfileSettings ({ user }) {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [croppedFile, setCroppedFile] = useState();

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

  const onChangeFileInput = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);

      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const submitHandler = event => {
    event.preventDefault();

    console.log('hello');

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('avatar', croppedFile);

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
      setCroppedFile(undefined);
      setPreview(undefined);
      setSelectedFile(undefined);
      event.target.reset();
    }).catch((error) => {
      setError(error.response.data.message);
      setLoading(false);
    });
  };

  if (!user) {
    return (
      <Paper sx={{ p: 2, width: 500 }}>
        <Stack>
          <Title>Profile</Title>
          <LinearProgress />
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, width: 500 }}>
      <Stack>
        <Title>Profile</Title>
        <form onSubmit={submitHandler}>
          <Stack direction={'row'} spacing={2}>
            <Stack direction={'column'} justifyContent={'space-between'} width={'fit-content'} spacing={2}>
              <Avatar
                variant={'square'}
                src={selectedFile ? preview : `${process.env.REACT_APP_API}/${user.avatar}`}
                alt={'newspaper-avatar'}
                sx={{ width: 156, height: 156 }}
              />
              <Button
                component="label"
                variant={'contained'}
                type="button"
                disabled={loading}
                size={'small'}
                fullWidth
              >
                Upload File*
                <input
                  required
                  disabled={loading}
                  type="file"
                  className="file-input"
                  accept=".png, .jpg"
                  multiple={false}
                  onChange={onChangeFileInput}
                  hidden
                />
              </Button>
              <Button
                size={'small'}
                variant={'contained'}
                component="button"
                disabled={loading || !selectedFile}
                fullWidth
                type="submit"
              >
                Save
              </Button>
            </Stack>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Stack sx={{ width: '100%' }} spacing={1}>
                <TextField
                  type={'text'}
                  label={'Nickname'}
                  variant={'standard'}
                  placeholder={'Nickname'}
                  fullWidth
                  defaultValue={user.nickname}
                />
                <TextField
                  type={'text'}
                  label={'Status'}
                  variant={'standard'}
                  placeholder={'Status'}
                  fullWidth
                />
              </Stack>
              {/*<Stack sx={{ width: '100%' }} spacing={1}>*/}
              {/*  <Title>Security</Title>*/}
              {/*  <TextField*/}
              {/*    type={'password'}*/}
              {/*    label={'Old password'}*/}
              {/*    variant={'standard'}*/}
              {/*    placeholder={'Old password'}*/}
              {/*    fullWidth*/}
              {/*  />*/}
              {/*  <TextField*/}
              {/*    type={'password'}*/}
              {/*    label={'New password'}*/}
              {/*    variant={'standard'}*/}
              {/*    placeholder={'New password'}*/}
              {/*    fullWidth*/}
              {/*  />*/}
              {/*  <TextField*/}
              {/*    type={'password'}*/}
              {/*    label={'Repeat password'}*/}
              {/*    variant={'standard'}*/}
              {/*    placeholder={'Repeat password'}*/}
              {/*    fullWidth*/}
              {/*  />*/}
              {/*</Stack>*/}
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);