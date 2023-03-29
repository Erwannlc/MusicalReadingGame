import { type FC } from "react";
import "./metal-buttons.scss";

export interface MetalButtonsUIData {
  wrapper: {
    className: string
  }
  buttons: Array<{
    value: number | string
    label: string
    labelClassName: string
    tooltip: string
  }>
};

interface Props {
  onChange: (newValue: number | string) => void
  ui: MetalButtonsUIData
};

export const MetalButtons: FC<Props> = ({
  onChange,
  ui
}) => {
  const { wrapper, buttons } = ui;

  const className = "metal-buttons " + wrapper.className;

  return (
    <div className={className}>
      {buttons.map(button => (
        <div
          key={button.label}
          className={`label ${button.labelClassName}`}>
          {button.label}
        </div>
      ))}
      {buttons.map(button => (
         <button
         key={button.value}
         className="metal-button"
         value="Button1"
         onClick={() => {
           onChange(button.value);
         }}
         title={button.tooltip}>
       </button>
      ))}

    </div>
  );
};
