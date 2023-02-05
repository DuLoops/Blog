import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'



const HoldingNumberInput = (props) => {

  const handleHoldingTimeChange = (value, index) => {
    props.setSetting((prev) => ({
      ...prev,
      holdingTime: prev.holdingTime.map((time, i) =>
        i === index ? +value : time
      ),
    }));
  
  };

  const format = (val) => val + " s";
  const parse = (val) => val.replace(" s", "");
  return (
    <NumberInput
      onChange={(value) => {
        handleHoldingTimeChange(value, props.index);
      }}
      size="xs"
      w="80px"
      value={props.defaultVal}
      min={10}
      max={300}
      step={15}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default HoldingNumberInput;