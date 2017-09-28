module.exports = server => {
  return err => {
      if (err) {
          console.error('Failed to load plugins:', err);
      }

      server.start(err => {
        if(err){
          throw err;
        }

        console.log('Server running at', server.info.uri);
      })
  }
};