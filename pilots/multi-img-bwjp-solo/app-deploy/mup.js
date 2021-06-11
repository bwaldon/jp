module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '3.16.163.173',
      username: 'ubuntu',
      pem: '../../../serverKeys/privateKey.pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'app',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://app.com',
      MONGO_URL: 'mongodb+srv://brandon:alpslab@cluster0.xizoq.mongodb.net/jp-data',
      MONGO_OPLOG_URL: 'mongodb+srv://brandon-oplog:alpslab@cluster0.xizoq.mongodb.net/local',
    },

    docker: {
      // abernix/meteord:node-12-base works with Meteor 1.9 - 1.10
      // If you are using a different version of Meteor,
      // refer to the docs for the correct image to use.
      image: 'abernix/meteord:node-12-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  // mongo: {
  //   version: '3.4.1',
  //   servers: {
  //     one: {}
  //   }
  // },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
