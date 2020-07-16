import { createMuiTheme } from "@material-ui/core/styles";
let theme = createMuiTheme({});

theme = {
    ...theme,
    overrides: {
        MuiTab: {
            root: {
                '@media (min-width: 0)': {
                    minWidth: '125px'
                }
            }
        },
        MuiTabs: {
            scrollButtonsDesktop: {
                '@media (min-width: 0)': {
                    display: "inline-flex"
                }
            }
        },
        MuiInputBase: {
            root: {
                color: 'inherit',
            },
            input: {
                color: 'inherit',
            }

        },
        MuiInput: {
            underline: {
                '&:after': {
                    borderBottomColor: 'inherit'
                },
            }
        },
        MuiInputLabel: {
            root: {
                "&$focused": {
                    color: 'black'
                }
            }
        },
    }
}

export default theme;