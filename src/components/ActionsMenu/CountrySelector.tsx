import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Countries } from 'store/country/types';

export type SelectionAction = 'HOVER-IN' | 'HOVER-OUT' | 'SELECTION-IN' | 'SELECTION-OUT';

interface CountrySelectorProps {
  label: string;
  selected: string | null;
  selectables: Countries[];
  onAction: ((country: string, action: string) => (event: any) => void);
  onFocus: (() => void);
}

const CountrySelector: React.SFC<CountrySelectorProps> = (props: CountrySelectorProps) =>  {
  const { label, onAction, onFocus, selectables, selected } = props;

  const handleChange = (event: any, index: number, value: string) => {
    if (selected && selected !== value) {
      onAction(selected, 'SELECTION-OUT')(event);  
    }
    onAction(value, 'SELECTION-IN')(event);
  };

  const list = selectables.length === 0 ? 
    (selected === null ? [] : [selected]) : selectables;

  const items = list.map((country: Countries) => (
    <MenuItem 
      key={`${label}-${country}`}
      onMouseEnter={onAction(country, 'HOVER-IN')}  
      onMouseLeave={onAction(country, 'HOVER-OUT')}
      value={country}  
      primaryText={country} 
    />
  ));

  return (
    <div onClick={onFocus} style={{marginTop: -10}} >
      <SelectField
        floatingLabelText={label}
        value={selected}
        style={{width: 200}}
        onChange={handleChange}
        maxHeight={300}
        disabled={list.length === 0}
      >
        {items}
      </SelectField>
    </div>
  );
};

export default CountrySelector;