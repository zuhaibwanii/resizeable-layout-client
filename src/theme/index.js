const white = '#FFFFFF';
const black = '#000000';
const red = '#e50914'
const gray = '#6e6e6e'
const green = 'rgb(3 133 1)'


const colors = {
  black,
  red,
  white,
  gray,
  green
}

const palette = {
  colors,
  bgThemeColor: colors.white,
  errorColor: colors.red,
  successColor: colors.green,
  text: {
    primary: colors.black,
    secondary: colors.white,
    link: colors.black
  },
  btnPrimary: {
    background: colors.red,
    color: colors.white,
    border: `2px solid ${colors.red}`,
    borderColor: colors.red
  },
  btnSecondary: {
    background: colors.white,
    color: colors.black,
    border: `2px solid ${colors.black}`,
    borderColor: colors.black
  },
  btnDisabled: {
    background: colors.gray,
    color: colors.black,
    border: `2px solid ${colors.gray}`,
    borderColor: colors.gray

  },
  icon: colors.black,
  divider: colors.black
};

export default palette
