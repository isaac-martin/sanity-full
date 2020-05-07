export default {
  type: 'object',
  name: 'experiment',
  title: 'Experiment',
  fields: [
    {
      name: 'experimentId',
      type: 'string'
    },
    {
      name: 'experimentTitle',
      type: 'string',
      title: 'Experiment Title',
      description: 'Not shown on frontend'
    },
    {
      name: 'experiment',
      type: 'array',
      of: [
        {type: 'pricing'},
        {type: 'uiComponentRef'},
        {type: 'hero'},
        {type: 'infoRows'},
        {type: 'ctaColumns'},
        {type: 'ctaPlug'}
      ]
    },
    {
      name: 'control',
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
      title: 'experimentTitle',
      subtitle: 'experimentId'
    },
    prepare ({title, subtitle}) {
      return {
        title: `Experiment: ${title || 'Title not set'}`,
        subtitle: `ExperimentID: ${subtitle || 'ID not set'}`
      }
    }
  }
}
