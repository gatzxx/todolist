import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {Header} from "@/common/components/Header/Header.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Main} from "@/common/components/Main/Main.tsx";
import {selectThemeMode} from "@/app/appSelector.ts";
import {getTheme} from "@/common/theme/theme.ts";
import './App.css'


export function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline />
                <Header />
                <Main />
            </div>
        </ThemeProvider>
    )
}
