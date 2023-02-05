import { Text, Heading } from "@chakra-ui/react";
import styled from "styled-components";

const InstructionHeading = styled(Heading)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Instruction = (props) => {
  switch (props.sequence) {
    case "ready":
      return <InstructionHeading>Set #{props.set}</InstructionHeading>;
    case "breath":
      return (
        <InstructionHeading>
          Breath in
          <br />&<br />
          Let go
        </InstructionHeading>
      );
    case "exhale":
    case "inhale":
      return (
        <InstructionHeading>
          {props.sequence.charAt(0).toUpperCase() + props.sequence.slice(1)}
        </InstructionHeading>
      );
    case "exhaleLast":
      return <InstructionHeading>Exhale</InstructionHeading>;
    case "hold":
    case "inhaleHold":
      return <InstructionHeading>Hold</InstructionHeading>;
    default:
      return <InstructionHeading>Paused</InstructionHeading>;
  }
};

export default Instruction;
