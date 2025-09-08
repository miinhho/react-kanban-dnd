import { useContext } from 'react'
import { ColumnContext } from '../context/ColumnContext'

export const useColumn = () => {
  const ctx = useContext(ColumnContext)
  if (!ctx) {
    throw new Error('useColumn must be used within a ColumnContext')
  }
  return ctx
}
