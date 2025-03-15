import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { TokenList, Version } from '@uniswap/token-lists'
import { DEFAULT_TOKEN_LIST } from '../../constants/lists'

// Define the fetch token list actions
export const fetchTokenList: Readonly<{
  pending: ActionCreatorWithPayload<{ url: string; requestId: string }>
  fulfilled: ActionCreatorWithPayload<{ url: string; tokenList: TokenList; requestId: string }>
  rejected: ActionCreatorWithPayload<{ url: string; errorMessage: string; requestId: string }>
}> = {
  pending: createAction('lists/fetchTokenList/pending'),
  fulfilled: createAction('lists/fetchTokenList/fulfilled'),
  rejected: createAction('lists/fetchTokenList/rejected')
}

// Add initialization action for default list
export const initializeList = createAction<TokenList>('lists/initializeList')

// List management actions
export const acceptListUpdate = createAction<string>('lists/acceptListUpdate')
export const addList = createAction<string>('lists/addList')
export const removeList = createAction<string>('lists/removeList')
export const selectList = createAction<string>('lists/selectList')
export const rejectVersionUpdate = createAction<Version>('lists/rejectVersionUpdate')

// Initialize with default list
export const initializeDefaultList = () => {
  return initializeList(DEFAULT_TOKEN_LIST)
}
