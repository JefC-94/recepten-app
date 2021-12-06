import { base } from './base'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
  }
}

export const Button = {
  defaultProps: {
    disableRipple: true,
  },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        padding: '10px 12px',
        background: `${base.primary}`,
        fontWeight: 'bold',
        color: `${base.light}`,
        '&:hover': {
          background: `${base.secondary}`,
        },
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        padding: '10px 12px',
        background: `${base.secondary}`,
        border: `1px solid ${base.border}`,
        fontWeight: 'bold',
        color: `${base.light}`,
        '&:hover': {
          background: `${base.primary}`,
        },
      },
    },
  ],
}
