import {AppBar, Container, IconButton, Switch, Toolbar} from "@mui/material";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {containerSx} from "@/common/styles/container.styles.ts";
import {NavButton} from "@/common/styles/NavButton.ts";
import {updateThemeModeAC} from "@/app/appReducer.ts";
import {selectThemeMode} from "@/app/appSelector.ts";
import {getTheme} from "@/common/theme/theme.ts";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()

    const toggleThemeMode = () => {
        dispatch(updateThemeModeAC({themeMode: themeMode == 'light' ? 'dark' : 'light'}))
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={toggleThemeMode}/>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}