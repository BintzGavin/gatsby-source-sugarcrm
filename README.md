<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby with SugarCRM
</h1>


This plugin pulls in data using the <a href="https://support.sugarcrm.com/Documentation/Sugar_Developer/Sugar_Developer_Guide_9.0/Integration/Web_Services/REST_API/">SugarCRM REST API</a>

#### Setup
Sample configuration for ``gatsby-config.js``
```
{
      resolve: `gatsby-source-sugarcrm`,
      options: {
        endpoint: 'API_ENDPOINT',
        configOptions: {
          client_id: 'sugar',
          client_secret: '',
          username: 'SUGAR_USERNAME',
          password: 'PASSWORD',
          platform: 'base'
        },
        modules: [
            'MODULE_NAME'
        ]
      }
    },
```

