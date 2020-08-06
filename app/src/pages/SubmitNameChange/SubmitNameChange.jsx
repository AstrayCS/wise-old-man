import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageTitle from '../../components/PageTitle';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import submitNameChangeAction from '../../redux/modules/names/actions/submit';
import { isSubmitting } from '../../redux/selectors/names';
import './SubmitNameChange.scss';

function SubmitNameChange() {
  const urlName = useParams().oldName;
  const router = useHistory();
  const dispatch = useDispatch();

  const isLoading = useSelector(isSubmitting);

  const [oldName, setOldName] = useState(urlName || '');
  const [newName, setNewName] = useState('');

  const handleOldNameChanged = e => {
    setOldName(e.target.value);
  };

  const handleNewNameChanged = e => {
    setNewName(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = { oldName, newName };

    dispatch(submitNameChangeAction(formData)).then(a => {
      if (a && a.nameChange) {
        router.push(`/names`);
      }
    });
  };

  return (
    <div className="submit-name-change__container container">
      <Helmet>
        <title>Submit name change</title>
      </Helmet>
      <div className="col">
        <PageTitle title="Submit name change" />
        <div className="form-row">
          <span className="form-row__label">Old name</span>
          <TextInput placeholder="Ex: Zezima" onChange={handleOldNameChanged} value={oldName} />
        </div>
        <div className="form-row">
          <span className="form-row__label">New name</span>
          <TextInput placeholder="Ex: Lynx Titan" onChange={handleNewNameChanged} value={newName} />
        </div>
        <div className="form-row form-actions">
          <Button text="Confirm" onClick={handleSubmit} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default SubmitNameChange;
