module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "slackbot",
      script    : "./build/bin/https.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "process",
      host : "hackatown.io",
      ref  : "origin/master",
      repo : "https://github.com/lassondehacks/LassondeHacksBot.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && grunt && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}
