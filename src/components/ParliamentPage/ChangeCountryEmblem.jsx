import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Title from '../../components/baseComponents/Title';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getImageSize } from 'react-image-size';
import convert from 'image-file-resize';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';
import Avatar from '@mui/material/Avatar';
import picturePlaceholder from '../../assets/picture-placeholder.jpg';
import axios from 'axios';
import Cookies from 'js-cookie';

const ChangeCountryEmblem = ({ user, lawTypeId }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [croppedFile, setCroppedFile] = useState();
  const { id } = useParams();

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

  const onSubmitHandler = event => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('emblem', croppedFile);
    formData.append('type_id', lawTypeId)

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/laws`,
      headers: {
        Authorization: `Bearer` + Cookies.get('access_token'),
        'Content-Type': 'multipart/form-data'
      },
      data: formData,
    }).then((response) => {
      enqueueSnackbar('Law has been created!')
      setLoading(false);
      setCroppedFile(undefined);
      setPreview(undefined);
      setSelectedFile(undefined);

      navigate(`/country/${id}/parliament`);
    }).catch((error) => {
      setError(error.response.data.message);
      setLoading(false);
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Paper sx={{ p: 2, width: '100%' }}>
        <Title>Change country emblem</Title>
        <Stack spacing={2}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Avatar
              variant={'square'}
              src={selectedFile ? preview : picturePlaceholder}
              alt={'country-avatar'}
              sx={{ width: 256, height: 256 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ width: 'fit-content' }}
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
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant={'body1'} component={'h2'} color={'red'}>
              {error}
            </Typography>
            <Button variant={'contained'} disabled={loading}>Create</Button>
          </Stack>
        </Stack>
      </Paper>
    </form>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    country: state.country.country.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCountryEmblem);