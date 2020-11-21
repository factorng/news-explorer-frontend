module.exports = {
    "extends": [
      "plugin:react/recommended",
      "airbnb-base",
    ],
    rules: {
      'no-underscore-dangle': [
        'error',
        {
          allow: [
            '_id',
          ],
        },
      ],
      "linebreak-style": 0
    },
    "plugins": [
      "react"
    ]
  };