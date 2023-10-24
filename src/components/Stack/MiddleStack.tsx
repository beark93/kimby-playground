import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const StyledStack = styled(Stack)<StackProps>(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

const MiddleStack = (props: StackProps) => {
  return <StyledStack {...props} />;
};

export default MiddleStack;
