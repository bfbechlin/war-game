import * as React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { countries } from 'store/country/types';

interface ContrySelectorProps {
  label: string;
}

const ContrySelector: React.SFC<ContrySelectorProps> = (props) => {
  const { label } = props;

  return (
    <AutoComplete
      floatingLabelText={label}
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={countries}
    />
  );
};

export default ContrySelector;