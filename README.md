##gatsby-source-sugarcrm

```
{
      resolve: `gatsby-source-sugarcrm`,
      options: {
        endpoint: API_ENDPOINT,
        configOptions: {
          client_id: 'sugar',
          client_secret: '',
          username: SUGAR_USERNAME,
          password: PASSWORD,
          platform: 'base'
        },
      }
    },
```

checkout repo to /plugins in gatsby project and include above snippet in gatsby-config.js