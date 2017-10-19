module.exports = server => {
    server.start(err => {
      if(err){
        throw err;
      }

      console.log('Server running at', server.info.uri);
    })
};