import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface PillButtonProps extends ButtonProps {
  selected?: boolean;
  children?: React.ReactNode;
}

const PillButtonRoot = styled((props: PillButtonProps) => {
  const { selected, ...rest } = props;
  return <Button {...rest} />;
})<PillButtonProps>(({ selected }: PillButtonProps) => ({
  margin: '0 8px',
  padding: '8px 16px',
  borderRadius: '10px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  letterSpacing: '0.3px',
  backgroundColor: selected ? '#4CAF50' : '#6B7280',
  color: '#ffffff',
  border: 'none',
  boxShadow: selected
    ? '0 8px 20px rgba(76, 175, 80, 0.35), 0 4px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
    : '0 4px 10px rgba(0, 0, 0, 0.25)',
  transform: selected ? 'translateY(-2px)' : 'translateY(0px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: selected 
      ? 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)'
      : 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
    opacity: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: selected 
      ? 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)'
      : 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 100%)',
    opacity: 1,
  },
  '&:hover': {
    backgroundColor: selected ? '#45A049' : '#5B6470',
    transform: selected ? 'translateY(-3px)' : 'translateY(-1px)',
    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.35), 0 12px 28px rgba(76, 175, 80, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  '&:active': {
    transform: selected ? 'translateY(-1px)' : 'translateY(0px)',
    boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.3), 0 6px 16px rgba(76, 175, 80, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
  },
}));

const PillButton: React.FC<PillButtonProps> = (props) => {
  return <PillButtonRoot {...props} />;
};

export default PillButton;

