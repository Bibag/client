import { FC, useState } from 'react';
import style from './style.module.scss';
import UploadAvatar from './avatar/UploadAvatar';
import UpdateForm from './form/UpdateForm';
import WithAuth from '../with-auth';
import { upload } from '@/services/fetch';
import { IResponseUploadAvatar } from '@/state';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';

const Profile: FC = () => {
  const { loading, data } = useTypedSelector((state) => state.user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState<string>(data?.name);
  const [uploading, setUploading] = useState<boolean>(false);

  const { updateUserProfileRequest } = useActions();

  const handleSubmit = async () => {
    setUploading(true);
    let newAvatar = data?.avatar;
    if (avatarFile) {
      const response = await upload<IResponseUploadAvatar>('/api/upload/single', { image: avatarFile });

      if (response?.data) {
        newAvatar = response.data.path;
      }
    }
    setUploading(false);

    updateUserProfileRequest({ email: data?.email, avatar: newAvatar, name });
  };

  const handleClear = () => {
    setName('');
    setAvatarFile(null);
  };

  return (
    <div className="container">
      <div className={style['profile']}>
        <div className="is-size-1 has-text-centered mb-6">Profile</div>
        <UploadAvatar avatar={data?.avatar} avatarFile={avatarFile} setAvatarFile={setAvatarFile} />
        <UpdateForm
          email={data?.email}
          name={name}
          setName={setName}
          onSubmit={handleSubmit}
          loading={loading || uploading}
          onClear={handleClear}
        />
      </div>
    </div>
  );
};

export default WithAuth(Profile);
