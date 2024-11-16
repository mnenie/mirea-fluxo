import { useLocalStorage } from '@vueuse/core'
import { effectScope, onScopeDispose, type Ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Value {
  name: string
  value: string
}

export function useLanguage(values: Value[], language: Ref<string>) {
  const scope = effectScope()

  const storage = useLocalStorage<string | null>('i18n', null)
  const { locale } = useI18n()

  scope.run(() => {
    watch(
      () => locale.value,
      (newLocale) => {
        const selectedOption = values.find(option => option.value === newLocale)
        if (selectedOption) {
          language.value = selectedOption.value
        }
      },
      { immediate: true },
    )
    watch(
      () => language.value,
      (newLanguage) => {
        const selectedOption = values.find(option => option.value === newLanguage)
        if (selectedOption) {
          locale.value = selectedOption.value
          storage.value = selectedOption.value
        }
      },
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })
}
