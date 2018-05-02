import * as React from 'react';
import Slider from 'material-ui/Slider';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import PlusFive from 'material-ui/svg-icons/av/forward-5';
import PlusOne from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import MinusFive from 'material-ui/svg-icons/av/replay-5';
import MinusOne from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { scale, scaleObj } from 'utils/screenScale';

interface MuiThemeProps {
  muiTheme?: any;
}

interface QuantitySelectorProps extends MuiThemeProps {
  value: number;
  max: number;
  onChange: ((value: number) => void);
}

const QuantitySelector: React.SFC<QuantitySelectorProps> = (props: QuantitySelectorProps) => {
  const { onChange, max, value } = props;

  const iconSize = scaleObj({
    width: 48,
    height: 48
  });
  const iconContainer = scaleObj({
    width: 60,
    height: 60,
    padding: 6,
  });
  const minWidth = scale(85);
  const fontSize = scale(25);
  const color = props.muiTheme && props.muiTheme.palette.primary1Color || '#FFFFFF';
  
  const step = Math.trunc(max / 10) > 0 ? Math.trunc(max / 10) : 1;

  const boundaries = (newValue: number) => (
    (newValue < 0 ? 0 : newValue > max ? max : newValue)
  );
  const onChangeValue = (event: any, newValue: number) => {
    if (max !== 0) {
      onChange(newValue);
    }
  };
  const onClick = (newValue: number) => (event: any) => {
    if (max !== 0) {
      onChange(boundaries(props.value + newValue));
    }
  };
  return (
    <div>
      <Slider
        style={{marginLeft: 15, marginRight: 15}}
        sliderStyle={{margin: 0}}
        min={0}
        max={max === 0 ? 1 : max}
        step={step}
        value={value}
        disabled={max === 0}
        onChange={onChangeValue}
      />
      <div style={{display: 'flex', alignItems: 'center'}}>
        <IconButton iconStyle={iconSize} style={iconContainer} tooltip="Remove 5" onClick={onClick(-5)}>
          <MinusFive />
        </IconButton>
        <IconButton iconStyle={iconSize} style={iconContainer} tooltip="Remove 1" onClick={onClick(-1)}>
          <MinusOne />
        </IconButton>
        <div style={{display: 'inline-block', fontSize, textAlign: 'center', minWidth}}>
          <sup>{value}</sup>/<sub style={{color, fontSize: '100%', fontWeight: 500}}>{max}</sub>
        </div>
        <IconButton iconStyle={iconSize} style={iconContainer} tooltip="Add 1" onClick={onClick(1)}>
          <PlusOne />
        </IconButton>
        <IconButton iconStyle={iconSize} style={iconContainer} tooltip="Add 5" onClick={onClick(5)}>
          <PlusFive />
        </IconButton>
      </div>
    </div>
  );
};

export default muiThemeable()(QuantitySelector);