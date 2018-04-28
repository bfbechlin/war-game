import * as React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { countries } from 'store/country/types';

interface CountrySelectorProps {
  label: string;
  selected: string | null;
  onSelect: ((country: string) => void);
  onUnSelect: (() => void);
}

interface CountrySelectorState {
  searchText: string;
}

class ContrySelector extends React.Component<CountrySelectorProps, CountrySelectorState> {
  static getDerivedStateFromProps(nextProps: CountrySelectorProps, prevState: CountrySelectorState) {
    if (nextProps.selected !== null) {
      return {searchText: nextProps.selected};
    }
    return null;
  }
  
  constructor(props: CountrySelectorProps) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  onUpdateInput = (searchText: string, dataSource: any[]) => {
    if (this.props.selected !== null) {
      this.props.onUnSelect();
    }
    this.setState({searchText});
  }

  onNewRequest = (searchResult: string) => {
    if (countries.indexOf(searchResult) > -1) {
      this.props.onSelect(searchResult);
    }
  }

  render() {
    const { label } = this.props;
    const { searchText } = this.state;
    return (
      <AutoComplete
        style={{marginTop: 0}}
        floatingLabelText={label}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={countries}
        searchText={searchText}
        onUpdateInput={this.onUpdateInput}
        onNewRequest={this.onNewRequest}
        maxSearchResults={5}
      />
    );  
  }
}

export default ContrySelector;