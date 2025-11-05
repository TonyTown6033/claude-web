import { reactive, toRefs } from 'vue'

export function useForm(initialState = {}) {
  const form = reactive({ ...initialState })

  const resetForm = () => {
    Object.keys(initialState).forEach(key => {
      form[key] = initialState[key]
    })
  }

  return {
    form,
    resetForm,
    ...toRefs(form),
  }
}
