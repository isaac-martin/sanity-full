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
      name: 'variations',
      type: 'array',
      of: [{type: 'experimentComponents'}]
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
