export default {
  type: 'object',
  name: 'experimentComponents',
  title: 'Experiment Blocks',
  fields: [
    {
      name: 'variationID',
      title: 'Variation ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'data',
      type: 'array',
      of: [
        {type: 'pricing'},
        {type: 'uiComponentRef'},
        {type: 'hero'},
        {type: 'infoRows'},
        {type: 'ctaColumns'},
        {type: 'ctaPlug'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'variationID'
    },
    prepare ({title}) {
      return {
        title: `Variation: ${title || 'ID not set'}`
      }
    }
  }
}
