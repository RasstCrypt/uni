import { getVersionUpgrade, minVersionBump, VersionUpgrade } from '@uniswap/token-lists'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks'
import { useFetchListCallback } from '../../hooks/useFetchListCallback'
import useInterval from '../../hooks/useInterval'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { addPopup } from '../application/actions'
import { AppDispatch, AppState } from '../index'
import { acceptListUpdate, initializeList } from './actions'
import { DEFAULT_TOKEN_LIST } from '../../constants/lists'

export default function Updater(): null {
  const { library } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const lists = useSelector<AppState, AppState['lists']['byUrl']>(state => state.lists.byUrl)

  const isWindowVisible = useIsWindowVisible()

  // Initialize with default list on first load
  useEffect(() => {
    dispatch(initializeList(DEFAULT_TOKEN_LIST))
  }, [dispatch])

  const fetchList = useFetchListCallback()

  const fetchAllListsCallback = useCallback(() => {
    if (!isWindowVisible) return
    Object.keys(lists).forEach(url =>
      fetchList(url).catch(error => console.debug('interval list fetching error', error))
    )
  }, [fetchList, isWindowVisible, lists])

  // Reduce polling interval to 30 minutes since we're using a static list
  useInterval(fetchAllListsCallback, library ? 1000 * 60 * 30 : null)

  // Load lists if not loaded
  useEffect(() => {
    Object.keys(lists).forEach(listUrl => {
      const list = lists[listUrl]
      if (!list.current && !list.loadingRequestId && !list.error) {
        fetchList(listUrl).catch(error => console.debug('list added fetching error', error))
      }
    })
  }, [dispatch, fetchList, library, lists])

  // Handle version updates
  useEffect(() => {
    Object.keys(lists).forEach(listUrl => {
      const list = lists[listUrl]
      if (list.current && list.pendingUpdate) {
        const bump = getVersionUpgrade(list.current.version, list.pendingUpdate.version)
        
        switch (bump) {
          case VersionUpgrade.NONE:
            return // Skip if no version bump
          case VersionUpgrade.PATCH:
          case VersionUpgrade.MINOR:
            const min = minVersionBump(list.current.tokens, list.pendingUpdate.tokens)
            if (bump >= min) {
              dispatch(acceptListUpdate(listUrl))
              dispatch(
                addPopup({
                  key: listUrl,
                  content: {
                    listUpdate: {
                      listUrl,
                      oldList: list.current,
                      newList: list.pendingUpdate,
                      auto: true
                    }
                  }
                })
              )
            }
            break
          case VersionUpgrade.MAJOR:
            dispatch(
              addPopup({
                key: listUrl,
                content: {
                  listUpdate: {
                    listUrl,
                    auto: false,
                    oldList: list.current,
                    newList: list.pendingUpdate
                  }
                },
                removeAfterMs: null
              })
            )
        }
      }
    })
  }, [dispatch, lists])

  return null
}
