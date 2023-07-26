import { ChangeEvent, FC, useRef } from 'react';
import style from './style.module.scss';

interface UploadAvatarProps {
  avatar?: string;
  avatarFile?: File | null;
  setAvatarFile?: (avatar: File | null) => void;
}

const UploadAvatar: FC<UploadAvatarProps> = ({ avatar, avatarFile, setAvatarFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickChangeFile = () => {
    if (inputRef?.current) {
      inputRef.current?.click();
    }
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files[0]) {
      setAvatarFile && setAvatarFile(files ? files[0] : null);
    }
  };

  return (
    <>
      <figure className={style['avatar-wrapper']}>
        <img
          onClick={onClickChangeFile}
          className={style['avatar']}
          src={
            avatarFile ? URL.createObjectURL(avatarFile) : avatar || 'https://bulma.io/images/placeholders/128x128.png'
          }
          alt=""
        />
      </figure>
      <input type="file" accept=".png, .jpeg, .jpg" hidden ref={inputRef} onChange={onChangeFile} />
    </>
  );
};

export default UploadAvatar;
