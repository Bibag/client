import { FC } from 'react';
import style from './style.module.scss';

interface UpdateFormProps {
  email: string;
  name?: string;
  setName?: (name: string) => void;
  onSubmit?: () => void;
  loading?: boolean;
  onClear?: () => void;
}

const UpdateForm: FC<UpdateFormProps> = ({ email, name, setName, onSubmit, loading, onClear }) => {
  return (
    <div className={style['form-wrapper']}>
      <div className={style['form']}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control is-expanded">
            <input type="text" className="input is-info" value={email} disabled />
          </div>
        </div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control is-expanded">
            <input
              type="text"
              className="input is-info"
              value={name}
              onChange={(event) => setName && setName(event.target.value)}
            />
          </div>
        </div>
        <div className="field is-grouped mt-5">
          <div className="control">
            <button className={`button is-info is-rounded ${loading && 'is-loading'}`} onClick={onSubmit}>
              Update
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light is-rounded" onClick={onClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
