type Keys = 'name' | 'placeholder' | 'description' | 'type' | 'label'

type FormField = {
  [K in Keys]: K extends 'description' ? string | undefined : string;
}

export function getFormFields(t: (key: string) => string): { fields: Readonly<FormField[]> } {
  const fields = [
    {
      name: 'title',
      label: t('order.stages.dialog.fields.stage.title.label'),
      placeholder: t('order.stages.dialog.fields.stage.title.placeholder'),
      description: t('order.stages.dialog.fields.stage.title.description'),
      type: 'text',
    },
    {
      name: 'content',
      label: t('order.stages.dialog.fields.stage.content.label'),
      placeholder: t('order.stages.dialog.fields.stage.content.placeholder'),
      description: t('order.stages.dialog.fields.stage.content.description'),
      type: 'text',
    },
    {
      name: 'price',
      label: t('order.stages.dialog.fields.stage.price.label'),
      placeholder: t('order.stages.dialog.fields.stage.price.placeholder'),
      description: undefined,
      type: 'number',
    },
    {
      name: 'date',
      label: t('order.stages.dialog.fields.stage.date.label'),
      placeholder: t('order.stages.dialog.fields.stage.date.placeholder'),
      description: t('order.stages.dialog.fields.stage.date.description'),
      type: 'text',
    },
  ]
  return {
    fields,
  }
}
