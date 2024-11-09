import { inject, type InjectionKey, provide, type Ref, toRef } from 'vue'

interface Expanded {
  isExpanded: Ref<boolean>
  toggleExpanded: () => void
}

const expandedKey: InjectionKey<Expanded> = Symbol('expanded')

export function useExpanded() {
  const createContext = (expanded: Expanded) => {
    provide(expandedKey, {
      isExpanded: toRef(expanded, 'isExpanded'),
      toggleExpanded: expanded.toggleExpanded,
    })
  }

  const getExpanded = () => inject(expandedKey)!

  return {
    createContext,
    getExpanded,
  }
}
