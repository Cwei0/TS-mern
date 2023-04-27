import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../app/api/axios";
import { Game } from "../../Types/Games";

interface GameState {
    games: Game[],
    loading: boolean,
    game: Game | null,
    error: unknown
}

const initialState: GameState = {
    games: [],
    game: null,
    loading: false,
    error: null
}

//Action thunks
export const getGames = createAsyncThunk<GameState["games"]>(
    "games/getGames",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/api/games")
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createGame = createAsyncThunk<Game, object>(
    "games/createGame",
    async (data, thunkAPI) => {
        try {
            const response = axios.post("/api/games", data)
            thunkAPI.dispatch(getGames())
            return (await response).data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
) 

export const getGameById = createAsyncThunk<Game, string | undefined>(
    "games/getGameById",
    async(id, thunkAPI) => {
        try {
            const response = await axios.get(`/api/games/${id}`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateGame = createAsyncThunk<Game, Game | any>(
    "games/updateGame",
    async(data, thunkAPI) => {
        try {
            const response = await axios.put(`/api/games/${data?._id}`, data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteGame = createAsyncThunk<string, string | undefined>(
    "games/deleteGame",
    async(id, thunkAPI) => {
        try {
            const response = await axios.delete(`/api/games/${id}`)
            thunkAPI.dispatch(getGames())
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


//Reducers => redux reducers and action
const gameSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        setgames: (state, action: PayloadAction<GameState["games"]>) => {
            state.games = action.payload
        },
        addgames: (state, action: PayloadAction<Game>) => {
            state.games.push(action.payload)
        },
        filtergame: (state, action) => {
            state.games = state.games.filter(game => game._id !== action.payload)
        }
        
    },
    extraReducers(builder) {
        builder
            .addCase(getGames.pending, (state) => {
                state.loading = true
            })
            .addCase(getGames.fulfilled, (state, action) => {
                state.games = action.payload
                state.loading = false
            })
            .addCase(getGames.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.games.push(action.payload)
            })
            .addCase(getGameById.pending, (state) => {
                state.loading = true
            })
            .addCase(getGameById.fulfilled, (state, action) => {
                state.game = action.payload,
                state.loading = false
            })
            .addCase(updateGame.pending, (state) => {
                state.loading = true
            })
            .addCase(updateGame.fulfilled, (state, action) => {
                state.game = action.payload
            })
            .addCase(deleteGame.pending, (state) => {
                state.loading = true
            })
            

    },
})

export default gameSlice.reducer

export const { setgames, addgames  } = gameSlice.actions
