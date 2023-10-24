import Grid, { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const StyledGrid = styled(Grid)<GridProps>(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

const MiddleGrid = (props: GridProps) => {
  return <StyledGrid {...props} />;
};

export default MiddleGrid;
