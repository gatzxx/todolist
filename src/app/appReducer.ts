import {createAction, createReducer} from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light'

const initialState = {
    themeMode: 'light' as ThemeMode
}

export const updateThemeModeAC = createAction<{ themeMode: ThemeMode }>('app/updateThemeMode')

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(updateThemeModeAC, (state, action) => {
            state.themeMode = action.payload.themeMode
        })
})
