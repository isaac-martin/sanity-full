export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5eb40c7b4bdf81fbb593c244',
                  title: 'Sanity Studio',
                  name: 'sanity-full-studio',
                  apiId: '1c6382f9-f23f-4ae0-8be4-d96ccd828eaa'
                },
                {
                  buildHookId: '5eb40c7b5a27a29ab46615f0',
                  title: 'Blog Website',
                  name: 'sanity-full',
                  apiId: '7de0ac48-d9b7-4b6f-8900-d20b173e6177'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/isaac-martin/sanity-full',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-full.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
